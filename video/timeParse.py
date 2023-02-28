import time

class periodParser:
    def __init__(self) -> None:
        self.start = 1
        self.end = 2
        pass

def parseTime(wallclock:str):
    struct_time = time.strptime(wallclock, '%Y-%m-%dT%H:%M:%SZ')
    print(struct_time.tm_min, struct_time.tm_sec)

if __name__ == '__main__':
    wallclock = "2022-12-24T03:04:13Z"
    parseTime(wallclock)