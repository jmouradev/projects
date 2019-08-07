"""Módulo de suporte a retas.
Este módulo contém a definição da classe Reta e da classe
ErroPontosCoincidentes. A classe reta permite definir uma reta que
passa por dois pontos. A classe ErroPontosCoincidentes é a exceção que
é lançada se se tentar definir uma reta com dois pontos coincidentes.
"""

from ponto_33376 import Ponto3D
from vetor_33376 import Vetor3D

TOLERANCIA_ZERO = 10.0**(-10)


class ErroPontosCoincidentes(Exception):
    """Exceção lançada quando se tenta definir uma reta com dois
    pontos coincidentes.
    """
    pass


class Reta:
    """Classe que representa uma reta."""

    def __init__(self, origem, destino):
        """Cria uma reta que passa por dois pontos."""

        self.origem = origem
        self.destino = destino
        direcao = destino - origem

        if direcao.comprimento() < TOLERANCIA_ZERO:
            raise(ErroPontosCoincidentes)

        self.vetor_diretor = direcao.normaliza()

    def __str__(self):
        """Retorna uma string que representa a reta."""

        return("Reta(" + str(self.origem) + ", " + str(self.destino) + ", " \
                   + str(self.vetor_diretor) + ")")


# testes

if __name__ == "__main__":

    # teste ao construtor
    p1 = Ponto3D(0.0, 0.0, 0.0)
    p2 = Ponto3D(1.0, 2.0, 3.0)
    r1 = Reta(p1, p2)
    print("Até aqui não foram lançadas exceções.")
    # teste à exceção ErroPontosCoincidentes
    try:
        r2 = Reta(p2, p2)
    except ErroPontosCoincidentes:
        print("Ao tentar definir-se a reta r2 = Reta(p2, p2)")
        print("foi lançada a exceção ErroPontosCoincidentes.")
        print("A execução foi interrompida. r2 não ficou definida.")

    # teste a __str__
    print(r1)
