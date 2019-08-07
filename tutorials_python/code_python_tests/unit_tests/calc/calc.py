

def add(x, y):
    '''Add function'''
    return x + y


def subtract(x, y):
    '''Subtraction function'''
    return x - y


def mul(x, y):
    '''Multiplication function'''
    return x * y


def div(x, y):
    '''Division function'''
    if y == 0:
        raise ValueError('Cannot divide by zero!')
    return x / y
