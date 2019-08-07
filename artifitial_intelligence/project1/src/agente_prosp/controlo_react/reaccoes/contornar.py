from psa.actuador import ESQ, FRT, DIR
from ecr.reaccao import Reaccao
from ecr.resposta import Resposta
from psa.accao import Mover


class Contornar(Reaccao):

    def _gerar_resposta(self, estimulo):
        accao = Mover(FRT)
        return Resposta(accao)

    def _detectar_estimulo(self, percepcao):
        if ((percepcao[ESQ].contacto and percepcao[ESQ].obstaculo)
            or (percepcao[DIR].contacto and percepcao[DIR].obstaculo)):
                return True
