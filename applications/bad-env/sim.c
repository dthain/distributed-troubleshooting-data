#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int run(char *in) {
   
    FILE *input = fopen(in, "r");
    char *line = NULL;
    size_t len = 0;
    ssize_t read = 0;

    if(!input) { return 1; }
    read = getline(&line, &len, input);
    while(read != -1) {
        strtok(line, "\n");
        read = getline(&line, &len, input);
    }
    fclose(input);

    int result = setenv("PYTHONPATH", line, 1);
    char *check = getenv("PYTHONPATH");
    result = strcmp(check, "TEST");

    if(result) {
        fprintf(stdout, "ERROR");
    }
    else {
        fprintf(stdout, "TEST");
    }

    return result;
}

int main(int argc, char *argv[]) {
    
    if(argc < 1) {
		fprintf(stderr, "Must provide the input files to read.\n");
		fprintf(stderr, "Example: sim in.dat > out.dat\n");
        fprintf(stderr, "Found %d arguments.\n", argc);
		exit(1);
	}
	
	char *in = argv[1];
	int result = run(in);
    return result;
}
// vim: tabstop=4 shiftwidth=4 softtabstop=4 expandtab shiftround autoindent
