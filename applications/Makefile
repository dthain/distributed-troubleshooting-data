CCTOOLS = cctools-source
ENVTRACE = envtrace
EXAMPLE = example.complete
SHAREDFS = shared-fs.complete
BADENV = bad-env.complete

CLEANUP = bin doc etc include lib share 

DATA = $(EXAMPLE) $(SHAREDFS) $(BADENV)

all: $(CCTOOLS) $(DATA)

$(CCTOOLS): /usr/bin/git
	git clone git@github.com:cooperative-computing-lab/cctools.git cctools-source || git clone https://github.com/cooperative-computing-lab/cctools.git cctools-source
	cd cctools-source && ./configure --strict --prefix .. --tcp-low-port 9000 --tcp-high-port 9500 && make install

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

build: $(CCTOOLS) $(ENVTRACE)

example: $(EXAMPLE)

sharedfs: $(SHAREDFS)

badenv: $(BADENV)

data: $(DATA)

clean:
	cd example && make clean
	cd shared-fs && make clean
	cd bad-env && make clean
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

lean:
	cd example && make clean
	cd shared-fs && make clean
	cd bad-env && make clean
	rm -rf $(DATA)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
