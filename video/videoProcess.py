import cv2
import tqdm
# from PIL import Image

def processVideo(videoCapture, timeSeries):
    top = 95
    bottom = 60
    left =  1535
    right = 200
    
    total_frame = int(videoCapture.get(cv2.CAP_PROP_FRAME_COUNT))  # 视频总帧数
    fps = videoCapture.get(cv2.CAP_PROP_FPS)   # 帧率

    # 进度条
    pbar = tqdm.tqdm(total_frame)

    # 开头空白帧
    skip_frames = (2*60 + 58) * fps
    videoCapture.set(cv2.CAP_PROP_POS_FRAMES, skip_frames)
    
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

        # 更新进度条
        pbar.set_postfix_str(f'{position}/{total_frame}')
        pbar.update(fps)

        # 调试代码，提前中断
        if position > 30 * 60 * fps:
            break