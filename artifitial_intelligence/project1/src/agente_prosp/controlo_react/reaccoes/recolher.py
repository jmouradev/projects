from controlo_react.reaccoes.aproximar_alvo.aproximar_alvo import AproximarAlvo
from controlo_react.reaccoes.contornar import Contornar
from controlo_react.reaccoes.evitar_obst import EvitarObst
from controlo_react.reaccoes.explorar import Explorar
from ecr.hierarquia import Hierarquia


class Recolher(Hierarquia):
    
    def __init__(self):
        super(Recolher, self).__init__([AproximarAlvo(), EvitarObst(), Contornar(), Explorar()])