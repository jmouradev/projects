from matplotlib import pyplot as plt
import numpy as np

# import matplotlib.pyplot as plt

# # Styles

# ['seaborn-dark', 'seaborn-darkgrid', 'seaborn-ticks', 'fivethirtyeight', 'seaborn-whitegrid', 'classic',
# '_classic_test', 'fast', 'seaborn-talk', 'seaborn-dark-palette', 'seaborn-bright', 'seaborn-pastel',
# 'grayscale', 'seaborn-notebook', 'ggplot', 'seaborn-colorblind', 'seaborn-muted', 'seaborn', 'Solarize_Light2',
# 'seaborn-paper', 'bmh', 'tableau-colorblind10', 'seaborn-white', 'dark_background', 'seaborn-poster', 'seaborn-deep']

# print(plt.style.available)

plt.style.use("fivethirtyeight")

ages_x = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
x_indexes = np.arange(len(ages_x))
width = 0.25

dev_y = [38496, 42000, 46752, 49320, 53200, 56000, 62316, 64928, 67317, 68748, 73752]
plt.bar(x_indexes - width, dev_y, width=width, label="All Devs")

py_dev_y = [38496, 42000, 46752, 49320, 52200, 56040, 62316, 64928, 67317, 67748, 83722]
plt.bar(x_indexes, py_dev_y, width=width, label="Python")

js_dev_y = [38296, 42300, 44552, 47320, 52200, 54040, 61316, 63928, 64317, 66748, 81722]
plt.bar(x_indexes + width, js_dev_y, width=width, label="JavaScript")

plt.xlabel("Age")
plt.ylabel("Median Salary (USD)")
plt.title("Median Salary (USD) by Age")

plt.legend()

plt.xticks(ticks=x_indexes, labels=ages_x)

plt.tight_layout()

plt.show()
