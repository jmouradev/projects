# coding=utf-8
import sys

sys.path.append("../lib")
sys.path.append("../agente_prosp")

import psa

# definição do agente prospector
from agente_prospector import AgenteProspector

# definição do controlo reactivo
from controlo_react.controlo_react import ControloReact
from controlo_react.reaccoes.recolher import Recolher as Comportamento

controlo = ControloReact(Comportamento())
agente_prospector = AgenteProspector(controlo)

# iniciar plataforma
psa.iniciar("amb/amb2.das")
psa.executar(agente_prospector, cfa=(210, 100, 100))
