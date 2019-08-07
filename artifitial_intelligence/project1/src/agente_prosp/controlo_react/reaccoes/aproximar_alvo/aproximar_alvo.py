from psa.actuador import DIR, ESQ, FRT
from controlo_react.reaccoes.aproximar_alvo.aproximar_alvo_dir import AproximarAlvoDir
from ecr.prioridade import Prioridade

class AproximarAlvo(Prioridade):

    def __init__(self):
        super(AproximarAlvo, self).__init__([AproximarAlvoDir(DIR), AproximarAlvoDir(FRT), AproximarAlvoDir(ESQ)])
