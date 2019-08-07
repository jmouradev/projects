# coding=utf-8
import psa
from plan.planeador import Planeador
from pdm.pdm import PDM
from plan.plan_pdm.modelo_pdm_plan import ModeloPDMPlan


class PlanPDM(Planeador):

    def __init__(self):
        self._gama = 0.95
        self._delta_max = 1
        self._pdm = PDM(self._gama, self._delta_max)
        self.U = []
        self.P = {}

    def planear(self, modelo_plan, estado, objectivos):
        modelo_pdm_plan = ModeloPDMPlan(modelo_plan, objectivos)
        self.U, self.P = self._pdm.resolver(modelo_pdm_plan)

    def obter_accao(self, s):
        if self.P:
            return self.P.get(s)

    def plano_pendente(self):
        return self.P

    def terminar_plano(self):
        self.P = {}

    def mostrar(self, vis, estado):
        psa.vis(1).campo(self.U)
        psa.vis(1).politica(self.P)
        psa.vis(1).marcar([estado], linha=1)
