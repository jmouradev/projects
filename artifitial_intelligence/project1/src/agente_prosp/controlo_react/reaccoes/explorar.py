from random import choice
from ecr.comportamento import Comportamento
from psa.actuador import FRT, DIR, ESQ
from ecr.resposta import Resposta
from psa.accao import Mover

class Explorar(Comportamento):
    
    def activar(self, percepcao):
        # e escolhido um movimento aleatorio (frente, esquerda ou direita)
        # e realizada uma resposta com essa escolha. Todos os movimentos tem a mesma prioridade
        accao = choice([Mover(ESQ),Mover(DIR), Mover(FRT)])
        return Resposta(accao)

