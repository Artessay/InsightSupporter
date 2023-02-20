import re
import matplotlib
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from sklearn.multiclass import OneVsRestClassifier
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import seaborn as sns
df = pd.read_csv("article.csv", encoding ="ISO-8859-1")
df.head()
df_toxic = df.drop(['ID', 'Article', 'Link', 'Publisher', 'Named Entity Recognition', 'Open Information Extraction', 'Constituency Parsing', 'Unnamed: 9', 'Unnamed: 10', 'Unnamed: 11'], axis=1)
counts = []
categories = list(df_toxic.columns.values)
print(categories)
for i in categories:
    print(df_toxic[i].sum())
    counts.append((i, df_toxic[i].sum()))
df_stats = pd.DataFrame(counts, columns=['category', 'number_of_comments'])
print(df_stats)