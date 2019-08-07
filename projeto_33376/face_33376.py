"""Módulo de suporte a faces 3D.

Este módulo contém a definição da classe FaceTriangular que permite
definir faces triangulares de cenas 3D.
"""

from plano_33376 import Plano
from plano_33376 import ErroPontosColineares
from ponto_33376 import Ponto3D
from cor_rgb_33376 import CorRGB
from cor_phong_33376 import CorPhong


class FaceTriangular(Plano):
    """Classe que representa uma face triangular. Uma face triangular
    é definida por 3 pontos e por uam cor Phong."""

    def __init__(self, ponto1, ponto2, ponto3, cor_phong):
        """Cria uma face triangular definida por 3 pontos e uma cor."""

        super().__init__(ponto1, ponto2, ponto3)

        self.cor_phong = cor_phong

    def __str__(self):
        """Retorna uma string que representa a face triangular."""

        return("FaceTriangular(" + super().__str__() + ", " + str(self.cor_phong) + ")")

    def get_cor_phong(self):
        """Retorna a cor Phong da face triangular."""

        return self.cor_phong


# testes
if __name__ == "__main__":

    # teste ao construtor
    a = Ponto3D(0.0, 0.0, 0.0)
    b = Ponto3D(1.0, 0.0, 0.0)
    c = Ponto3D(0.0, 1.0, 0.0)
    k_ambiente = CorRGB(0.0, 0.0, 0.1)
    k_difusa = CorRGB(0.0, 0.0, 0.75)
    k_especular = CorRGB(1.0, 1.0, 1.0)
    brilho = 100.0
    cor = CorPhong(k_ambiente, k_difusa, k_especular, brilho)
    face1 = FaceTriangular(a, b, c, cor)
    print("Até aqui não foram lançadas exceções.")
    # teste à exceção ErroPontosColineares
    try:
        face2 = FaceTriangular(a, a, c, cor)
    except ErroPontosColineares:
        print("Ao tentar definir-se a face face2 = FaceTriangular(a, a, c, cor)")
        print("Foi lançada a exceção ErroPontosColineares.")
        print("É o comportamento herdado da classe Plano.")

    # teste a __str__
    print(face1)

    # teste a get_cor_phong
    print(face1.get_cor_phong())
