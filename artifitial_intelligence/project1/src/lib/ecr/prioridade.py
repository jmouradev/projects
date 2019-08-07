
from comport_comp import ComportComp


class Prioridade(ComportComp):

    def __init__(self, comportamentos):
        self._comportamentos = comportamentos

    def seleccionar_resposta(self, respostas):
        return max(respostas, key=lambda resp: resp.prioridade)
