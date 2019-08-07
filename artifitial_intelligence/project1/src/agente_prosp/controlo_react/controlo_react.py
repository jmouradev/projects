
from controlo import Controlo
from ecr.resposta import Resposta
import psa

class ControloReact(Controlo):
    
    def __init__(self, comportamento):
        self._comportamento = comportamento
        
    def processar(self, percepcao):
        resposta = self._comportamento.activar(percepcao)
        if resposta is not None:
            return resposta.accao
    