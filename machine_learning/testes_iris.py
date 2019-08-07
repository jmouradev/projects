import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets


I = datasets.load_iris()

print(I.keys())

X = I.data

print(X.shape)

trueClass = I.target

X = X.T
m0 = np.mean(X[:, trueClass == 0], axis=1)
m1 = np.mean(X[:, trueClass == 1], axis=1)
m2 = np.mean(X[:, trueClass == 2], axis=1)

X0 = X - m0[:, np.newaxis]
X1 = X - m1[:, np.newaxis]
X2 = X - m2[:, np.newaxis]

D0 = np.sqrt(np.sum(X0 * X0, axis=0))
D1 = np.sqrt(np.sum(X1 * X1, axis=0))
D2 = np.sqrt(np.sum(X2 * X2, axis=0))

Dtotal = np.vstack((D0, D1, D2))
estClass = np.argmin(Dtotal, axis=0)

# estClass=np.argmin(Dtotal, axis=0)

classifMatrix = np.array(
    [
        [
            sum(estClass[trueClass == 0] == 0),
            sum(estClass[trueClass == 0] == 1),
            sum(estClass[trueClass == 0] == 2),
        ],
        [
            sum(estClass[trueClass == 1] == 0),
            sum(estClass[trueClass == 1] == 1),
            sum(estClass[trueClass == 1] == 2),
        ],
        [
            sum(estClass[trueClass == 2] == 0),
            sum(estClass[trueClass == 2] == 1),
            sum(estClass[trueClass == 2] == 2),
        ],
    ]
)

print("Matriz de Confusão: \n" + str(classifMatrix))
plt.plot(Dtotal.T)
plt.show()
