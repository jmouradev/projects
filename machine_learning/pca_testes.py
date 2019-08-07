import pickle
import numpy as np
import matplotlib
matplotlib.use("TkAgg")
import matplotlib.pyplot as plt

FN = '../AP02-Distancia_data/mnist_small.p'

D = pickle.load(open(FN, 'rb'), encoding='iso-8859-1')

train3 = D['train3']

I3_8 = np.reshape(train3[:, 7], (28, 28))

plt.imshow(255 - I3_8, interpolation='none', cmap='gray')
# plt.show()

I3_m = np.mean(train3, 1)

plt.imshow(255 - np.reshape(I3_m, (28, 28)), interpolation='none', cmap='gray')
plt.show()
