from matplotlib import pyplot as plt

# import matplotlib.pyplot as plt

## Styles

# ['seaborn-dark', 'seaborn-darkgrid', 'seaborn-ticks', 'fivethirtyeight', 'seaborn-whitegrid', 'classic', 
# '_classic_test', 'fast', 'seaborn-talk', 'seaborn-dark-palette', 'seaborn-bright', 'seaborn-pastel', 
# 'grayscale', 'seaborn-notebook', 'ggplot', 'seaborn-colorblind', 'seaborn-muted', 'seaborn', 'Solarize_Light2', 
# 'seaborn-paper', 'bmh', 'tableau-colorblind10', 'seaborn-white', 'dark_background', 'seaborn-poster', 'seaborn-deep']

# print(plt.style.available)

plt.style.use("fivethirtyeight")

dev_x = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]

dev_y = [38496, 42000, 46752, 49320, 53200, 56000, 62316, 64928, 67317, 68748, 73752]
plt.plot(dev_x, dev_y, label="All devs")

py_dev_y = [38496, 42000, 46752, 49320, 52200, 56040, 62316, 64928, 67317, 67748, 83722]
plt.plot(dev_x, py_dev_y, label="Python")

py_dev_y_js = [38296, 42300, 44552, 47320, 52200, 54040, 61316, 63928, 64317, 66748, 81722]
plt.plot(dev_x, py_dev_y_js, label="JavaScript")

plt.xlabel("Age")
plt.ylabel("Median Salary (USD)")
plt.title("Median Salary (USD) by Age")

plt.legend()

plt.tight_layout()

plt.show()

# Colors:
# Blue = #008fd5
# Red = #fc4f30
# Yellow = #e5ae37
# Green = #6d904f
