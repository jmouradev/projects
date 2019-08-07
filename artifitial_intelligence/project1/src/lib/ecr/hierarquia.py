
from comport_comp import ComportComp


class Hierarquia(ComportComp):

    def __init__(self, comportamentos):
        self._comportamentos = comportamentos

    def seleccionar_resposta(self, respostas):
        if respostas is not None:
            return respostas[0]
