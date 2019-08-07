# coding=utf-8
import psa
from modelo_mundo import ModeloMundo


class ControloDelib(object):
    def __init__(self, planeador):
        self._planeador = planeador
        self._objectivos = []
        self._modelo_mundo = ModeloMundo()

    def _reconsiderar(self):
        return (
            not self._objectivos
            or not self._planeador.plano_pendente()
            or self._modelo_mundo.alterado
        )

    def _deliberar(self):
        self._objectivos = [
            estado
            for estado in self._modelo_mundo.estados()
            if self._modelo_mundo.obter_elem(estado) == "alvo"
        ]

    def _planear(self):
        if self._objectivos:
            self._planeador.planear(
                self._modelo_mundo, self._modelo_mundo.estado, self._objectivos
            )
        else:
            self._planeador.terminar_plano()

    def _executar(self):
        operador = self._planeador.obter_accao(self._modelo_mundo.estado)
        if operador is not None:
            return operador.accao

    def processar(self, percepcao):
        self._assimilar(percepcao)
        if self._reconsiderar():
            self._deliberar()
            self._planear()

        self.mostrar()
        return self._executar()

    def _assimilar(self, per):
        self._modelo_mundo.actualizar(per)

    def mostrar(self):
        vis = psa.vis(1)
        vis.limpar()
        self._modelo_mundo.mostrar(vis)
        self._planeador.mostrar(vis, self._modelo_mundo.estado)
