class Clock(object):
    def __init__(self, m:int, s:int) -> None:
        self.m = m
        self.s = s
        # self.wallclock = wallclock
    
    def __lt__(self, record):
        if self.m < record.m:
            return True
        elif self.m > record.m:
            return False
        else:
            return self.s < record.s

    def __eq__(self, __o: object) -> bool:
        return (self.m == __o.m) and (self.s == __o.s)

if __name__ == '__main__':
    c1 = Clock(11, 36)
    c2 = Clock(10, 28)
    c3 = Clock(11, 36)
    print(c1 < c2)
    print(c1 > c2)
    print(c1 == c2)
    print(c1 < c3)
    print(c1 > c3)
    print(c1 == c3)