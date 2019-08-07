# coding=utf-8
from comportamento import Comportamento


class ComportComp(Comportamento):

    def __init__(self, comportamentos):
        self._comportamentos = comportamentos

    def activar(self, percepcao):
        '''Esta função activará um comportamento,
        recebendo como parâmetro uma percepção e
        produzindo (retornando) uma resposta.'''

        # lista de respostas
        respostas = []

        print self._comportamentos

        for c in self._comportamentos:
            resposta = c.activar(percepcao)
            if resposta is not None:
                respostas.append(resposta)

        # verificar se a lista contém elementos não vazios
        if respostas:
            return self.seleccionar_resposta(respostas)

    def seleccionar_resposta(self, respostas):
        abstract
