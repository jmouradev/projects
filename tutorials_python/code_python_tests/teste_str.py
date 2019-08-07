import unittest


class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        """[summary]

        [description]
        """
        self.assertEqual("foo".upper(), "FOO")

    def test_isupper(self):
        """[summary]

        [description]
        """
        self.assertTrue("FOO".isupper())
        self.assertFalse("Foo".isupper())

    def test_split(self):
        """[summary]

        [description]
        """
        st = "hello world"
        self.assertEqual(st.split(), ["hello", "world"])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            st.split(2)


if __name__ == "__main__":
    unittest.main()
