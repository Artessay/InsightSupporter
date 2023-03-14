import cv2


DEBUG = True
videoPath = 'E:/OperatingSystem/basketball2.mp4'

videoCapture = cv2.VideoCapture(videoPath)

def frame_clip_test():
    # 设置参数
    top = 40
    bottom = 15
    left =  260
    right = 360
    
    fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率

    # 开头空白帧
    print('fps: ', fps)
    skip_frames = (38*60 + 30) * fps
    # skip_frames = 15000
    videoCapture.set(cv2.CAP_PROP_POS_FRAMES, skip_frames)
    
   
    # 读取视频帧
    success, frame = videoCapture.read()
    if success==False:
        print('error')
        return
    
    h, w = frame.shape[0], frame.shape[1]
    print(h, w)
    
    # cv2.imshow('hi', frame)
    # cv2.waitKey(0)

    # 截取时间栏
    h = frame.shape[0]
    # frame = frame[h - top:h - bottom, left:-right-1, :]
    frame = frame[h - top:h - bottom, left:-right-1, :]
    print(frame.shape)

    cv2.imshow('hi', frame)
    cv2.waitKey(0)

    # # 文字识别
    # (timeVideo, periodVideo) = text_process(frame)
    # print(f"scan: {timeVideo.m}:{timeVideo.s} {periodVideo} expect: {p}")
        
if __name__ == '__main__':
    frame_clip_test()