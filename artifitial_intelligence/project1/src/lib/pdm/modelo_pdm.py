

class ModeloPDM(object):

    def S(self):
        abstract

    def A(self, s):
        abstract

    def T(self, s, a):
        abstract

    def R(self, s, a, sn):
        abstract
