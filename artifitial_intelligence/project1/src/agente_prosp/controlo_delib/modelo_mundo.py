from plan.modelo_plan import ModeloPlan
from psa import util
from psa import dirmov
from operador_mover import OperadorMover


class ModeloMundo(ModeloPlan):
    def __init__(self):
        self._alterado = False
        self._elementos = None
        self._estado = None
        self._estados = []
        self._operadores = [OperadorMover(self, ang) for ang in util.dirmov()]

    @property
    def estado(self):
        return self._estado

    @property
    def alterado(self):
        return self._alterado

    def obter_elem(self, estado):
        return self._elementos.get(estado)

    def actualizar(self, percepcao):
        if self._elementos != percepcao.imagem:
            self._alterado = True
        else:
            self._alterado = False
        self._elementos = percepcao.imagem
        self._estado = percepcao.posicao
        self._estados = percepcao.imagem.keys()

    def operadores(self):
        return self._operadores

    def estados(self):
        return self._estados

    def mostrar(self, vis):
        vis.elementos(self._elementos)
