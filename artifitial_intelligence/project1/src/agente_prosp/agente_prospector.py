# coding=utf-8
import psa
from psa.agente import Agente


class AgenteProspector(Agente):
    def __init__(self, controlo):
        self._controlo = controlo

    def executar(self):
        percepcao = self._percepcionar()
        accao = self._processar(percepcao)
        self._actuar(accao)

    def _percepcionar(self):
        return self.sensor_multiplo.detectar()

    def _processar(self, percepcao):
        return self._controlo.processar(percepcao)

    def _actuar(self, accao):
        if accao is not None:
            self.actuador.actuar(accao)
