from pdocr.predict import TextSystem
from pdocr.infer.utility import parse_args
from Clock import Clock

def predict_subtitle(image):
    args = parse_args()
    text_sys = TextSystem(args)
    dt_boxes, rec_res = text_sys(image)
    # print(rec_res)

    drop_score = 0.5
    text_list = []
    for text, score in rec_res:
        if score >= drop_score:
            text_list.append(text)

    return text_list



def text_process(img):
    # 获取预测OCR字符
    texts = predict_subtitle(img)
    if (len(texts) != 1):
        return (Clock(0, 0), 0)

    # if len(text) > 0:
    #     result = text[0]
    # if len(text) > 1:
    #     for t in text[1:]:
    #         result = result + ',' + t

    # 时间处理
    text = texts[0]
    text = text.replace('：', ':')  # 防止识别为中文冒号
    # print(text)
    texts = text.split(':')
    print(texts)

    if (len(texts) != 3):
        return (Clock(0, 0), 0)

    # 提取节
    # if texts[2].endswith('1ST'):
    #     period = 1
    #     texts[2] = texts[2].rstrip('1ST')
    # elif texts[2].endswith('2ND'):
    #     period = 2
    #     texts[2] = texts[2].rstrip('2ND')
    # elif texts[2].endswith('3RD'):
    #     period = 3
    #     texts[2] = texts[2].rstrip('3RD')
    # elif texts[2].endswith('4TH'):
    #     period = 4
    #     texts[2] = texts[2].rstrip('4TH')
    # else:
    #     return (Clock(0, 0), 0)
    print(texts[0])
    if texts[0].startswith('1ST'):
        period = 1
        # texts[0] = texts[0].lstrip('1ST')
    elif texts[0].startswith('2ND'):
        period = 2
        # texts[0] = texts[0].lstrip('2ND')
    elif texts[0].startswith('3RD'):
        period = 3
        # texts[0] = texts[0].lstrip('3RD')
    elif texts[0].startswith('4TH'):
        period = 4
        # texts[0] = texts[0].lstrip('4TH')
    else:
        return (Clock(0, 0), 0)
    if (len(texts[0]) > 3):
        texts[0] = texts[0][3:]

    if (texts[0] == ''):
        texts[0] = '0'

    print(texts[0], texts[1])
    return (Clock(int(texts[0]), round(float(texts[1]))), period)

if __name__ == '__main__':
    text = "6:10：161ST"
    text = text.replace('：', ':')  # 防止识别为中文冒号
    texts = text.split(':')
    print(texts)
    
    text = "：58.6：171ST"
    text = text.replace('：', ':')  # 防止识别为中文冒号
    texts = text.split(':')
    print(texts) 