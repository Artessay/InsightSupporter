import cv2

def clipVideo(start:int, stop:int, fileName, videoCapture):
    '''
    start   : start time (second)
    stop    : stop time (second)
    videoCapture    : video input
    '''

    # 提取视频信息
    video_fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率
    video_fourcc = int(videoCapture.get(cv2.CAP_PROP_FOURCC))    # 编码器
    frame_width = int(videoCapture.get(cv2.CAP_PROP_FRAME_WIDTH))  # 宽度
    frame_height = int(videoCapture.get(cv2.CAP_PROP_FRAME_HEIGHT))  # 高度

    # 检查输入合法性
    video_frames = videoCapture.get(cv2.CAP_PROP_FRAME_COUNT)   # 总帧数
    if stop > (video_frames / video_fps):
        print("[warning] video stop time is larger than video time")
        stop = (int)(video_frames / video_fps)
    if start > (video_frames / video_fps):
        print("[warning] video start time is larger than video time")
        start = (int)(video_frames / video_fps)
    if stop < 0:
        print("[warning] video stop time is smaller than 0")
        stop = 0
    if start < 0:
        print("[warning] video start time is smaller than 0")
        start = 0

    videoCapture.set(cv2.CAP_PROP_POS_FRAMES, start * video_fps)
    position = videoCapture.get(cv2.CAP_PROP_POS_FRAMES)
    
    # 输出视频片段
    videoWriter = cv2.VideoWriter(fileName, video_fourcc, video_fps, (frame_width, frame_height))
    while (position <= stop * video_fps):
        success, frame = videoCapture.read()
        if success == False:
            break

        videoWriter.write(frame)
        position = videoCapture.get(cv2.CAP_PROP_POS_FRAMES)
    
    videoWriter.release()
    print("[video clip] success")
    return

if __name__ == '__main__':
    videoPath = 'E:/OperatingSystem/basketball.mp4'
    videoCapture = cv2.VideoCapture(videoPath)
    clipVideo(30, 50, videoCapture)

