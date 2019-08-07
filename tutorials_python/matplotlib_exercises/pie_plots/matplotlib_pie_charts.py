from matplotlib import pyplot as plt

plt.style.use('fivethirtyeight')

# slices = [60, 20, 10, 10]
# labels = ['Sixty', 'Fourty', 'Extra1', 'Extra2']
# colors = ['blue', 'red', 'yellow', 'green']

slices = [59219, 55466, 47544, 36443, 35917]
labels = ['JavaScript', 'HTML/CSS', 'SQL', 'Python', 'Java']
explode = [0, 0, 0, 0.1, 0]

plt.pie(slices, labels=labels, explode=explode, shadow=True, startangle=90, autopct='%1.1f%%', wedgeprops={'edgecolor': 'black'})

plt.title('My Awsome Pie Chart')

plt.tight_layout()
plt.show()
