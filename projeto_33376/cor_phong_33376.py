"""Módulo de suporte ao modelo de iluminação de Phong.

Este módulo contém a definição da classe CorPhong que permite obter a
cor de de um ponto de um espaço 3D usando o modelo de iluminação de
Phong.
"""

from cor_rgb_33376 import CorRGB
from ponto_33376 import Ponto3D
from imagem_33376 import Imagem
from vetor_33376 import Vetor3D
from luz_33376 import Luz


class CorPhong:
    """Classe para representação da cor Phong.

    Nesta classe o prefixo k_ é usado para designar "coeficiente de reflexão"
    """

    def __init__(self, k_ambiente, k_difusa, k_especular, brilho):
        """Cria uma cor Phong inicializando os coeficientes de
        reflexão ambiente, difusa e especular e também o coeficiente
        de concentração do brilho.
        """

        # k_ significa coeficiente_de_reflexao
        # os coeficientes de reflexão são objetos
        # CorRGB

        self.k_ambiente = k_ambiente
        self.k_difusa = k_difusa
        self.k_especular = k_especular
        self.brilho = brilho

    def __str__(self):
        """Retorna uma string que representa a cor Phong.
        """

        return (
            "CorPhong("
            + str(self.k_ambiente)
            + ", "
            + str(self.k_difusa)
            + ", "
            + str(self.k_especular)
            + ", "
            + str(self.brilho)
            + ")"
        )

    def get_cor_rgb(self, luz, direcao_luz, normal, direcao_olho, sombra):
        """Retorna a cor RGB num ponto do espaço 3D, criada por uma
        fonte de iluminação, a partir de:
        - a fonte de iluminação (luz);
        - o vetor que aponta para a luz;
        - o vetor normal à superficie no ponto;
        - o vector que aponta na direção do olho;
        - o booleano sombra que indica se o ponto está iluminado
        directamente (sombra = False) ou se está em sombra (sombra = True).
        """

        # componente ambiente
        cor_ambiente = self.k_ambiente * luz.intensidade_ambiente

        if sombra is True:
            return cor_ambiente

        l_interno_n = direcao_luz.interno(normal)

        if l_interno_n < 0.0:
            return cor_ambiente

        # componente difusa
        cor_difusa = self.k_difusa * luz.intensidade_difusa * l_interno_n

        # componente especular (brilho)
        # r é a direção de reflexão
        # r = -l + 2.0 * (n.l) xn

        r = direcao_luz * (-1.0) + normal * (2.0 * l_interno_n)

        cor_especular = (
            self.k_especular
            * luz.intensidade_especular
            * ((direcao_olho.interno(r)) ** self.brilho)
        )

        resultado = cor_ambiente + cor_difusa + cor_especular

        return resultado


# testes
if __name__ == "__main__":

    # teste ao construtor
    material_k_ambiente = CorRGB(0.0, 0.0, 0.1)
    material_k_difusa = CorRGB(0.0, 0.0, 0.9)
    material_k_especular = CorRGB(1.0, 1.0, 1.0)
    material_brilho = 100.0
    material_cor = CorPhong(
        material_k_ambiente, material_k_difusa, material_k_especular, material_brilho
    )

    # teste a __str__
    print(material_cor)

    # teste a get_cor_rgb
    luz_posicao = Ponto3D(1.0, 0.0, 1.0)
    luz_intensidade_ambiente = CorRGB(1.0, 1.0, 1.0)
    luz_intensidade_difusa = CorRGB(1.0, 1.0, 1.0)
    luz_intensidade_especular = CorRGB(1.0, 1.0, 1.0)
    luz = Luz(
        luz_posicao,
        luz_intensidade_ambiente,
        luz_intensidade_difusa,
        luz_intensidade_especular,
    )
    # olho
    olho = Ponto3D(-1.0, 0.0, 1.0)

    # normal
    n_pontos = 100
    incremento = 0.02  # 2.0/100.0
    imagem = Imagem(100, 100)
    normal = Vetor3D(0.0, 0.0, 1.0)
    sombra = False

    #    print("a calcular imagem ...")
    #    for m in range(100):
    #        for n in range(100):
    #            ponto = Ponto3D(-1.0 + n * incremento,
    #                        1.0 - m * incremento, 0)
    #            direcao_luz = (luz.posicao - ponto).normaliza()
    #            direcao_olho = (olho - ponto).normaliza()
    #
    #            cor = material_cor.get_cor_rgb(luz, direcao_luz, normal,
    #                                           direcao_olho, sombra)

    #            imagem.set_cor(m+1, n+1, cor)

    #    print("a calcular imagem ... Fim!")

    #    imagem.guardar_como_ppm("phong.ppm")

    # teste adicional - parâmetros
    h = 232.0
    n_pontos = 94
    # teste adicional - parâmetros
    luz_posicao = Ponto3D(1.0, 0.0, 1.0)
    luz_i_ambiente = CorRGB(1.0, 1.0, 1.0)
    luz_i_difusa = CorRGB(1.0, 1.0, 1.0)
    luz_i_especular = CorRGB(1.0, 1.0, 1.0)
    luz = Luz(luz_posicao, luz_i_ambiente, luz_i_difusa, luz_i_especular)
    olho = Ponto3D(-1.0, 0.0, 1.0)
    k_ambiente = CorRGB(0.0, 0.0, 0.0)
    k_difusa = CorRGB(0.0, 0.0, 0.0)
    k_especular = CorRGB(0.9, 0.9, 0.9)
    brilho = 100.0
    k_ambiente.set_hsv(h, 1.0, 0.1)
    k_difusa.set_hsv(h, 1.0, 0.8)
    cor_phong = CorPhong(k_ambiente, k_difusa, k_especular, brilho)
    imagem = Imagem(n_pontos, n_pontos)
    incremento = 2.0 / n_pontos
    normal = Vetor3D(0.0, 0.0, 1.0)
    sombra = False

    print("a calcular imagem teste adicional...")
    for m in range(n_pontos):  # índice de linhas
        for n in range(n_pontos):  # índice de colunas
            ponto = Ponto3D(-1.0 + n * incremento, 1.0 - m * incremento, 0)
            direcao_luz = (luz.posicao - ponto).normaliza()
            direcao_olho = (olho - ponto).normaliza()
            cor = cor_phong.get_cor_rgb(luz, direcao_luz, normal, direcao_olho, sombra)
            imagem.set_cor(m + 1, n + 1, cor)
    print("a calcular imagem teste adicional... Fim!")

    imagem.guardar_como_ppm("cor_phong_adicional.ppm")

    # teste a cor RGB - parâmetros linha e coluna
    linha = 73
    coluna = 46

    print(
        "\nA cor RGB obtida, na linha "
        + str(linha)
        + ", coluna "
        + str(coluna)
        + ", é: "
    )
    print(imagem.get_cor(linha, coluna))
