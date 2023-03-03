import cv2

import readJson
from timeParse import PeriodParser, parseTime
import videoProcess


DEBUG = True
jsonPath = r'./summary.json'
videoPath = 'E:/OperatingSystem/basketball.mp4'




if __name__ == '__main__':
    events = readJson.readEvents(path=jsonPath)
    
    # 先利用完整事件表确定每节首尾时间
    periodParser = PeriodParser(events)

    # 再进行查询操作
    queryList = [("Alperen Sengun", "who"), ("2", "when"), ("throw", "what")]
    for q in queryList:
        info, method = q
        events = readJson.query(info, events, method)
    
    if DEBUG: print("[query] events number: ", len(events))

    for e in events:
        print(e['text'], e['clock']['displayValue'])
        print(e['wallclock'])
        # print(parseTime(e['wallclock']))
        print(e['type']['text'])
        print()

    timeSeries = readJson.exertTime(events)
    
    videoCapture = cv2.VideoCapture(videoPath)
    videoProcess.processVideo(videoCapture, timeSeries, periodParser)

    # Box score, team status
    
    
