CC=gcc
CFLAGS=-Wall -g
IQUOTE = -iquote../cctools-source/dttools/src -iquote../cctools-source/work_queue/src -iquote../cctools-source/batch_job/src
L = -L../cctools-source/dttools/src -L../cctools-source/work_queue/src -L../cctools-source/batch_job/src
l = -lbatch_job -lwork_queue -ldttools -lz
LDDFLAGS = $(IQUOTE) $(L) $(l) -lm
CCTOOLS = ../cctools-source
LIB = ../cctools-source/dttools/src/libdttools.a ../cctools-source/work_queue/src/libwork_queue.a

LOGS = *.wqlog *.debug *.trace *.dag *.dot
PROG = sim midpoint
PERL = test
MAKEFLOW = bad-env.makeflow
INPUT = in.dat
OUTPUT = out.*.dat spec.config makeflow.failed.* bad-env.makeflow.* ltrace-wrapper
DATA = master.debug
JSON = master.json

CLEANUP = $(JSON) $(DATA) $(INPUT) $(OUTPUT)

all: $(PROG) $(INPUT) $(DATA) $(JSON)

$(PROG): $(CCTOOLS)
	$(CC) $(CFLAGS) $@.c -o $@
	
#$(PROG): $(LIB) $(CCTOOLS)
#	$(CC) $(CFLAGS) $@.c $(LDDFLAGS) -o $@

$(INPUT): /usr/bin/dd
	echo "TEST" > in.dat

ltrace-wrapper:
	cp ../ltrace-wrapper .

$(MAKEFLOW): $(PROG) $(INPUT) ltrace-wrapper
	perl makeflowgen -r 4 -o $@

$(DATA): $(PROG) $(INPUT) $(PERL) $(MAKEFLOW)
	condor_submit_workers -N wq-trace -E "-d all -o worker.debug --debug-rotate-max 0" 1
	perl test --name wq-trace

$(JSON): $(DATA)
	perl ../logdedup
	perl ../debuggen -i master.debug -o master.json

build: $(PROG)

clean:
	rm -rf $(CLEANUP) $(MAKEFLOW) $(PROG) $(LOGS)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
