# coding=utf-8
from mec_aprend import MecAprend
from controlo import Controlo
from psa.util import dirmov
from psa.accao import Mover


class ControloAprendRef(Controlo):

    def __init__(self):

        self._s = None
        self._a = None
        self._rmax = 100
        self._accoes = [Mover(ang, ang_abs=True) for ang in dirmov()]
        self._mec_aprend = MecAprend(self._accoes)

    def processar(self, percepcao):

        # estado onde se vai parar depois de uma acção
        sn = percepcao.posicao

        if self._a is not None:
            r = self._gerar_reforco(percepcao)
            self._mec_aprend.aprender(self._s, self._a, r, sn)
        a_linha = self._mec_aprend.seleccionar_accao(self._s)

        self._s = sn
        self._a = a_linha

        if a_linha is not None:
            return a_linha

    def _gerar_reforco(self, percepcao):
        r = -percepcao.custo_mov  # custo do último movimento (percepcao.custo_accao -> valor real positivo)

        if percepcao.colisao:  # se o agente colidiu na última acção
            r = r - self._rmax
        if percepcao.carga:  # se houve recolha de alvo na última acção
            r = r + self._rmax

        return r
