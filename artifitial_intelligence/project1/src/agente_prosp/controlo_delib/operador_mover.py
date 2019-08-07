from pee.modprob.operador import Operador
from psa.util import mover, dist
from psa.accao import Mover


class OperadorMover(Operador):
    def __init__(self, modelo_mundo, ang):
        self._modelo_mundo = modelo_mundo
        self._ang = ang
        self._accao = Mover(ang, ang_abs=True)

    def aplicar(self, estado):
        novo_estado = mover(estado, self._ang)
        elemento = self._modelo_mundo.obter_elem(novo_estado)
        if elemento in ["vazio", "alvo"]:
            return novo_estado

    def custo(self, estado, novo_estado):
        return max(dist(estado, novo_estado), 1)

    @property
    def ang(self):
        return self._ang

    @property
    def accao(self):
        return self._accao
