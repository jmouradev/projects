import csv
import numpy as np
import pandas as pd
from collections import Counter
from matplotlib import pyplot as plt


plt.style.use('fivethirtyeight')

data = pd.read_csv('data.csv')
ids = data['Responder_id']
lang_responses = data['LanguagesWorkedWith']

language_counter = Counter()

for response in lang_responses:
    language_counter.update(response.split(';'))

# with open('data.csv', encoding="utf-8-sig") as csv_file:
#     csv_reader = csv.DictReader(csv_file)

#     language_counter = Counter()

#     for row in csv_reader:
#         language_counter.update(row['LanguagesWorkedWith'].split(';'))

languages = []
popularity = []

for item in language_counter.most_common(15):
    languages.append(item[0])
    popularity.append(item[1])

languages.reverse()
popularity.reverse()

print(languages)
print(popularity)
# print(language_counter.most_common(15))

plt.barh(languages, popularity)

plt.title('Most Popular Languages')
# plt.ylabel('Programming Languages')
plt.xlabel('Number of People Who Use')

plt.tight_layout()

plt.show()

