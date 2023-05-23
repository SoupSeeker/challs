#include <stdio.h>
#include <string.h>

void print_flag(){
    char flag[256];
    FILE* flagfile = fopen("flag.txt", "r");
    if (flagfile == NULL) {
        puts("Cannot read flag.txt.");
    } else {
        fgets(flag, 256, flagfile);
        flag[strcspn(flag, "\n")] = '\0';
        puts(flag);
    }
}

int main() {
    printf("What have I got in my front coat pocket? ");
    fflush(stdout);
    char guess_array[256];
    fgets(guess_array, 256, stdin);
    guess_array[strcspn(guess_array, "\n")] = '\0';
    if (strcmp(guess_array, "the ring") == 0) {
        puts("...how did you guess that?");
        print_flag();
    } else {
        puts("WRONG! lol");
    }
    return 0;
}
