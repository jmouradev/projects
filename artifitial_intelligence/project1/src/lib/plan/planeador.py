# coding=utf-8


class Planeador(object):

    def planear(self, modelo_plan, estado_inicial, objectivos):
        abstract

    def obter_accao(self, estado):
        abstract

    def plano_pendente(self):
        abstract

    def terminar_plano(self):
        abstract
