# coding=utf-8

from sel_accao import SelAccao
from random import choice, random


class SelAccaoEGreedy(SelAccao):

    def __init__(self, mem_aprend, accoes, epsilon):
        self._mem_aprend = mem_aprend
        self._accoes = accoes
        self._epsilon = epsilon

    def seleccionar_accao(self, s):
        if random() < self._epsilon:
            return self.max_accao(s)
        else:
            return self.explorar(s)

    def max_accao(self, s):
        accao = max(self._accoes, key=lambda a: self._mem_aprend.obter(s, a))
        return accao

    def explorar(self, s):
        return choice(self._accoes)
