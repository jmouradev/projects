import pandas as pd
# from matplotlib import pyplot as plt
import matplotlib.pyplot as plt

# plt.style.use('fivethirtyeight')

data = pd.read_csv('data2.csv')
ages = data['Age']
dev_salaries = data['All_Devs']
py_salaries = data['Python']
js_salaries = ['JavaScript']

plt.plot(ages, dev_salaries, color='#444444', linestyle='--', label='All Devs')

plt.plot(ages, py_salaries, label='Python')

overall_median = 57287

# plt.fill_between(ages,
#                  py_salaries,
#                  overall_median,
#                  where=(py_salaries > overall_median),
#                  interpolate=True,
#                  alpha=0.25)

# plt.fill_between(ages,
#                  py_salaries,
#                  overall_median,
#                  where=(py_salaries <= overall_median),
#                  color='red',
#                  interpolate=True,
#                  alpha=0.25)

plt.fill_between(ages,
                 py_salaries,
                 dev_salaries,
                 where=(py_salaries > dev_salaries),
                 interpolate=True,
                 alpha=0.25,
                 label='Above Avg')

plt.fill_between(ages,
                 py_salaries,
                 dev_salaries,
                 where=(py_salaries <= dev_salaries),
                 color='red',
                 interpolate=True,
                 alpha=0.25,
                 label='Below Avg')

plt.legend()

plt.title('Median Salary (USD) by Age')
plt.xlabel("Age")
plt.ylabel("Median Salary (USD)")

plt.tight_layout()

plt.show()

# Colors:
# Blue = #008fd5
# Red = #fc4f30
# Yellow = #e5ae37
# Green = #6d904f
