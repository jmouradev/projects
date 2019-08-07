
from colorsys import hsv_to_rgb


class CorRGB:
    """Classe para representação da cor em RGB.

    As intensidades r, g, b são floats entre 0.0 e 1.0.
    """

    def __init__(self, red, green, blue):
        """Inicializa as intensidades RGB a partir dos argumentos
        correspondentes.

        Limita os valores inicializados à gama entre 0.0 e 1.0.
        """

        self.r = min(1.0, max(0.0, red))
        self.g = min(1.0, max(0.0, green))
        self.b = min(1.0, max(0.0, blue))

    def __str__(self):
        """Retorna uma string que representa o objeto do tipo CorRGB.

        A representação é constituida pelas componentes r, g, b
        multiplicadas por 255.0, arredondadas para números inteiros e
        separadas por um espaço."""

        return(str(int(self.r * 255.0)) + " " + str(int(self.g * 255.0)) + " " \
                   + str(int(self.b * 255.0)))

    def soma(self, outra_cor):
        """Soma duas cores RGB.

        Retorna um novo objeto CorRGB, cujas componentes são dadas
        pela soma das componentes dos objetos self e outra_cor."""

        return(CorRGB(self.r + outra_cor.r,
                      self.g + outra_cor.g,
                      self.b + outra_cor.b))

    def __add__(self, outra_cor):
        """Define o operador +."""

        return(self.soma(outra_cor))

    def set_hsv(self, hue, saturation, value):
        """Permite especificar a cor a partir das componentes h, s e
        v, do modelo de cor HSV."""

        (red, green, blue) = hsv_to_rgb(hue / 360.0, saturation, value)

        self.r = red
        self.g = green
        self.b = blue

    def multiplica(self, outra_cor):
        """Multiplica duas cores RGB.

        Retorna um novo objeto CorRGB, cujas componentes são dadas
        pela multiplicação das componentes correspondentes dos objetos
        self e outra_cor."""

        return(CorRGB(self.r * outra_cor.r, self.g * outra_cor.g,
                      self.b * outra_cor.b))

    def multiplica_escalar(self, escalar):
        """Multiplica uma cor RGB por um escalar (à direita).

        Retorna um novo objeto CorRGB, cujas componentes são dadas
        pela multiplicação das componentes do objeto self pelo
        escalar."""

        return(CorRGB(self.r * escalar, self.g * escalar, self.b * escalar))

    def __mul__(self, valor):
        """Define o operador *.

        Se o argumento for um escalar (float) retorna o resultado do
        método multiplica_escalar. Caso contrário, retorna o resultado
        do método multiplica."""

        if isinstance(valor, float):
            return(self.multiplica_escalar(valor))
        else:
            return(self.multiplica(valor))


# testes
if __name__ == "__main__":

    # testes ao construtor
    c1 = CorRGB(1.0, 0.0, 0.0)  # vermelho
    c2 = CorRGB(0.0, 1.0, 0.0)  # verde
    c3 = CorRGB(0.0, 0.0, 1.0)  # azul
    c4 = CorRGB(1.0, 1.0, 1.0)  # branco
    c5 = CorRGB(0.0, 0.0, 0.0)  # preto

    # testes ao método soma
    c1 = CorRGB(1.0, 0.0, 0.0)  # vermelho
    c2 = CorRGB(0.0, 1.0, 0.0)  # verde
    c3 = CorRGB(1.0, 1.0, 1.0)  # branco
    c4 = c1.soma(c2)
    c5 = c1.soma(c3)
    # print(c4)
    # print(c5)

    # testes ao método multiplica
    c1 = CorRGB(1.0, 0.0, 0.0)
    c2 = CorRGB(1.0, 1.0, 1.0)
    c3 = CorRGB(0.0, 0.0, 0.0)
    c4 = c1.multiplica(c2)
    c5 = c1.multiplica(c3)
    # print(c4)
    # print(c5)

    # testes ao operador +
    c1 = CorRGB(1.0, 0.0, 0.0)  # vermelho
    c2 = CorRGB(0.0, 1.0, 0.0)  # verde
    c3 = CorRGB(1.0, 1.0, 1.0)  # branco
    c4 = c1 + c2
    c5 = c1 + c3
    # print(c4)
    # print(c5)

    # testes ao método multiplica_escalar
    c1 = CorRGB(1.0, 1.0, 1.0)
    c2 = CorRGB(0.0, 0.5, 1.0)
    e1 = 0.5
    c3 = c1 * c2
    c4 = c1 * e1
    # print(c3)
    # print(c4)

    # testes ao método __str__
    c1 = CorRGB(1.0, 0.0, 0.0)
    # print(c1)
    # print("c1 = " + str(c1))
    # mais testes ao construtor
    c2 = CorRGB(-0.1, 0.1, 1.1)
    # print(c2)

    # testes ao método multiplica_escalar
    c1 = CorRGB(1.0, 1.0, 1.0)
    e1 = 0.0
    e2 = 0.5
    e3 = 1.0
    e4 = 2.0
    c2 = c1.multiplica_escalar(e1)
    c3 = c1.multiplica_escalar(e2)
    c4 = c1.multiplica_escalar(e3)
    c5 = c1.multiplica_escalar(e4)
    print(c2)
    print(c3)
    print(c4)
    print(c5)

    # testes ao médoto set_hsv
    c1 = CorRGB(0.0, 0.0, 0.0)
    c1.set_hsv(360.0, 1.0, 1.0)
    # print(c1)
