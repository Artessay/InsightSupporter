import cv2

import readJson
import videoProcess


DEBUG = True
jsonPath = r'./summary.json'
videoPath = 'E:/OperatingSystem/basketball.mp4'




if __name__ == '__main__':
    events = readJson.readEvents(path=jsonPath)

    queryList = [("Alperen Sengun", "who"), (("1", "when"))]
    for q in queryList:
        info, method = q
        events = readJson.query(info, events, method)
    
    if DEBUG: print("[query] events number: ", len(events))

    timeSeries = readJson.exertTime(events)
    
    videoCapture = cv2.VideoCapture(videoPath)
    videoProcess.processVideo(videoCapture, timeSeries)
    
    
