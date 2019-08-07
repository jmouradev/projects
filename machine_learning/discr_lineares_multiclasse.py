# -*- coding: utf-8 -*-

import pickle
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

file = "../AP02-Distancia_data/mnist_small.p"
D = pickle.load(open(file, "rb"), encoding="iso-8859-1")

(X0, X1, X2, X3, X4, X5, X6, X7, X8, X9) = (
    D["train0"],
    D["train1"],
    D["train2"],
    D["train3"],
    D["train4"],
    D["train5"],
    D["train6"],
    D["train7"],
    D["train8"],
    D["train9"],
)

X = np.hstack((X0, X1, X2, X3, X4, X5, X6, X7, X8, X9))
X = np.vstack((np.ones(10000), X))

print(X.shape)

Y = -np.ones((10, 10000))

for i in range(10):
    Y[i, i * 1000 : (i + 1) * 10000] = 1

Rx = np.dot(X, X.T)
rxy = np.dot(X, Y.T)

W = np.dot(np.linalg.pinv(Rx), rxy)

Yht = np.dot(W.T, X.T)

estCt = np.argmax(Yht, axis=0)

trueCt = np.zeros(10000)
for i in range(10):
    trueCt[i, i * 1000 : (i + 1) * 1000] = i

confMatrix = confusion_matrix(trueCt, estCt)

print(confMatrix)
