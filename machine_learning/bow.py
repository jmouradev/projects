from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

corpus = [
    "you better start swimming or you’ll sink like a stone for the times they are a-changing",
    "the loser now will be later to win cause the times they are a-changing",
    "it’ll soon shake your windows and rattle your walls for the times they are a-changing",
]

CVect = CountVectorizer()
CVect.fit(corpus)
Vocab = CVect.vocabulary_

print(Vocab)

BoW = CVect.transform(corpus)

# print(BoW)

X = BoW.toarray()

print(X)

word, idx = (list(Vocab.keys()), np.argsort(next(iter(Vocab.values()))))
wordSort = [word[i] for i in idx]

for i in range(len(wordSort)):
    print("%d  %s" % (i, wordSort[i]))

for i, e in enumerate(wordSort):
    print("%d  %s" % (i, e))
