import time
import cv2
import tqdm
from clipVideo import clipVideo

from ocr import text_process
from Clock import Clock
# from PIL import Image

def getVideoPosition(st_start, st_end, pos_start, fps):
    # 计算时间差
    diff = st_end - st_start
    diff_st = time.gmtime(diff)

    # 锚定视频流
    position = pos_start + (diff_st.tm_hour * 3600 + diff_st.tm_min * 60 + diff_st.tm_sec) * fps

    return position

def processVideo(videoCapture, timeSeries, periodParser):
    # 设置参数
    # top = 95
    # bottom = 60
    # left =  1535
    # right = 200
    # skip_time = (2*60 + 58)
    top = 40
    bottom = 15
    left =  260
    right = 360
    skip_time = (9 * 60 + 48)

    index = 0   # timeSeries pointer
    series_length = len(timeSeries)
    
    # total_frame = int(videoCapture.get(cv2.CAP_PROP_FRAME_COUNT))  # 视频总帧数
    fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率

    # 进度条
    # pbar = tqdm.tqdm(total_frame)

    # 开头空白帧
    print('fps: ', fps)
    skip_frames = skip_time * fps
    # skip_frames = 15000
    videoCapture.set(cv2.CAP_PROP_POS_FRAMES, skip_frames)
    
    for p in range(1, 5):
        while True:
            # 读取视频帧
            success, frame = videoCapture.read()
            if success == False:
                break
            if frame is None:
                break

            # 每秒取一帧
            position = videoCapture.get(cv2.CAP_PROP_POS_FRAMES)
            if position % fps != 0:
                continue

            # 截取时间栏
            h = frame.shape[0]
            frame = frame[h - top:h - bottom, left:-right-1, :]

            # 文字识别
            (timeVideo, periodVideo) = text_process(frame)
            print(f"scan: {timeVideo.m}:{timeVideo.s} {periodVideo} expect: {p}")
            # 非法输入
            if periodVideo < p:
                continue
                
            # 获取到了该节的第一个时间点
            diff_sec = (11 - timeVideo.m) * 60 + (60 - timeVideo.s)
            pos_start = position - diff_sec * fps
            break
        
        # 抽取视频
        (start, end) = periodParser.getTimeStruct()
        st_start, st_end = time.mktime(start[p-1]), time.mktime(end[p-1])

        while index < series_length:
            (timeJson, periodJson, wallClock) = timeSeries[index]
            if periodJson > p:
                break
            index = index + 1

            st = time.mktime(wallClock)
            position = getVideoPosition(st_start, st, pos_start, fps)
            videoCapture.set(cv2.CAP_PROP_POS_FRAMES, position)

            print(f'\nGET!  frame: {position} json: {timeJson.m} {timeJson.s} {periodJson}')
            fileName = f'result/{position}.mp4'
            clipVideo(position / fps - 4, position / fps + 4, fileName, videoCapture)

        position = getVideoPosition(st_start, st_end, pos_start, fps)
        videoCapture.set(cv2.CAP_PROP_POS_FRAMES, position + 10 * fps)