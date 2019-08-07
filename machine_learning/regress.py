import matplotlib.pyplot as plt
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Ridge

import sklearn

print("Versão do sklearn = " + str(sklearn.__version__))
BH = load_boston()

Xtrain, Xtest, ytrain, ytest = train_test_split(BH.data, BH.target)

poly = PolynomialFeatures(2).fit(Xtrain, ytrain)

Xtrain2 = poly.transform(Xtrain)[:, 1:]
Xtest2 = poly.transform(Xtest)[:, 1:]

print(Xtrain.shape)
print(Xtrain2.shape)

polyReg = LinearRegression().fit(Xtrain2, ytrain)
w = polyReg.coef_
print(w.shape)

print("Coeficiente R2 treino = %f" % polyReg.score(Xtrain2, ytrain))
print("Coeficiente R2 teste = %f" % polyReg.score(Xtest2, ytest))

# plt.plot(Xtrain2[:,0])
# plt.show()

ridge = Ridge(alpha=1.0).fit(Xtrain2, ytrain)

print("Coeficiente R2 treino = %f" % ridge.score(Xtrain2, ytrain))
print("Coeficiente R2 teste = %f" % ridge.score(Xtest2, ytest))

ridge = Ridge(alpha=100.0).fit(Xtrain2, ytrain)

print("Coeficiente R2 treino = %f" % ridge.score(Xtrain2, ytrain))
print("Coeficiente R2 teste = %f" % ridge.score(Xtest2, ytest))
