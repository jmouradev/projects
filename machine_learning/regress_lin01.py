import pickle
import numpy as np
import matplotlib.pyplot as plt

file = '../AP04-LInMods/RegressData001.p'
D = pickle.load(open(file, 'rb'), encoding='iso-8859-1')

print(D.keys())

(x, y) = (D['x'], D['y'])

X = np.vstack((x, np.ones((1, 500))))
Rx = np.dot(X, X.T)  # matriz 2x2
rxy = np.dot(X, y.T)
w = np.dot(np.linalg.pinv(Rx), rxy)

# print(w)
yh = np.dot(w.T, X)
x1 = np.array([-5, 5])
print(yh.shape)

plt.style.use('fivethirtyeight')

plt.plot(x, y - yh, '.k')
plt.tight_layout()

plt.show()

t = np.linspace(-2, 5, 1000)
print(t.shape)
