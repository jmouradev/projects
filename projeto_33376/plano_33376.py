
from ponto_33376 import Ponto3D
from vetor_33376 import Vetor3D
from matriz_33376 import Matriz
from reta_33376 import Reta


TOLERANCIA_ZERO = 10.0**(-10)


class ErroPontosColineares(Exception):
    """Exceção lançada quando se tenta definir um plano com
    pontos colineares ou coincidentes."""
    pass


class Plano:

    def __init__(self, ponto1, ponto2, ponto3):
        """Cria um plano definido por três pontos."""

        self.ponto1 = ponto1
        self.ponto2 = ponto2
        self.ponto3 = ponto3

        v12 = ponto2 - ponto1
        v13 = ponto3 - ponto1

        ext = v12.externo(v13)

        if ext.comprimento() < TOLERANCIA_ZERO:

            raise(ErroPontosColineares)

        self.normal = ext.normaliza()

    def __str__(self):
        """Retorna uma string com os 3 pontos que formam o plano e também
        o vetor normal, perpendicular a este plano.
        """

        return("Plano(" + \
               str(self.ponto1) + ", " + \
               str(self.ponto2) + ", " + \
               str(self.ponto3) + ", " + \
               "n = " + \
               str(self.normal) + \
               ")\n")

    # método interceta_triangulo

    def interceta_triangulo(self, raio):
        """Este método determina se a reta raio interceta o plano dentro do
        triângulo definido pelos atributos ponto1, ponto2 e ponto3, com
        parâmetro t > TOLERANCIA_ZERO. Caso intercete, calcula o ponto de
        interceção e o parâmetro da reta correspondente ao ponto de interceção.
        Retorna uma lista com 3 elementos.
        """

        a_x = self.ponto1.x
        a_y = self.ponto1.y
        a_z = self.ponto1.z

        b_x = self.ponto2.x
        b_y = self.ponto2.y
        b_z = self.ponto2.z

        c_x = self.ponto3.x
        c_y = self.ponto3.y
        c_z = self.ponto3.z

        matriz_S = Matriz(3, 3)

        matriz_S.set_linha(1, [a_x - b_x, a_x - c_x, raio.vetor_diretor.x])
        matriz_S.set_linha(2, [a_y - b_y, a_y - c_y, raio.vetor_diretor.y])
        matriz_S.set_linha(3, [a_z - b_z, a_z - c_z, raio.vetor_diretor.z])

        det_S = matriz_S.det_3x3()

        if abs(det_S) < TOLERANCIA_ZERO:
            """Se o determinante da matriz S for zero, o sistema é impossível
            ou possivel e indeterminado, com infinitas soluções, pelo que o
            método retorna logo a lista [False, None, None].
            """
            return[False, None, None]

        lista_S0 = [a_x - raio.origem.x, a_y - raio.origem.y, a_z - raio.origem.z]

        matriz_S1 = matriz_S.copia()
        matriz_S2 = matriz_S.copia()
        matriz_S3 = matriz_S.copia()

        matriz_S1.set_coluna(1, lista_S0)
        matriz_S2.set_coluna(2, lista_S0)
        matriz_S3.set_coluna(3, lista_S0)

        beta = matriz_S1.det_3x3() / det_S
        lamb_da = matriz_S2.det_3x3() / det_S
        t = matriz_S3.det_3x3() / det_S
        alfa = 1 - beta - lamb_da

        ponto_intercecao = raio.origem + (raio.vetor_diretor * t)

        if t < TOLERANCIA_ZERO \
           or beta < 0.0 \
           or beta > 1.0 \
           or lamb_da < 0.0 \
           or lamb_da > 1.0 \
           or alfa < 0.0 \
           or alfa > 1.0:

            return[False, None, None]
        else:
            return[True, ponto_intercecao, t]


# testes
if __name__ == "__main__":

    # teste ao construtor
    a = Ponto3D(0.0, 0.0, 0.0)
    b = Ponto3D(2.0, 0.0, 0.0)
    c = Ponto3D(0.0, 2.0, 0.0)
    plano1 = Plano(a, b, c)
    print("Até aqui não foram lançadas exceções.")
    # teste a TOLERANCIA_ZERO
    print("TOLERANCIA_ZERO = " + str(TOLERANCIA_ZERO))
    # teste à exceção ErroPontosColineares
    try:
        plano2 = Plano(a, b, b)
    except ErroPontosColineares:
        print("Ao tentar definir-se o plano plano2 = Plano(a, b, b)")
        print("foi lançada a exceção ErroPontosColineares.")
        print("A execução foi interrompida. plano2 não ficou definido.")

    # teste a __str__
    # a normal tem que apontar no sentido do eixo dos z’s
    # e tem que ter comprimento 1
    print(plano1)

    # testes a interceta_triangulo
    p1 = Ponto3D(1.0, 1.0, 10.0)
    p2 = Ponto3D(1.0, 1.0, 5.0)
    r1 = Reta(p1, p2)
    trio = plano1.interceta_triangulo(r1)
    if trio[0] is True:
        print("r1 interceta plano1.")
        print("interceção = " + str(trio[1]))
        print("parâmetro t = " + str(trio[2]))
        print("interceção calculada com a equação da reta e t.")
        print("(tem que dar o mesmo que trio[1])")
        t = trio[2]
        pi = r1.origem + (r1.vetor_diretor * t)
        print(pi)
    else:
        print("r1 NÃO interceta plano1.")
    p3 = Ponto3D(2.0, 2.0, 10.0)
    r2 = Reta(p1, p3)
    trio = plano1.interceta_triangulo(r2)
    if trio[0] is True:
        print("r2 interceta plano1.")
        print("interceção = " + str(trio[1]))
        print("parâmetro t = " + str(trio[2]))
    else:
        print("r2 NÃO interceta plano1.")
