

from cor_rgb_33376 import CorRGB

from ponto_33376 import Ponto3D


class Luz:

    def __init__(self, posicao, intensidade_ambiente,
                 intensidade_difusa, intensidade_especular):

        # i_ significa intensidade_
        # a posição é um objeto Ponto3D
        # as intensidades são objetos CorRGB

        self.posicao = posicao
        self.intensidade_ambiente = intensidade_ambiente
        self.intensidade_difusa = intensidade_difusa
        self.intensidade_especular = intensidade_especular

    def __str__(self):

        return("Luz(" + str(self.posicao) + ", " + str(self.intensidade_ambiente) + ", "
               + str(self.intensidade_difusa) + ", "
               + str(self.intensidade_especular) + ")")


if __name__ == "__main__":

    # teste ao construtor
    posicao = Ponto3D(1.0, 0.0, 3.0)
    intensidade_ambiente = CorRGB(0.1, 0.2, 0.3)
    intensidade_difusa = CorRGB(0.4, 0.5, 0.6)
    intensidade_especular = CorRGB(0.7, 0.8, 0.9)
    luz = Luz(posicao, intensidade_ambiente, intensidade_difusa, intensidade_especular)

    # teste a __str__
    print(luz)
