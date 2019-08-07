import pickle
import numpy as np
import matplotlib.pyplot as plt


file = "../AP02-Distancia_data/mnist_small.p"

D = pickle.load(open(file, "rb"), encoding="iso-8859-1")


(X0, X1) = (D["train0"], D["train1"])

X0 = X0 * 1.0
X1 = X1 * 1.0

X = np.vstack((np.ones(2000), np.hstack((X0, X1))))
Y = np.hstack((-np.ones(1000), np.ones(1000)))
print(X0.shape)

Rx = np.dot(X, X.T)
rxy = np.dot(X, Y.T)
# w = np.dot(np.linalg.inv(Rx), rxy) # erro singular matrix
Rxi = np.linalg.pinv(Rx)
w = np.dot(Rxi, rxy)
yh = np.dot(w.T, X)
X0t = X0[:, 500]
X1t = X1[:, 500]
# Xt = np.vstack((np.ones(1000), np.hstack((X0t, X1t))))

# Xt = Xt * 1.

# yht = np.dot(w.T, Xt.T)

print(w.shape)

plt.plot(yh.ravel(), ".")
# plt.plot(yht.ravel(), '.')
plt.show()
