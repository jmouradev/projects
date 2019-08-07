import logging

# DEBUG: Detailed information, typically of interest only when diagnosing problems.

# INFO: Confirmation that things are working as expected.

# WARNING: An indication that something unexpected happened, or indicative of some problem in the near future
# (e.g. ‘disk space low’). The software is still working as expected.

# ERROR: Due to a more serious problem, the software has not been able to perform some function.

# CRITICAL: A serious error, indicating that the program itself may be unable to continue running.

logging.basicConfig(
    filename="test.log",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filemode="w"
)


def add(x, y):
    """add function"""
    return x + y


def subtract(x, y):
    """subract function"""
    return x - y


def multiply(x, y):
    """multiply function"""
    return x * y


def divide(x, y):
    """divide function"""
    if y == 0:
        raise ValueError("Cannot divide by zero!")
    return x / y


num_1 = 10
num_2 = 5

add_result = add(num_1, num_2)
logging.debug(f"Add: {num_1} + {num_2} = {add_result}")

sub_result = subtract(num_1, num_2)
logging.debug(f"Sub: {num_1} - {num_2} = {sub_result}")

mul_result = multiply(num_1, num_2)
logging.debug(f"Mul: {num_1} * {num_2} = {mul_result}")

div_result = divide(num_1, num_2)
logging.debug(f"Div: {num_1} / {num_2} = {div_result}")
