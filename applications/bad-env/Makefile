CC=gcc
CFLAGS=-Wall -g
CCTOOLS = ../cctools-source

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
	
$(INPUT): /usr/bin/dd
	echo "TEST" > in.dat

ltrace-wrapper:
	cp ../ltrace-wrapper .

$(MAKEFLOW): $(PROG) $(INPUT) ltrace-wrapper
	perl makeflowgen -r 100 -o $@

$(DATA): $(PROG) $(INPUT) $(PERL) $(MAKEFLOW)
	condor_submit_workers -N wq-trace -E "-d all -o worker.debug --debug-rotate-max 0" 10
	perl test --name wq-trace

$(JSON): $(DATA)
	perl ../logdedup
	perl ../debuggen -i master.debug -o master.json

build: $(PROG)

clean:
	rm -rf $(CLEANUP) $(MAKEFLOW) $(PROG) $(LOGS)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
