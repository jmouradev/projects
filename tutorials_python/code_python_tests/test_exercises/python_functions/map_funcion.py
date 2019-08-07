import math
import statistics
from functools import reduce


def area(r):
    """Area of a circle with a radius 'r'."""
    return math.pi * (r ** 2)


radii = [2, 5, 7.1, 0.3, 10]

# Method 1: Direct method

areas = []
for r in radii:
    areas.append(area(r))

print(areas)

# Method 2: Use 'map' function

print(list(map(area, radii)))


temps = [
    ("Berlin", 29),
    ("Cairo", 36),
    ("Buenos Aires", 19),
    ("Los Angeles", 26),
    ("Tokyo", 27),
    ("New York", 28),
    ("London", 22),
    ("Beijing", 32),
]

# Example 1 - assigned with lambda
c_to_f = lambda data: (data[0], (9 / 5) * data[1] + 32)

# Example 2 - assigned with def


def c_to_f_v2(data):
    final = []
    for i in data:
        final.append((i[0], (9 / 5) * i[1] + 32))
    return final


# c_to_f(temps)
print(list(map(c_to_f, temps)))
print(c_to_f_v2(temps))


# 'filter' function

data = [1.3, 2.7, 0.8, 4.1, 4.3, -0.1]

avg = statistics.mean(data)
# print(f"Data mean = {avg}")

func = filter(lambda x: x > avg, data)
print(list(func))


def calc_with_filter(data):
    avg = statistics.mean(data)
    result = []

    for x in data:
        if x > avg:
            result.append(x)
    return result

a = calc_with_filter(data)
print(a)


# 'reduce' function

data = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

multiplier = lambda x, y: x*y
print(f"Execution with 'reduce' function -> {reduce(multiplier, data)}")


def mult_all(data):
    product = 1
    for x in data:
        product *= x
    return product


print(f"Execution with a custom function -> {mult_all(data)}")
