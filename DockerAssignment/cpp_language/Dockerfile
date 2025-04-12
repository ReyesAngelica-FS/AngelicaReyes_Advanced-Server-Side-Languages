FROM gcc:13

WORKDIR /usr/src/myapp
COPY . .

RUN g++ -o hello hello.cpp

CMD ["./hello"]
