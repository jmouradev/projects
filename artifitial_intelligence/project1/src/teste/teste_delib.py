# coding=utf-8
import sys

sys.path.append("../lib")
sys.path.append("../agente_prosp")
import psa

# definição do agente prospector
from agente_prospector import AgenteProspector

from controlo_delib.controlo_delib import ControloDelib

# definição do mecanismo de procura
from pee.prof.procura_prof import ProcuraProf
from pee.larg.procura_larg import ProcuraLarg
from pee.melhorprim.procura_custo_unif import ProcuraCustoUnif
from pee.melhorprim.procura_aa import ProcuraAA
from pee.melhorprim.procura_sofrega import ProcuraSofrega

# definição do plano para encontrar a solução
from plan.plan_pee.plan_pee import PlanPEE

# mecanismo de procura
mec_procura = ProcuraProf()
# mec_procura = ProcuraLarg()
# mec_procura = ProcuraCustoUnif()
# mec_procura = ProcuraAA()
# mec_procura = ProcuraSofrega()

# planeamento
planeador = PlanPEE(mec_procura)

# deliberação
controlo_delib = ControloDelib(planeador)

# agente prospector
agente_prospector = AgenteProspector(controlo_delib)

# iniciar plataforma
psa.iniciar("amb/amb6.das", detalhe=1)
psa.executar(agente_prospector, cfa=(210, 100, 100))
