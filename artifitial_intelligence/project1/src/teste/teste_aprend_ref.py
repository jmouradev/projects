# coding=utf-8
import sys

sys.path.append("../lib")
sys.path.append("../agente_prosp")

import psa

# definição do agente prospector
from agente_prospector import AgenteProspector

# definição do controlo aprendizagem
from controlo_aprend.controlo_aprend_ref.controlo_aprend_ref import ControloAprendRef

# controlo
controlo = ControloAprendRef()
agente_prospector = AgenteProspector(controlo)

# iniciar plataforma
psa.iniciar("amb/amb3.das", alvo_ini=True)
psa.executar(agente_prospector, cfa=(210, 100, 100))
