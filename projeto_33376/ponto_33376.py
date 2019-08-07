"""Módulo de suporte a pontos.
Este módulo contém a definição da classe Ponto3D. A classe Ponto3D
representa um ponto num espaço a 3 dimensões. Os pontos são usados
quer para definir pontos no espaço quer para definir vetores como
diferenças entre pontos. É suportada a tranlação de pontos com
vetores.
"""

from vetor_33376 import Vetor3D


class Ponto3D:
    """Classe para representação de pontos num espaço a 3 dimensões.

    As coordenadas do ponto, são armazenadas nos atributos x, y e
    z. Assume-se que os valores das coordenadas são floats.
    """

    def __init__(self, x, y, z):
        """Cria um novo ponto e inicializa as suas coordenas.
        """

        self.x = x
        self.y = y
        self.z = z

    def get_x(self):
        """Retorna a coordenada x, do ponto.
        """
        return(self.x)

    def get_y(self):
        """Retorna a coordenada y, do ponto.
        """
        return(self.y)

    def get_z(self):
        """Retorna a coordenada z, do ponto.
        """
        return(self.z)

    def __str__(self):
        """Retorna uma string que representa o ponto 3D.
        """
        return("Ponto3D(" + str(self.x) + ", "\
               + str(self.y) + ", " \
               + str(self.z) + ")")

    def adiciona_vetor(self, um_vetor):
        """Retorna um vetor que resulta da adição do vetor self com um outro
        vetor.
        """
        return(Ponto3D(self.x + um_vetor.get_x(),
                       self.y + um_vetor.get_y(),
                       self.z + um_vetor.get_z()))

    def __add__(self, um_vetor):
        """Define o operador +.
        """

        return(self.adiciona_vetor(um_vetor))

    def subtrai_ponto(self, ponto_inicial):
        """Retorna um vetor de ponto_inicial a self, isto é, que
        resulta da diferença self - ponto_inicial.
        """
        # B - A = vAB
        # subtrai_ponto retorna o vetor de ponto_inicial
        # a self

        return(Vetor3D(self.x - ponto_inicial.x,
                       self.y - ponto_inicial.y,
                       self.z - ponto_inicial.z))

    def __sub__(self, ponto_inicial):
        """Define o operador -.
        """

        return(self.subtrai_ponto(ponto_inicial))


# testes
if __name__ == "__main__":

    # teste ao construtor
    p1 = Ponto3D(10, 20, 30)

    # teste a get_x, get_y e get_z
    print("coordenada x de p1")
    print(p1.get_x())
    print("coordenada y de p1")
    print(p1.get_y())
    print("coordenada z de p1")
    print(p1.get_z())

    # teste a __str__
    print("p1 = ")
    print(p1)

    # teste a adiciona_vetor
    v1 = Vetor3D(10.0, 20.0, 30.0)
    p2 = p1.adiciona_vetor(v1)
    print("v1 = ")
    print(v1)
    print("p2 = ")
    print(p2)

    # teste a +
    p3 = p1 + v1
    print("p3 = p1 + v1 = ")
    print(p3)

    # teste a subtrai_ponto
    v2 = p2.subtrai_ponto(p1)
    print("v2 = (tem de ser igual a v1)")
    print(v2)
    print("v1 = ")
    print(v1)

    # teste a -
    v3 = p2 - p1
    print("v3 = (tem de ser igual a v1)")
    print(v3)
