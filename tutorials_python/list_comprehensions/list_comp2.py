import time
import mem_profile2
import pandas as pd


L = [1, 2, 3, 4, 5]

# data = pd.read_csv('data.csv')

# ids = data['Responder_id']
# print(ids[1:])

# print(f"Memory (Before): {mem_profile2.memory_usage_psutil()}Mb")

t1 = time.perf_counter()

for i in range(len(L)):
    L[i] += 10

# L = [x + 10 for x in L]

print(L)

t2 = time.perf_counter()

with_for = 3.739099999999773e-05
with_list_comp = 3.543899999999822e-05
print(with_for > with_list_comp)

# print(f"Memory (After) : {mem_profile2.memory_usage_psutil()}Mb")
print(f"Took {t2 - t1} Seconds")
