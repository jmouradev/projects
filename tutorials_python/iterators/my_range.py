
class MyRange(object):
    """docstring for ClassName"""
    def __init__(self, start, end):
        self.value = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.value >= self.end:
            raise StopIteration
        current = self.value
        self.value += 1
        return current


def my_range(start, end):
    current = start
    while current < end:
        yield current
        current += 1


nums = my_range(1, 10)
# print(next(nums))


# nums = MyRange(1, 10)

for num in nums:
    print(num)

# print(next(nums))
# print(next(nums))
# print(next(nums))
# print(next(nums))
