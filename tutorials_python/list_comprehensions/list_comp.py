A = [1, 3, 5, 7]
B = [2, 4, 6, 8]

cartesian_product = [(a, b) for a in A for b in B]

print(cartesian_product)

lst = [2, -3, 1]

# result = 4 * lst  # lst + lst + lst
result = [4 * x for x in lst]
print(result)

data = [('test', 2000), ('novo_teste', 2001), ('teste 3', 2009), ('teste 4', 2020)]

r = [name for (name, year) in data if year >= 2001]
print(r)
