CC=gcc
CFLAGS=-Wall -g
IQUOTE = -iquotecctools_source/dttools/src -iquotecctools_source/work_queue/src -iquotecctools_source/batch_job/src
L = -Lcctools_source/dttools/src -Lcctools_source/work_queue/src -Lcctools_source/batch_job/src
l = -lbatch_job -lwork_queue -ldttools -lz
LDDFLAGS = $(IQUOTE) $(L) $(l) -lm

CCTOOLS = cctools_source
LIB = cctools_source/dttools/src/libdttools.a cctools_source/work_queue/src/libwork_queue.a
LOGS = *.wqlog *.debug *.trace *.dag *.dot
PROG = tasks
PERL = test
INPUT = in.dat
OUTPUT = out.*.dat
DATA = master.debug
DOT = master.dot
DAG = master.dag
PNG = master.png

all: $(PROG) $(DATA) $(DOT) $(PNG)

$(PROG): $(LIB) $(CCTOOLS)
	$(CC) $(CFLAGS) $@.c $(LDDFLAGS) -o $@

in.dat: /usr/bin/dd
	dd if=/dev/zero of=in.dat bs=4096 count=25000

$(DATA): $(PROG) $(INPUT) $(PERL) 
	condor_submit_workers -N wq_trace -E "-d all -o worker.debug --debug-rotate-max 0" 5
	#work_queue_worker -N wq_trace -t 10 -d all -o worker.debug --debug-rotate-max 0 &
	perl test --tasks 20 --sleep 1 --name wq_trace

$(DOT): $(DATA)
	perl debuggen -i master.debug -o master.dag -d master.dot

$(PNG): $(DOT)
	dot -T png -o master.png master.dot

build: $(PROG)

clean:
	rm -rf $(CCTOOLS) $(DATA) $(INPUT) $(OUTPUT) $(PROG) $(LOGS) $(PNG)

lean:
	rm -rf $(DATA) $(INPUT) $(OUTPUT) $(PROG) $(LOGS) $(PNG)

plean:
	rm -rf $(PNG) $(DOT) $(DAG)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
