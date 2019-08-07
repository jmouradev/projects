# coding=utf-8
import sys

sys.path.append("../lib")
sys.path.append("../agente_prosp")

import psa

# definição do agente prospector
from agente_prospector import AgenteProspector

# definição do controlo deliberativo
from controlo_delib.controlo_delib import ControloDelib

# definição do planeador de processos de decisão de Markov
from plan.plan_pdm.plan_pdm import PlanPDM

from psa.agente import Agente

# planeamento
planeador = PlanPDM()

# controlo
controlo = ControloDelib(planeador)
agente_prospector = AgenteProspector(controlo)

# iniciar plataforma
psa.iniciar("amb/amb3.das")
psa.executar(agente_prospector, cfa=(210, 100, 100))
