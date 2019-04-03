CC=gcc
CFLAGS=-Wall -g
IQUOTE = -iquote../cctools-source/dttools/src -iquote../cctools-source/work_queue/src -iquote../cctools-source/batch_job/src
L = -L../cctools-source/dttools/src -L../cctools-source/work_queue/src -L../cctools-source/batch_job/src
l = -lbatch_job -lwork_queue -ldttools -lz
LDDFLAGS = $(IQUOTE) $(L) $(l) -lm
CCTOOLS = ../cctools-source
LIB = ../cctools-source/dttools/src/libdttools.a ../cctools-source/work_queue/src/libwork_queue.a

LOGS = *.wqlog *.debug *.trace *.dag *.dot
PROG = shared-fs fscheck
PERL = test
INPUT = in.dat
OUTPUT = out.*.dat
DATA = master.debug
JSON = master.json

CLEANUP = $(JSON) $(DATA) $(INPUT) $(OUTPUT)

all: $(PROG) $(INPUT) $(DATA) $(JSON)

$(PROG): $(LIB) $(CCTOOLS)
	$(CC) $(CFLAGS) $@.c $(LDDFLAGS) -o $@

$(INPUT): /usr/bin/dd
	dd if=/dev/zero of=in.dat bs=4096 count=25000

$(DATA): $(PROG) $(INPUT) $(PERL) 
	../bin/condor_submit_workers -N wq-trace -E "-d all -o worker.debug --debug-rotate-max 0" 10
	perl test --tasks 100 --sleep 1 --name wq-trace

$(JSON): $(DATA)
	perl ../logdedup
	perl ../debuggen -i master.debug -o master.json

build: $(PROG)

clean:
	rm -rf $(CLEANUP) $(PROG) $(LOGS)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
