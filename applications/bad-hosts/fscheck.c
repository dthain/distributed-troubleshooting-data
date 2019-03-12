#include <ctype.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

int run() {
   
    char *path = getenv("PYTHONPATH");
    fprintf(stderr, "Got %s.\n", path);
    int set = setenv("PYTHONPATH", "NONE", 1);
    fprintf(stderr, "Set returned %d.\n", set);

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

	return run();
}
// vim: tabstop=4 shiftwidth=4 softtabstop=4 expandtab shiftround autoindent
