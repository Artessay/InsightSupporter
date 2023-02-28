import cv2
import tqdm
from clipVideo import clipVideo

from ocr import text_process
from Clock import Clock
# from PIL import Image

def processVideo(videoCapture, timeSeries):
    top = 95
    bottom = 60
    left =  1535
    right = 200

    index = 0   # timeSeries pointer
    series_length = len(timeSeries)
    
    total_frame = int(videoCapture.get(cv2.CAP_PROP_FRAME_COUNT))  # 视频总帧数
    fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率

    # 进度条
    pbar = tqdm.tqdm(total_frame)

    # 开头空白帧
    print('fps: ', fps)
    skip_frames = 15000 # (2*60 + 58) * fps
    videoCapture.set(cv2.CAP_PROP_POS_FRAMES, skip_frames)
    
    lastClock = Clock(12, 0)
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
        # img = Image.fromarray(frame)
        # img.show()
        # cv2.waitKey()

        # 图像二值化
        # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # gray = gray.flatten()
        # binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 0)
        # # _, binary = cv2.threshold(src=gray, thresh=220, maxval=255, type=cv2.THRESH_BINARY)
        # img = Image.fromarray(binary)
        # img.show()
        # cv2.waitKey()


        # 文字识别
        (timeVideo, periodVideo) = text_process(frame)
        # 非法输入
        if periodVideo == 0:
            continue
        # 不处理重复时间
        if timeVideo == lastClock:
            continue
        else:
            lastClock = timeVideo
        
        
        # 更新进度条
        pbar.set_postfix_str(f'{position}/{total_frame}, clock: {timeVideo.m} {timeVideo.s}  period: {periodVideo}')
        pbar.update(fps)
        # print('clock: ', timeVideo.m, timeVideo.s, ' period: ', periodVideo)

        # 时序匹配
        (timeJson, periodJson) = timeSeries[index]
        # 错过了
        while (periodVideo > periodJson) or (periodVideo == periodJson and timeVideo < timeJson):    
            index = index + 1                # 那就算了
            (timeJson, periodJson) = timeSeries[index]
        # 对得上
        if ((timeVideo == timeJson) and (periodVideo == periodJson)):
            print(f'\nGET!  frame: {position} video: {timeVideo.m} {timeVideo.s} {periodVideo} json: {timeJson.m} {timeJson.s} {periodJson}')
            fileName = f'result/{position}.mp4'
            clipVideo(position / fps - 4, position / fps + 1, fileName, videoCapture)
            videoCapture.set(cv2.CAP_PROP_POS_FRAMES, position)
            index = index + 1

        # 时序匹配 另一种做法 全匹配
        # for i in range(series_length):
        #     (timeJson, periodJson) = timeSeries[i]
        #     # 对得上
        #     if ((timeVideo == timeJson) and (periodVideo == periodJson)):
        #         print(f'\nGET!  frame: {position} video: {timeVideo.m} {timeVideo.s} {periodVideo} json: {timeJson.m} {timeJson.s} {periodJson}')
        #         fileName = f'result/{position}.mp4'
        #         clipVideo(position / fps - 4, position / fps + 1, fileName, videoCapture)
        #         videoCapture.set(cv2.CAP_PROP_POS_FRAMES, position)

        # 完成视频抽取
        if index >= series_length:
            break

        # @DEBUG 调试代码使用，提前中断
        # if position > (3 * 60 + 6) * fps:
        #     break