import os


if __name__ == '__main__':
    os.environ["HTTP_PROXY"] = "http://127.0.0.1:7890"
    os.environ["HTTPS_PROXY"] = "https://127.0.0.1:7890"
    insight = 'Joel Embiid most shots were taken from mid range and happened in first quarter.'
