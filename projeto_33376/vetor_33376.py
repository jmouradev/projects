
from math import sqrt


class Vetor3D:

    def __init__(self, x, y, z):

        self.x = x
        self.y = y
        self.z = z

    def get_x(self):
        """Retorna a coordenada x, do vetor.
        """
        return(self.x)

    def get_y(self):
        """Retorna a coordenada y, do vetor.
        """
        return(self.y)

    def get_z(self):
        """Retorna a coordenada z, do vetor.
        """
        return(self.z)

    def __str__(self):
        """Retorna uma string que representa o vetor 3D.
        """
        return("Vetor3D(" + str(self.x) + ", " + str(self.y) + ", " \
            + str(self.z) + ")")

    def adiciona(self, outro_vetor):
        """Retorna um novo vetor, que resulta da soma do vetor self
        com o vetor outro_vetor.
        """
        return(Vetor3D(self.x + outro_vetor.x,
                       self.y + outro_vetor.y,
                       self.z + outro_vetor.z))

    def __add__(self, outro_vetor):
        """Define o operador +.
        """
        return(self.adiciona(outro_vetor))

    def multiplica_escalar(self, escalar):
        """Retorna um novo vetor que resultado do vetor self
        multiplicado pelo escalar.
        """
        return(Vetor3D(self.x * escalar,
                       self.y * escalar,
                       self.z * escalar))

    def __mul__(self, escalar):
        """Define o operador * como sendo a multiplicação por escalar."""
        return(self.multiplica_escalar(escalar))

    def comprimento(self):
        """Retorna o comprimento do vetor.
        """
        return(sqrt(self.x**2 + self.y**2 + self.z**2))

    # cálculo do versor
    def normaliza(self):
        """Retorna o versor do vetor self (um novo vetor, com a mesma
        direção do vetor self mas com comprimento igual a 1).
        """
        fator = 1.0 / self.comprimento()
        return(self * fator)

    def interno(self, outro_vetor):
        """Retorna o produto interno entre o vetor self e um outro vetor"""
        return(self.x * outro_vetor.x + self.y * outro_vetor.y \
               + self.z * outro_vetor.z)

    def externo(self, outro_vetor):
        """Retorna o produto externo entre o vetor self e um outro vetor"""

        x1 = self.x
        y1 = self.y
        z1 = self.z

        x2 = outro_vetor.x
        y2 = outro_vetor.y
        z2 = outro_vetor.z

        # ex ey ez
        # x1 y1 z1
        # x2 y2 z2

        x = y1 * z2 - z1 * y2
        y = -(x1 * z2 - z1 * x2)
        z = x1 * y2 - y1 * x2

        return(Vetor3D(x, y, z))


if __name__ == "__main__":

    # teste ao construtor
    v1 = Vetor3D(1.0, 2.0, 3.0)

    # teste a get_x, get_y e get_z
    print("coordenada x de v1")
    print(v1.get_x())
    print("coordenada y de v1")
    print(v1.get_y())
    print("coordenada z de v1")
    print(v1.get_z())

    # teste a __str__
    print("vetor v1 = ")
    print(v1)

    # teste a adiciona
    v2 = Vetor3D(4.0, 5.0, 6.0)
    print("vetor v2 = ")
    print(v2)
    v3 = v1.adiciona(v2)
    print("vetor v3 = ")
    print(v3)

    # teste a +
    v4 = v1 + v2
    print("vetor v4 = ")
    print(v4)

    # teste a multiplica_escalar
    escalar = 10.0
    v5 = v1.multiplica_escalar(escalar)
    print("vetor v5 = ")
    print(v5)

    # teste a *
    v6 = v1 * escalar
    print("vetor v6 = ")
    print(v6)

    # a linha seguinte dá erro de execução
    # porque a operação float * Vetor3D não está
    # definida na classe float
    # v7 = escalar * v6

    # teste a comprimento
    v8 = Vetor3D(0.0, 10.0, 0.0)
    print("comprimento de v8 = ")
    print(str(v8.comprimento()))
    print("comprimento de v1 = ")
    print(str(v1.comprimento()))

    # teste a normaliza
    v9 = v1.normaliza()
    print("v9 = versor de v1 =")
    print(str(v9))
    print("norma de v9 =")
    print(v9.comprimento())

    # teste a interno
    v10 = Vetor3D(1.0, 0.0, 0.0)
    v11 = Vetor3D(0.0, 1.0, 0.0)
    print("v10 interno de v11 = ")
    print(str(v10.interno(v11)))

    # teste a externo
    v12 = v1.externo(v2)
    print("v12 = v1 externo de v2 = ")
    print(str(v12))
    print("v12 interno com v1 = ")
    print(str(v12.interno(v1)))
    print("v12 interno com v2 = ")
    print(str(v12.interno(v2)))
