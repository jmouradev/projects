from psa.actuador import ESQ, FRT
from ecr.reaccao import Reaccao
from ecr.resposta import Resposta
from psa.accao import Rodar


class EvitarObst(Reaccao):
    def _detectar_estimulo(self, percepcao):
        return percepcao[FRT].obstaculo and percepcao[FRT].contacto

    def _gerar_resposta(self, estimulo):
        accao = (Rodar(ESQ))
        return Resposta(accao)
