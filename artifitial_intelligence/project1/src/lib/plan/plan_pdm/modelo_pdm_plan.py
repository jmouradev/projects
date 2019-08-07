# coding=utf-8
from pdm.modelo_pdm import ModeloPDM


class ModeloPDMPlan(ModeloPDM):

    def __init__(self, modelo_plan, objectivos):
        self._objectivos = objectivos
        self._S = []
        self._A = []
        self._R = {}
        self._T = {}
        self._rmax = 100
        self._iniciar_modelo(modelo_plan)

    def _iniciar_modelo(self, modelo_plan):
        self._S = modelo_plan.estados()
        self._A = modelo_plan.operadores()

        for s in self._S:
            for a in self._A:
                self._gerar_modelo(s, a)

    def _gerar_modelo(self, s, a):

        sn = a.aplicar(s)
        if sn is None:
            self._T[(s, a)] = []
        else:
            self._T[(s, a)] = [(1, sn)]
            self._R[(s, a, sn)] = self._gerar_recompensa(s, a, sn)

    def _gerar_recompensa(self, s, a, sn):
        r = -a.custo(s, sn)
        if sn in self._objectivos:
            r += self._rmax
        return r

    def S(self):
        '''Conjunto de Estados de um problema S()'''
        return self._S

    def A(self, a):
        '''Conjunto de acções possíveis num dado problema A(s)'''
        return self._A

    def T(self, s, a):
        '''Função de transição'''
        return self._T[(s, a)]

    def R(self, s, a, sn):
        return self._R[(s, a, sn)]
