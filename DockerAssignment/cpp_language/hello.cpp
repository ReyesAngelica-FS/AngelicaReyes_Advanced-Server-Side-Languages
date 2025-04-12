// hello.cpp
#include <iostream>
#include <ctime>

int main() {
    std::cout << "Hello ASL!" << std::endl;

    time_t now = time(0);
    char* dt = ctime(&now);
    std::cout << dt;

    return 0;
}
