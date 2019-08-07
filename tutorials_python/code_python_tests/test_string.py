def rec_string(given_string):

    count = {}

    for c in given_string:
        if c in count:
            return c
        count[c] = 1
        print(count)
    return None


def anagram(a, b):
    if a is None or b is None:
        return False

    if isinstance(a, str) and isinstance(b, str):
        for c in a:
            if c in b:
                return True
            else:
                return False


def anagram2(a, b):
    if a is None or b is None:
        return False
    else:
        if isinstance(a, str) and isinstance(b, str):
            str1 = sorted(a)
            str2 = sorted(b)
            return str1 == str2
        else:
            return False


def anagram3(a, b):
    if a is None or b is None:
        return False

    if isinstance(a, str) and isinstance(b, str) and len(a) == len(b):
        str1 = sorted(a.lower())
        str2 = sorted(b.lower())
        return str1 == str2
    else:
        return False


# string = "DBCABA"
# print(rec_string(string))

# str1 = 'ABBC'
# str2 = 'BABC'

str1 = "listen"
str2 = "silEnt"

# print(anagram(str1, str2))
# print(anagram(None, str2))
# print(anagram(str1, ''))
# print(anagram(None, None))


# print(anagram2(str1, str2))
# print(anagram2(None, str2))
# print(anagram2(str1, ''))
# print(anagram2(None, None))
# print(anagram2(1, 100))
# print(anagram2('NAN', 'ANN'))

print(anagram3(str1, str2))
print(anagram3(None, str2))
print(anagram3(str1, ""))
print(anagram3(1, 100))
print(anagram3("NAN", "ANN"))
