CCTOOLS = cctools-source
BWA = bwa-gatk
ENVTRACE = envtrace
EXAMPLE = example.complete
SHAREDFS = shared-fs.complete
BADENV = bad-env.complete
BWAGATK = bwa-gatk.complete
PLOT = bwa-gatk-performance.pdf

CLEANUP = bin bwa-gatk doc etc include lib share 

DATA = $(EXAMPLE) $(SHAREDFS) $(BADENV) $(BWAGATK)

all: $(CCTOOLS) $(DATA)

$(CCTOOLS): /usr/bin/git
	git clone git@github.com:cooperative-computing-lab/cctools.git cctools-source || git clone https://github.com/cooperative-computing-lab/cctools.git cctools-source
	cd cctools-source && ./configure --strict --prefix .. --tcp-low-port 9000 --tcp-high-port 9500 && make install

$(BWA): /usr/bin/git
	git clone git@github.com:cooperative-computing-lab/makeflow-examples.git || git clone https://github.com/cooperative-computing-lab/makeflow-examples.git
	mv makeflow-examples/$(BWA) .
	rm -rf makeflow-examples
	cd $(BWA) && git clone https://github.com/lh3/bwa bwa-src && cd bwa-src && make && cp bwa ..
	cd $(BWA) && curl "https://software.broadinstitute.org/gatk/download/auth?package=GATK-archive&version=3.7-0-gcfedb67" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" -H "Accept-Language: en-US,en;q=0.5" --compressed -H "Referer: https://software.broadinstitute.org/gatk/download/archive" -H "DNT: 1" -H "Connection: keep-alive" -H "Upgrade-Insecure-Requests: 1" > GenomeAnalysisTK-3.7-0.tar.bz2 && tar -jxvf GenomeAnalysisTK-3.7-0.tar.bz2
	cd $(BWA) && wget https://github.com/broadinstitute/picard/releases/download/2.9.4/picard.jar
	cd $(BWA) && wget https://github.com/samtools/samtools/releases/download/1.4.1/samtools-1.4.1.tar.bz2 && tar -jxvf samtools-1.4.1.tar.bz2 && cd samtools-1.4.1 && make prefix=. install && cp bin/samtools ..

$(EXAMPLE): $(CCTOOLS) example/Makefile
	cd example && make
	cp example/master.json ../graphql/example.json
	touch example.complete

$(SHAREDFS): $(CCTOOLS) shared-fs/Makefile
	cd shared-fs && make
	cp shared-fs/master.json ../graphql/shared-fs.json
	touch shared-fs.complete

$(BADENV): $(CCTOOLS) bad-env/Makefile
	cd bad-env && make
	cp bad-env/master.json ../graphql/bad-env.json
	touch bad-env.complete

$(BWAGATK): $(CCTOOLS) bwa-gatk/Makefile
	cd bwa-gatk && make
	cp bwa-gatk/master.json ../graphql/bwa-gatk.json
	touch bwa-gatk.complete

$(PLOT): $(BWAGATK) /usr/bin/gnuplot
	cd plots && gnuplot plot-bwa-gatk.plg
	mv plots/bwa-gatk-performance.pdf .

build: $(CCTOOLS) $(ENVTRACE)

example: $(EXAMPLE)

sharedfs: $(SHAREDFS)

badenv: $(BADENV)

data: $(DATA)

clean:
	cd bad-env && make clean
	cd bwa-gatk && make clean
	cd example && make clean
	cd shared-fs && make clean
	rm -rf $(CCTOOLS) $(CLEANUP) $(DATA)

exclean:
	cd example && make clean
	rm example.complete

bhclean:
	cd shared-fs && make clean
	rm shared-fs.complete

beclean:
	cd bad-env && make clean
	rm bad-env.complete

bwclean:
	cd bwa-gatk && make clean
	rm bwa-gatk.complete

lean:
	cd bad-env && make clean
	cd bwa-gatk && make clean
	cd example && make clean
	cd shared-fs && make clean
	rm -rf $(DATA)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
