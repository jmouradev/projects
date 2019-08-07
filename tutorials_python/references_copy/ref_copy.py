L = [1, 2, 3]

D = {'a': 1, 'b': 2}

A = L[:]
B = D.copy()

print(f'L -> {L}')
print(f'D -> {D}')
print('')
print(f'A -> {A}')
print(f'B -> {B}')

A[1] = 'Ni'
B['c'] = 'spam'

print(f'New A -> {A}')
print(f'New B -> {B}')
