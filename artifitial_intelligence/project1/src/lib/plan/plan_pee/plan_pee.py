from plan.planeador import Planeador
from plan.plan_pee.problema_plan import ProblemaPlan
import psa


class PlanPEE(Planeador):
    
    def __init__(self, mec_pee):
        self._plano = None
        self._mec_pee = mec_pee
        
    def planear(self, modelo_plan, estado_inicial, objectivos):
        estado_final = objectivos[0]
        problema = ProblemaPlan(estado_inicial, estado_final, modelo_plan.operadores())
        solucao = self._mec_pee.resolver(problema)
        if solucao:
            self._plano = [passo_solucao.operador for passo_solucao in solucao[1:]]
        
        
    def obter_accao(self, estado):
        #return self._plano.pop(0) if self.plano else None
        if self._plano:
            return self._plano.pop(0)
    
    def plano_pendente(self):
        return self._plano
    
    def terminar_plano(self):
        self._plan = None
        
    def mostrar(self, vis, estado):
        vis.campo(self._mec_pee.obter_explorados())
        vis.plano(estado, self._plano)
        vis.marcar([estado], linha=2)
        