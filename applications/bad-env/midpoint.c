#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int run() {
   
    int result = setenv("PYTHONPATH", "ERROR", 1);
    char *check = getenv("PYTHONPATH");
    fprintf(stdout, "%s", check);
    return result;
}

int main(int argc, char *argv[]) {
    
	int result = run();
    return result;
}
// vim: tabstop=4 shiftwidth=4 softtabstop=4 expandtab shiftround autoindent
