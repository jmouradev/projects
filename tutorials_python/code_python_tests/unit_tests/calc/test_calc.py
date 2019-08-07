import unittest
import calc


class TestCalc(unittest.TestCase):


    def test_add(self):
        result = calc.add(10, 5)
        self.assertEqual(result, 15)
        self.assertEqual(calc.add(-1, 1), 0)
        self.assertEqual(calc.add(-1, -1), -2)


    def test_subtract(self):
        result = calc.subtract(10, 5)
        self.assertEqual(result, 5)
        self.assertEqual(calc.subtract(-1, 1), -2)
        self.assertEqual(calc.subtract(-1, -1), 0)


    def test_mul(self):
        result = calc.mul(10, 5)
        self.assertEqual(result, 50)
        self.assertEqual(calc.mul(-1, 1), -1)
        self.assertEqual(calc.mul(-1, -1), 1)


    def test_div(self):
        result = calc.div(10, 5)
        self.assertEqual(result, 2)
        self.assertEqual(calc.div(-1, 1), -1)
        self.assertEqual(calc.div(-1, -1), 1)
        self.assertRaises(ValueError, calc.div, 10, 0)


if __name__ == '__main__':
    unittest.main()

