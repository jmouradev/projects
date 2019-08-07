
import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

BH = datasets.load_boston()

# print(BH['DESCR'])

Xtrain, Xtest, ytrain, ytest = train_test_split(BH.data, BH.target)
print(Xtrain.shape)

linReg = LinearRegression().fit(Xtrain, ytrain)
X = np.vstack((np.ones(Xtrain.shape[0]), Xtrain.T))
Rxi = np.linalg.pinv(np.dot(Xtrain.T, Xtrain))
rxy = np.dot(Xtrain.T, ytrain.T)
w = np.dot(Rxi, rxy)

yh = linReg.predict(Xtrain)

plt.plot(ytrain - yh)
plt.show()

print(linReg.intercept_)
print(linReg.coef_)
print("Coeficiente R2 (treino) = %f  " % linReg.score(Xtrain, ytrain))
print("Coeficiente R2 (teste) = %f  " % linReg.score(Xtest, ytest))
