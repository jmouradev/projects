import random
from itertools import count
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

plt.style.use('fivethirtyeight')

# x_vals = [0, 1, 2, 3, 4, 5]
# y_vals = [0, 1, 3, 2, 3, 5]

# plt.plot(x_vals, y_vals)

x_vals = []
y_vals = []

index = count()

# def animate(i):
#     x_vals.append(next(index))
#     y_vals.append(random.randint(0, 5))

#     plt.cla()
#     plt.plot(x_vals, y_vals)

# ani = FuncAnimation(plt.gcf(), animate, interval=1000)

# plt.tight_layout()
# plt.show()


def animate(i):
    data = pd.read_csv('data_test.csv')
    x = data['x_value']
    y1 = data['total_1']
    y2 = data['total_2']

    plt.cla()
    plt.plot(x, y1, label='Channel 1')
    plt.plot(x, y2, label='Channel 2')
    plt.tight_layout()

ani = FuncAnimation(plt.gcf(), animate, interval=1000)

plt.tight_layout()
plt.show()