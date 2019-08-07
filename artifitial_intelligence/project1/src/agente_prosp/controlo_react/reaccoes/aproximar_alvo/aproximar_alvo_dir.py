from ecr.reaccao import Reaccao
from ecr.resposta import Resposta


class AproximarAlvoDir(Reaccao):
    def __init__(self, direccao):
        self._direccao = direccao

    def _detectar_estimulo(self, percepcao):
        if percepcao[self._direccao].alvo:
            return percepcao[self._direccao].distancia

    def _gerar_resposta(self, distancia):
        accao = (1, self._direccao)
        prioridade = 1.0 / (1 + distancia)

        return Resposta(accao, prioridade)
