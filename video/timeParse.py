import time
# import datetime

class periodParser:
    def __init__(self, events:list) -> None:
        self.start = []
        self.end   = []
        index = 0
        for period in range(1, 5):
            while True:
                if index >= len(events):
                    print('Program Error, parse the end of period')
                    break
                
                # exert 
                event = events[index]
                index = index + 1

                # match
                period_ = event['period']['number']
                clock_  = event['clock']['displayValue']

                if period_ == period and clock_ == '12:00':
                    time_start = parseTime(event['wallclock'])
                    self.start.append(time_start)
                    break

            while True:
                if index >= len(events):
                    print('Program Error, parse the end of period')
                    break
                
                # exert 
                event = events[index]
                index = index + 1

                # match
                period_ = event['period']['number']
                clock_  = event['clock']['displayValue']

                if period_ == period and clock_ == '0.0':
                    time_end = parseTime(event['wallclock'])
                    self.end.append(time_end)
                    break

    def getTimeStruct(self):
        return (self.start, self.end)        


def parseTime(wallclock:str):
    struct_time = time.strptime(wallclock, '%Y-%m-%dT%H:%M:%SZ')
    return struct_time

if __name__ == '__main__':
    wallclock = "2022-12-24T03:04:13Z"
    struct_time = parseTime(wallclock)
    print(struct_time.tm_min, struct_time.tm_sec)

    from readJson import readEvents
    path = r'./summary.json'
    events = readEvents(path=path)
    parser = periodParser(events)
    (start, end) = parser.getTimeStruct()
    for i in range(4):
        print(start[i])
        print(end[i])
        print('')

    st1, st2 = time.mktime(start[0]), time.mktime(end[0])
    print(st1)
    print(st2)
    
    diff = st2 - st1
    print(diff)
    st = time.gmtime(diff)
    print(st)

