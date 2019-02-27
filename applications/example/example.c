/*
 * Copyright (C) 2016- The University of Notre Dame
 * This software is distributed under the GNU General Public License.
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdint.h>
#include <inttypes.h>
#include <sys/types.h>
#include <sys/time.h>
#include <time.h>
#include <errno.h>
#include <string.h>

#include "work_queue.h"
#include "work_queue_internal.h"
#include "stringtools.h"
#include "list.h"
#include "debug.h"

int test(int tasks, int sleep_time, char *name) {

	//char *debug_file = string_format("%s.debug", name);
	//char *log_file = string_format("%s.wqlog", name);
	char *debug_file = "master.debug";
	char *log_file = "master.wqlog";
	cctools_debug_flags_set("all");
	cctools_debug_config_file(debug_file);
	cctools_debug_config_file_size(0);
	
	struct work_queue *wq = work_queue_create(-1);
	if(!wq) {
		fprintf(stderr, "Error in setting up Work Queue: %d - %s\n", errno, strerror(errno));
		return 1;
	}

	printf("Listening on port %d...\n", work_queue_port(wq));
	work_queue_specify_master_mode(wq, WORK_QUEUE_MASTER_MODE_CATALOG);
	work_queue_specify_name(wq, name);

	struct work_queue_stats s;
	work_queue_specify_log(wq, log_file);
	struct timeval curr_time;
	gettimeofday(&curr_time, NULL);
	int start_time = (int) curr_time.tv_sec;
	int time_acc = 0;
	int i = 0;
	int taskid = 0;
	int result = 0;
	int complete = 0;
	int failed = 0;
	int timeout = ((sleep_time * 10) * tasks) + 10;

	while(time_acc < timeout) {

		gettimeofday(&curr_time, NULL);
		time_acc = ((int) curr_time.tv_sec - start_time);
		work_queue_get_stats(wq, &s);

		while(i < tasks) {
			char *out = string_format("out.%d.dat", i + 1);
			char *wdb = string_format("task.%d.debug", i + 1);
			char *ldb = string_format("ltrace.%d.debug", i + 1);
			char *cmd = string_format("./ltrace-wrapper dd if=in.dat of=out.dat bs=4096 count=2500 && sleep %d", sleep_time);
			struct work_queue_task *t = work_queue_task_create(cmd);

			work_queue_task_specify_file(t, "in.dat", "in.dat", WORK_QUEUE_INPUT, WORK_QUEUE_CACHE);
			work_queue_task_specify_file(t, "../ltrace-wrapper", "ltrace-wrapper", WORK_QUEUE_INPUT, WORK_QUEUE_CACHE);
			work_queue_task_specify_file(t, out, "out.dat", WORK_QUEUE_OUTPUT, WORK_QUEUE_NOCACHE);
			work_queue_task_specify_file(t, ldb, "ltrace.debug", WORK_QUEUE_OUTPUT, WORK_QUEUE_NOCACHE);
			work_queue_task_specify_file(t, wdb, "worker.debug", WORK_QUEUE_OUTPUT, WORK_QUEUE_NOCACHE);
			work_queue_task_specify_max_retries (t, 0);	

			taskid = work_queue_submit(wq, t);
			fprintf(stderr, "Task %d submitted.\n", taskid);	
			free(out);
			free(cmd);
			i++;
		}

		struct work_queue_task *t = work_queue_wait(wq, WORK_QUEUE_WAITFORTASK);
		if(t) {
			/*if(t->output) {
				fprintf(stderr, "Task %d: %s\n", t->taskid, t->output);
			}*/
			if(t->result == WORK_QUEUE_RESULT_SUCCESS) {
				fprintf(stderr, "Task %d complete. Collecting output.\n", t->taskid);
				struct work_queue_file *out_file;
				out_file = list_pop_head(t->output_files);
				result = remove(out_file->payload);
				if(result) {
					fprintf(stderr, "Error in garbage collection of file %s: %d - %s.\n", out_file->payload, errno, strerror(errno));
				}
				//out_file = list_pop_head(t->output_files);
				//result = remove(out_file->payload);
				//if(result) {
				//	fprintf(stderr, "Error in garbage collection of file %s: %d - %s.\n", out_file->payload, errno, strerror(errno));
				//}
				work_queue_task_delete(t);
				complete++;
			}
			else {
				//fprintf(stderr, "Task %d failed. Resubmitting.\n", t->taskid);
				//work_queue_submit(wq, t);
				fprintf(stderr, "Task %d failed.\n", t->taskid);
				failed++;
			}
		}

		if(complete + failed >= tasks) {
			break;
		}
	}
	work_queue_shut_down_workers(wq, 0);
	work_queue_delete(wq);
	fprintf(stderr, "Work Queue shut down after %d seconds with %d tasks scheduled and %d tasks completed.\n", time_acc, i, complete);
	return 0;
}

int main(int argc, char *argv[]) {

	if(argc < 3) {
		fprintf(stderr, "Must provide number of tasks to schedule, execution time per task, and  master name pattern.\n");
		fprintf(stderr, "Example: 100 20 wq_capacity_5\n");
		exit(1);
	}
	
	int tasks = atoi(argv[1]);
	int sleep_time = atoi(argv[2]);
	char *name = argv[3];
	test(tasks, sleep_time, name);

	fprintf(stderr, "Testing complete.\n");
	return 0;
}
/* vim: set noexpandtab tabstop=4: */
