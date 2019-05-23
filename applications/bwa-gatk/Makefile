CC=gcc
CFLAGS=-Wall -g
CCTOOLS = ../cctools-source

LOGS = *.wqlog *.debug *.trace *.dag *.dot
PROG = sim midpoint
PERL = test
MAKEFLOW = notrace.makeflow ltrace.makeflow
INPUT = in.dat
OUTPUT = makeflow.failed.* bwa-gatk.makeflow.* ltrace-wrapper
DATA = ltrace.debug
JSON = master.json

CLEANUP = $(JSON) $(DATA) $(INPUT) $(OUTPUT)

all: $(PROG) $(INPUT) $(DATA) $(JSON)

$(PROG): $(CCTOOLS)
	$(CC) $(CFLAGS) $@.c -o $@
	
ltrace-wrapper:
	cp ../ltrace-wrapper .

notrace.debug: notrace.makeflow
	../bin/condor_submit_workers -N wq-trace -E "-d all -o worker.debug --debug-rotate-max 0 -t 3600" 30
	perl test --name wq-trace --mode 1

ltrace.debug: ltrace.makeflow
	../bin/condor_submit_workers -N wq-trace -E "-d all -o worker.debug --debug-rotate-max 0 -t 3600" 30
	perl test --name wq-trace --mode 2

$(JSON): $(DATA)
	perl ../logdedup
	perl ../debuggen -i ltrace.debug -o master.json

build: $(PROG)

lean:
	../bin/makeflow -c ltrace.makeflow || ../bin/makeflow -c notrace.makeflow || true

clean:
	rm -rf $(CLEANUP) $(MAKEFLOW) $(PROG) $(LOGS)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
