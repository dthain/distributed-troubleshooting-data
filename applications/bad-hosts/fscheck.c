#include <ctype.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

int run(const char *config) {
   
	if(!config) {
        return 1;
    }

/*
	FILE *f = fopen(config, "r");
	if(!f) {
		return 1;
	}

    char *host = getenv("HOSTNAME");
    int flag = 1;
    char line[128];
    while(fgets(line, sizeof line, f)) {
        char *sanitized = strtok(line, "\n");
        if(strcmp(sanitized, host) == 0) {
            flag = 0;
        }
    }
    
    if(flag) {
        fprintf(stderr, "Current host not in list of safe hosts. Terminating.\n");
        return 1;
    }

    if(system("stat /disk/")) { 
        fprintf(stderr, "/disk/ not found.\n");
        return 1;
    }
*/

    char *path = getenv("PYTHONPATH");
    fprintf(stderr, "Got %s.\n", path);

    struct stat buf;
    int flag = stat("/disk/", &buf);
    if(flag) {
        fprintf(stderr, "Current host not in list of safe hosts. Terminating.\n");
        return 1;
    }

    int result = system("dd if=in.dat of=out.dat bs=4096 count=2500");
    return result;
}

int main(int argc, char *argv[]) {

	if(argc < 2) {
		fprintf(stderr, "Must provide configuration file.\n");
		fprintf(stderr, "Example: ./fscheck runtime.config\n");
		exit(1);
	}

	char *config = argv[1];
	return run(config);
}
// vim: tabstop=4 shiftwidth=4 softtabstop=4 expandtab shiftround autoindent
