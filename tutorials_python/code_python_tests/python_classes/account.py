class Account:
    def __init__(self, owner, amount=0):
        """This is the constructor that lets us create
        objects from this class"""

        self.owner = owner
        self.amount = amount
        self._transactions = []

    def __repr__(self):
        """The “official” string representation of an object. 
        This is how you would make an object of the class."""

        return "Account({!r}, {!r})".format(self.owner, self.amount)

    def __str__(self):
        """The “informal” or nicely printable string representation of an object. 
        This is for the enduser."""

        return "Account of {} with starting amount: {}".format(self.owner, self.amount)

    def add_transaction(self, amount):
        if not isinstance(amount, int):
            raise ValueError("please use int for amount")
        self._transactions.append(amount)

    @property
    def balance(self):
        return self.amount + sum(self._transactions)

    def __len__(self):

        return len(self._transactions)

    def __getitem__(self, position):

        return self._transactions[position]

    def __reversed__(self):

        return self[::-1]

    def __eq__(self, other):

        return self.balance == other.balance

    def __lt__(self, other):

        return self.balance < other.balance

    # def __add__(self, other):

    #     owner = f"{self.owner} & {other.owner}"
    #     start_amount = self.amount + other.amount
    #     acc = Account(owner, start_amount)
    #     for t in list(self) + list(other):
    #         acc.add_transaction(t)
    #     return acc

    def __add__(self, other):

        owner = self.owner + other.owner
        start_amount = self.balance + other.balance
        return Account(owner, start_amount)

    def __call__(self):
        print(f"Start amount: {self.amount}")
        print("Transactions: ")
        for transaction in self:
            print(transaction)
        print(f"\nBalance: {self.balance}")

    def __enter__(self):
        print("ENTER WITH: Making backup of transactions for rollback")
        self._copy_transactions = list(self._transactions)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("EXIT WITH:", end=" ")
        if exc_type:
            self._transactions = self._copy_transactions
            print("Rolling back to previous transactions")
            print(f"Transaction resulted in {exc_type.__name__} ({exc_val})")
        else:
            print("Transaction OK")


if __name__ == "__main__":

    acc = Account("Joao", 10)  # default amount=0
    acc1 = Account("Henry", 10000)

    print(acc)
    print(type(acc))
    print(f"String returned from __str__() method: {acc}")
    print(f"String returned from __repr__() method: {acc!r}")

    acc.add_transaction(20)
    acc.add_transaction(-10)
    acc.add_transaction(50)
    acc.add_transaction(-20)
    acc.add_transaction(30)

    acc1.add_transaction(500)
    acc1.add_transaction(-202)
    acc1.add_transaction(3000)

    print(acc.balance)
    print(acc._transactions)
    print(len(acc))

    print(acc1.balance)
    print(acc1._transactions)
    print(len(acc1))

    print(acc[2])
    print(acc1[1])

    print(acc > acc1)

    # print(list(reversed(acc)))
    acc2 = acc + acc1
    print(f"{acc2!r}")

    acc()
    acc1()

    def validate_transaction(acc, amount_to_add):
        with acc as a:
            print(f"Adding {amount_to_add} to account")
            a.add_transaction(amount_to_add)
            print(f"New balance would be: {a.balance}")
            if a.balance < 0:
                raise ValueError("sorry cannot go in debt!")

    acc4 = Account("sue", 10)

    print(f"\nBalance start: {acc4.balance}")
    validate_transaction(acc4, 20)

    print(f"\nBalance end: {acc4.balance}")
