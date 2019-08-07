
import numpy as np
import numpy.linalg as la
import sklearn as sk
from sklearn.linear_model import LogisticRegression as LR

from sklearn.neighbors.nearest_centroid import NearestCentroid as NC
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier as KNC

print("sk.__version__")
print(sk.__version__)

BC = datasets.load_breast_cancer()
print("BC.keys()")
print(BC.keys())
X = BC['data']
print("X.shape")
print(X.shape)

GT = BC.target

print("GT.shape")
print(GT.shape)
print("GT[:20]")
print(GT[:20])


Xx, y = np.arange(10).reshape((5, 2)), range(5)
print("Xx")
print(Xx)
print("list(y)")
print(list(y))
Xtrain, Xtest, y_train, y_test = train_test_split(Xx, y, test_size=0.33, random_state=42)
print("Xtrain")
print(Xtrain)
print("Xtest")
print(Xtest)
print("y_train")
print(y_train)
print("y_test")
print(y_test)

train_test_split(y, shuffle=False)

X1, X2, t1, t2 = train_test_split(X, GT, test_size=.5, shuffle=True)
print("X1.shape")
print(X1.shape)
print("X2.shape")
print(X2.shape)

KNN = KNC(n_neighbors=5, weights='uniform')
KNN.fit(X1, t1)

estC = KNN.predict(X2)
print("np.sum(estC!=t2)")
print(np.sum(estC != t2))
print("(1. - 25.) / 285")
print(1. - (25. / 285))

print("KNN.score(X2, t2)")
print(KNN.score(X2, t2))

# vem dos zeros, vai para os zeros
p11 = np.sum(estC[t2 == 0] == 0)
print("p11")
print(p11)
# vem dos zeros vai para os uns
p12 = np.sum(estC[t2 == 0] == 1)
print("p12")
print(p12)
# vem dos uns vai para os zeros
p21 = np.sum(estC[t2 == 1] == 0)
print("p21")
print(p21)
# vem dos uns vai para os uns
p22 = np.sum(estC[t2 == 1] == 1)
print("p22")
print(p22)
CM = np.array([[p11, p12], [p21, p22]])
print("CM")
print(CM)

logR = LR()
print("logR.fit(X1,t1)")
print(logR.fit(X1, t1))

print("logR.score(X2, t2)")
print(logR.score(X2, t2))
estC = logR.predict(X2)
p12 = np.sum(estC[t2 == 0] == 1)
p21 = np.sum(estC[t2 == 1] == 0)
print("p12")
print(p12)
print("p21")
print(p21)
