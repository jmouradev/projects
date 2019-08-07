"""
=====================
Scatter Custom Symbol
=====================

Creating a custom ellipse symbol in scatter plot.

"""
import matplotlib.pyplot as plt
import numpy as np

# unit area ellipse
rx, ry = 3.0, 1.0
area = rx * ry * np.pi
theta = np.arange(0, 2 * np.pi + 0.01, 0.1)
verts = np.column_stack([rx / area * np.cos(theta), ry / area * np.sin(theta)])

x, y, s, c = np.random.rand(4, 30)
s *= 10 ** 2.0

# plt.style.use('seaborn')

fig, ax = plt.subplots()
ax.scatter(x, y, s, c, marker=verts)

# plt.tight_layout()

plt.show()
