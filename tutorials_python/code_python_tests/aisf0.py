class Employee:
    def __init__(self, name, sal):
        self._name = name  # protected attribute
        self._salary = sal  # protected attribute


if __name__ == "__main__":

    e1 = Employee("Joao", 10000)
    print(e1._salary)

    e1._salary = 20000

    print(e1._salary)

    s = 'Hello'
    print(isinstance(s, str))
