import csv

file_path = "./data/article_label.csv"

with open(file_path, 'r', encoding='utf-8') as inputFile:
    reader = csv.DictReader(inputFile)
    # counter = 0
    for row in reader:
        # counter += 1
        # if self.testing and counter > 1000:
        #     break
        title = str(row.get('title', ''))
        body = str(row.get('body', ''))
        text = str(row.get('Insight', ''))
        print(title)
        print("\n")
        print(body)
        print("\n")
        print(text)
        print("\n\n")
        # yield self.text_to_instance(text, str(row['label']))