import os
import cv2

def getVideoList(dir):
    videoList = []
    for dirpath, dirnames, filenames in os.walk(dir):
        for filename in filenames:
            if filename.endswith(".mp4"):
                videoList.append(filename)
    return videoList

videoList = getVideoList(".")
# print(videoList)

def concatVideo(videoList, name="./video.mp4", video_fps=30, video_fourcc=828601953, frame_width=720, frame_height=480):
    # cv2.VideoWriter_fourcc('A', 'V', 'C', '1')

    videoCapture = cv2.VideoCapture(videoList[0])
    video_fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率
    video_fourcc = int(videoCapture.get(cv2.CAP_PROP_FOURCC))    # 编码器
    frame_width = int(videoCapture.get(cv2.CAP_PROP_FRAME_WIDTH))  # 宽度
    frame_height = int(videoCapture.get(cv2.CAP_PROP_FRAME_HEIGHT))  # 高度

    videoWriter = cv2.VideoWriter(name, video_fourcc, video_fps, (frame_width, frame_height))
    for video in videoList:
        cap = cv2.VideoCapture("./" + video)
        while True:
            success, frame = cap.read()
            if success == False:
                break
            videoWriter.write(frame)
        cap.release()
    videoWriter.release()

concatVideo(videoList)