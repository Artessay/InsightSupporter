import cv2

def capture_video(video_path, result_video_path, video, result_video, start_time, end_time):
    """
    功能：截取短视频
    参数：
        video_path：需要截取的视频路径
        result_video_path：截取后的视频存放的路径
        video：需要截取的视频的名称（不带后缀）
        result_video：截取了的视频的名称（不带后缀）
        start_time：截取开始时间（单位s）
        end_time：截取结束时间（单位s）
    """

    # 读取视频
    cap = cv2.VideoCapture(video_path + video)

    # 读取视频帧率
    fps_video = cap.get(cv2.CAP_PROP_FPS)

    # 设置写入视频的编码格式
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    # 获取视频宽度和高度
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # 设置写视频的对象
    videoWriter = cv2.VideoWriter(result_video_path + result_video, fourcc, fps_video, (frame_width, frame_height))

    # 初始化一个计数器
    count = 0

    while (cap.isOpened()):

        # 读取视屏里的图片
        ret, frame = cap.read()

        # 如果视屏没有读取结束
        if ret == True:

            # 计数器加一
            count += 1

            # 截取相应时间内的视频信息
            if(count > (start_time * fps_video) and count <= (end_time * fps_video)):
                # 将图片写入视屏
                videoWriter.write(frame)

            if(count == (end_time * fps_video)):
                break

        else:
            # 写入视屏结束
            videoWriter.release()
            break

if __name__ == '__main__':
    video_path = "D:/Aliyun/download/"
    result_video_path = "D:/Aliyun/download/"
    video = "12.24 独行侠vs火箭.mp4"
    result_video = "12.24 独行侠vs火箭_clip1.mp4"
    start_time = 2*60
    end_time = 4 * 60
    capture_video(video_path, result_video_path, video, result_video, start_time, end_time)
