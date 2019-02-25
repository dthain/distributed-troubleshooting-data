CCTOOLS = cctools-source
ENVTRACE = envtrace
EXAMPLE = example.complete
BADHOSTS = bad-hosts.complete
BADENV = bad-env.complete

DATA = $(EXAMPLE) $(BADHOSTS) $(BADENV)

all: $(CCTOOLS) $(EXAMPLE)

$(CCTOOLS): /usr/bin/git
	git clone git@github.com:cooperative-computing-lab/cctools.git cctools-source || git clone https://github.com/cooperative-computing-lab/cctools.git cctools-source
	cd cctools-source && ./configure --strict --tcp-low-port 9000 --tcp-high-port 9500 && make install

$(EXAMPLE): $(CCTOOLS) example/Makefile
	cd example && make
	touch example.complete

$(BADHOSTS): $(CCTOOLS) bad-hosts/Makefile
	cd bad-hosts && make
	touch bad-hosts.complete

$(BADENV): $(CCTOOLS) bad-env/Makefile
	cd bad-env && make
	touch bad-env.complete

build: $(CCTOOLS) $(ENVTRACE)

example: $(EXAMPLE)

badhosts: $(BADHOSTS)

badenv: $(BADENV)

data: $(DATA)

clean:
	cd example && make clean
	cd bad-hosts && make clean
	rm -rf $(CCTOOLS) $(DATA)

exclean:
	cd example && make clean
	rm example.complete

bhclean:
	cd bad-hosts && make clean
	rm bad-hosts.complete

lean:
	cd example && make clean
	cd bad-hosts && make clean
	rm -rf $(DATA)

.PHONY: all clean

# vim: set noexpandtab tabstop=4:
