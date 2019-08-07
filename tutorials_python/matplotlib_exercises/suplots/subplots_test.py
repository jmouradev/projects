import pandas as pd
from matplotlib import pyplot as plt

plt.gcf()
plt.gca()

plt.style.use('seaborn')

data = pd.read_csv('data6.csv')
ages = data['Age']
dev_salaries = data['All_Devs']
py_salaries = data['Python']
js_salaries = data['JavaScript']

nrows = 2
ncols = 2

fig, ax = plt.subplots(nrows=nrows, ncols=ncols)

print(ax)


for i in range(nrows):
    for j in range(ncols):
        ax[i, j].plot(ages,
                      py_salaries,
                      color='#444444',
                      linestyle='--',
                      label='All Devs')
        ax[nrows - 1, j].set_xlabel('Ages')
        ax[i, 0].set_ylabel(i)

# print(ax1)
# print(ax2)

# ax1.plot(ages, dev_salaries, color='#444444',
#          linestyle='--', label='All Devs')

# ax2.plot(ages, py_salaries, label='Python')
# ax2.plot(ages, js_salaries, label='JavaScript')

# ax1.legend()
# ax1.set_title('Median Salary (USD) by Age')
# ax1.set_ylabel('Median Salary (USD)')

# ax2.legend()
# ax2.set_xlabel('Ages')
# ax2.set_ylabel('Median Salary (USD)')

plt.tight_layout()

plt.show()
