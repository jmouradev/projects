# coding=utf-8
from aprend_ref.aprend_q import AprendQ
from aprend_ref.memoria_esparsa import MemoriaEsparsa
from aprend_ref.sel_accao_e_greedy import SelAccaoEGreedy
import psa


class MecAprend:

    def __init__(self, accoes):

        self._alfa = 0.5
        self._gama = 0.9
        self._epsilon = 0.01
        self._accoes = accoes
        self.memoria = MemoriaEsparsa()
        self.sel_accao = SelAccaoEGreedy(self.memoria, self._accoes, self._epsilon)
        self.aprend_ref = AprendQ(self.memoria, self.sel_accao, self._alfa, self._gama)

    def aprender(self, s, a, r, sn):
        self.mostrar(s)
        self.aprend_ref.aprender(s, a, r, sn)

    def seleccionar_accao(self, s):
        return self.sel_accao.seleccionar_accao(s)

    def mostrar(self, s):
        psa.vis(1).limpar()
        psa.vis(1).aprendref(self.aprend_ref)
