# -*- coding: utf-8 -*-

import pickle
import numpy as np
import matplotlib

matplotlib.use("TkAgg")
import matplotlib.pyplot as plt
import scipy.spatial.distance as spd


FN = "../AP02-Distancia_data/APDistancias001data.p"
FN1 = "../AP02-Distancia_data/mnist_small.p"

D = pickle.load(open(FN1, "rb"), encoding="iso-8859-1")

X0 = D["train0"][:, 0:200]
X1 = D["train1"][:, 0:200]
X2 = D["train2"][:, 0:200]
X3 = D["train3"][:, 0:200]
X4 = D["train4"][:, 0:200]
X5 = D["train5"][:, 0:200]
X6 = D["train6"][:, 0:200]
X7 = D["train7"][:, 0:200]
X8 = D["train8"][:, 0:200]
X9 = D["train9"][:, 0:200]
X = np.hstack((X0, X1, X2, X3, X4, X5, X6, X7, X8, X9))
I = spd.squareform(spd.pdist(X.T, "euclidean"))

print(D.keys())
print(X.shape)

# plt.imshow(255 - np.reshape(X0[:,100], (28,28)), cmap = 'gray', interpolation = 'none')
plt.imshow(I, cmap="gray", interpolation="none")
plt.show()
