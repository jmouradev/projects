
import pickle
import numpy as np
import matplotlib.pyplot as plt

file = '../AP02-Distancia_data/mnist_small.p'

D = pickle.load(open(file, 'rb'), encoding='iso-8859-1')

(X0, X1, X2, X3, X4, X5, X6, X7, X8, X9) = (D['train0'], D['train1'], D['train2'], D['train3'], D['train4'], D['train5'], D['train6'], D['train7'], D['train8'], D['train9'])

X = np.hstack((X0, X1, X2, X3, X4, X5, X6, X7, X8, X9))
X = X * 1.0
Xorg = X
X = np.vstack((np.ones(Xorg.shape[1]), Xorg))

print(X.shape)

Y = np.ones((10, 10000))

for i in range(10):
    Y[i, i * 1000:(i + 1) * 1000] = 1

Rx = np.dot(X, X.T)
Rxy = np.dot(X, Y.T)
W = np.dot(np.linalg.pinv(Rx), Rxy)

plt.plot(Y[1, :], '*')
# plt.show()

YhTrain = np.dot(W.T, X)
estC = np.argmax(YhTrain, axis=0)

plt.plot(estC)
# plt.show()

trueC = np.zeros(10000)

for i in range(10):
    trueC[i * 1000:(i + 1) * 1000] = i

plt.plot(trueC, 'r')
plt.show()

print(np.sum(trueC != estC))
