import pickle
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error

import numpy.random as rd

file = "../AP02-Distancia_data/mnist_small.p"

D = pickle.load(open(file, "rb"), encoding="iso-8859-1")

# #print(D.keys())

# X0 = D['train0']
# X1 = D['train1']

# x0 = X0[:,100] # coluna 100

# print(x0.shape)

# # I_100 = np.reshape(x0, (28, 28))
# m0 = np.mean(X0, axis=1)
# # print(m0.shape)
# # plt.imshow(255 - np.reshape(m0, (28, 28)), interpolation='none', cmap='gray')

# s0 = np.sum(X0, axis=1)
# idx = s0==0
# std0 = np.std(X0, axis=1)
# # std0 = np.var(X0, axis=1)
# # print(std0)
# print(np.sum(std0==0))
# # print(np.round(std0, 0))
# # plt.imshow(255 - np.reshape(s0, (28, 28)), interpolation='none', cmap='gray')
# print(s0.shape)

# C0 = np.cov(X0)
# C1 = np.cov(X1)
# plt.figure()
# plt.imshow(C0)
# plt.colorbar()
# # plt.show()

# plt.imshow(C1)
# plt.colorbar()
# plt.show()


# W = rd.randint(-5, 5, (2, 2))
# print(W)
# x = rd.randn(2, 1000)
# y = np.dot(W, x)
# cov_y = np.cov(y)
# z = y / 4.
# plt.figure()
# plt.axis('scaled')
# plt.plot(z)
# plt.show()

# a = np.array([0, 255]).astype('uint8')
# a_teste = np.random.randn(28, 28)
# print(a)
# print(a + 1)
# print(a - 1)

# print(a_teste)
# print(a_teste.min())
# print(a_teste.max())

# plt.imshow(a_teste)
# plt.imshow(255 - I_100, interpolation='none', cmap='gray')
# plt.show()

# train3 = D['train3']
# print(train3.shape)
# I3_8 = np.reshape(train3[:,7], (28, 28))
# I3_m = np.mean(train3, 1)
# print(I3_8.shape)
# print(I3_m.shape)
# plt.imshow(255-I3_8, interpolation='none', cmap='gray')
# #plt.imshow(I3_m, interpolation='none', cmap='gray')
# plt.show()

## VECTORES PRÓPRIOS

X0 = D["train0"]
X1 = D["train1"]
X2 = D["train2"]
X3 = D["train3"]
X4 = D["train4"]
X5 = D["train5"]
X6 = D["train6"]
X7 = D["train7"]
X8 = D["train8"]
X9 = D["train9"]

X = np.hstack((X0, X1, X2, X3, X4, X5, X6, X7, X8, X9))
print(X.shape)

X = X.astype("float")
# print(X)

Cx = np.cov(X)
print("Matriz de Covariância: \n" + str(Cx))
# print(Cx.shape)
# plt.imshow(Cx)
# plt.show()

u, V = np.linalg.eig(Cx)
# print(np.imag(u)) # verificar valor máximo imaginário
a = u.real
print(a.min())
print(a.max())
b = u.imag
u = u.real  # converter para real
print(b.min())
print(b.max())
print(np.sum(np.abs(b)))

# plt.plot(np.log(u), '.-')
# plt.show()

idx = np.argsort(-u)  # -u para ordem decrescente
u = u[idx]  # ordenar valores
V = V[:, idx]  # ordenar vectores
V = V.real  # tirar parte imaginária (verificar se é desprezável)
# print(u)
# print(V)
V = V[:, u >= 1e-10]  # remover componentes com v ≈ 0
print(V)
print(np.sum(u >= 1e-10))
print(np.sum(u > 0.0))
Y = np.dot(V.T, X)
Cy = np.cov(Y)
plt.imshow(Cy)
# plt.show()
# print(np.round(Cy))

a = rd.randn(4, 4)
b = np.diag(a)  # valores próprios
# print(b)
# print(u[0:10])

un = u / np.sum(u)
print(np.sum(un))
# print(un[0:10])

uc = np.cumsum(un)
print(uc)

print(
    "Número de componentes que contêm 95% da variância = " + str(np.sum(uc < 0.95))
)  # 150 componentes
print(
    "Número de componentes que contêm 99% da variância = " + str(np.sum(uc < 0.99))
)  # 325 componentes
# print(np.sum(uc[:150]))
# print(np.sum(un[:150]))
# print(np.sum(un[:151]))
V = V[:, 0:151]  # ex: escolher k=151
mx = np.mean(X, 1)  # X matriz com todos os dígitos
Xn = X - mx[:, np.newaxis]
Y = np.dot(V.T, Xn)
print(Y.shape)
# Y2 = np.dot(V.T, X)
# print(Y2.shape)

# Fazer transformação inversa
Xr = np.dot(V, Y)
Xr = Xr + mx[:, np.newaxis]  # repôr a média

# Normalizar amplitudes dos dígitos reconstruídos
# (para terem valores entre [0, 255])
Xr = Xr - Xr.min()
Xr = 255.0 * Xr / Xr.max()

# plt.imshow(np.reshape(V[:,0], (28,28)), interpolation='none', cmap='gray')
# plt.show()
# plt.imshow(np.reshape(V[:,1], (28,28)), interpolation='none', cmap='gray')
# plt.show()
# plt.imshow(np.reshape(V[:,2], (28,28)), interpolation='none', cmap='gray')
# plt.show()
# plt.imshow(np.reshape(V[:,3], (28,28)), interpolation='none', cmap='gray')
# plt.show()

print(V.shape)

x0 = X0.astype("float")
x6 = X6.astype("float")

y0 = np.dot(V[:, 0:50].T, x0)
x0r = np.dot(V[:, 0:50], y0)

x0r = x0r - x0r.min()
x0r = 255.0 * x0r / x0r.max()

y0 = np.dot(V[:, 0:150].T, x0)
x0r = np.dot(V[:, 0:150], y0)

# y0 = np.dot(V[:,0:300].T, x0)
# x0r = np.dot(V[:,0:300], y0)

# plt.imshow(x0r, interpolation='none', cmap='gray')
# plt.show()

# y6 = np.dot(V[:,279].T, x6)
# x6r = np.dot(V[:,279], y6)

print(x0.shape)
print(x0r.shape)

# print(x6.shape)
# print(x6r.shape)
