def square_numbers(nums):
    result = []
    for i in nums:
        result.append(i * i)
    return result


def square_numbers_generator(nums):
    for i in nums:
        yield (i * i)


# my_nums = square_numbers([1, 2, 3, 4, 5])
# my_nums = square_numbers_generator([1, 2, 3, 4, 5])  # generator
# my_nums = [x * x for x in [1, 2, 3, 4, 5]]
my_nums = (x * x for x in [1, 2, 3, 4, 5])  # generator

for num in my_nums:
    print(num)

print(my_nums)  # [1, 4, 9, 16, 25]
# print(next(my_nums))
# print(next(my_nums))
# print(next(my_nums))
# print(next(my_nums))
# print(next(my_nums))
