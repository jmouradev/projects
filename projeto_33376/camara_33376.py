"""Módulo de suporte a câmaras 3D.
Este módulo contém a definição da classe Camara que representa uma
câmara 3D, numa cena 3D.
"""

from ponto_33376 import Ponto3D
from vetor_33376 import Vetor3D
from matriz_33376 import Matriz


class Camara:
    """Classe para representação de uma cãmara 3D.
    """

    def __init__(self, posicao, olhar_para, vertical,
                 distancia_olho_plano_projecao, largura_retangulo_projecao,
                 altura_retangulo_projecao, resolucao_horizontal,
                 resolucao_vertical):
        """Cria um objeto do tipo Camara.
        """

        self.posicao = posicao
        self.olhar_para = olhar_para
        self.vertical = vertical.normaliza()
        self.distancia_olho_plano_projecao = distancia_olho_plano_projecao
        self.largura_retangulo_projecao = largura_retangulo_projecao
        self.altura_retangulo_projecao = altura_retangulo_projecao
        self.resolucao_horizontal = resolucao_horizontal
        self.resolucao_vertical = resolucao_vertical

        eixo_z = (olhar_para - posicao).normaliza()
        self.eixo_z = eixo_z

        eixo_y = self.vertical
        eixo_y = (vertical + eixo_z * (-1.0 * vertical.interno(eixo_z)))
        self.eixo_y = eixo_y.normaliza()

        eixo_x = eixo_z.externo(eixo_y)
        self.eixo_x = eixo_x

        incremento_horizontal = largura_retangulo_projecao / resolucao_horizontal
        incremento_vertical = altura_retangulo_projecao / resolucao_vertical

        canto_superior_esquerdo_x = -largura_retangulo_projecao / 2.0 \
            + incremento_horizontal / 2.0
        canto_superior_esquerdo_y = altura_retangulo_projecao / 2.0 \
            - incremento_vertical / 2.0
        canto_superior_esquerdo_z = distancia_olho_plano_projecao

        self.incremento_horizontal = incremento_horizontal
        self.incremento_vertical = incremento_vertical

        self.canto_superior_esquerdo_x = canto_superior_esquerdo_x
        self.canto_superior_esquerdo_y = canto_superior_esquerdo_y
        self.canto_superior_esquerdo_z = canto_superior_esquerdo_z

        matriz = Matriz(4, 4)

        matriz.set_entrada(1, 1, eixo_x.get_x())
        matriz.set_entrada(2, 1, eixo_x.get_y())
        matriz.set_entrada(3, 1, eixo_x.get_z())

        matriz.set_entrada(1, 2, eixo_y.get_x())
        matriz.set_entrada(2, 2, eixo_y.get_y())
        matriz.set_entrada(3, 2, eixo_y.get_z())

        matriz.set_entrada(1, 3, eixo_z.get_x())
        matriz.set_entrada(2, 3, eixo_z.get_y())
        matriz.set_entrada(3, 3, eixo_z.get_z())

        matriz.set_entrada(1, 4, posicao.get_x())
        matriz.set_entrada(2, 4, posicao.get_y())
        matriz.set_entrada(3, 4, posicao.get_z())
        matriz.set_entrada(4, 4, 1.0)  # porque é um ponto

        self.matriz = matriz

    def __str__(self):
        """Retorna uma string com os atributos do objeto do tipo Camara.
        """

        return("Camara("
               + str(self.posicao) + ",\n"
               + str(self.olhar_para) + ",\n"
               + str(self.vertical) + ",\n"
               + str(self.distancia_olho_plano_projecao) + ",\n"
               + str(self.largura_retangulo_projecao) + ",\n"
               + str(self.altura_retangulo_projecao) + ",\n"
               + str(self.resolucao_horizontal) + ",\n"
               + str(self.resolucao_vertical) + ",\n"
               + str(self.eixo_x) + ",\n"
               + str(self.eixo_y) + ",\n"
               + str(self.eixo_z) + ",\n"
               + str(self.incremento_horizontal) + ",\n"
               + str(self.incremento_vertical) + ",\n"
               + str(self.canto_superior_esquerdo_x) + ",\n"
               + str(self.canto_superior_esquerdo_y) + ",\n"
               + str(self.canto_superior_esquerdo_z) + ",\n"
               + str(self.matriz)
               + ")")

    def get_pixel_local(self, linha, coluna):
        """Retorna o Ponto3D na linha e coluna do plano de projeção
        especificados pelos argumentos, no sistema de coordenadas
        local da câmara.
        """

        pixel_x = self.canto_superior_esquerdo_x \
            + (coluna - 1) * self.incremento_horizontal
        pixel_y = self.canto_superior_esquerdo_y \
            - (linha - 1) * self.incremento_vertical
        pixel_z = self.canto_superior_esquerdo_z

        return Ponto3D(pixel_x, pixel_y, pixel_z)

    def local_para_global(self, ponto):
        """Converte o Ponto3D ponto do sistema de coordendas da câmara
        para o sistema de coordenadas global.
        """

        local_x = ponto.get_x()
        local_y = ponto.get_y()
        local_z = ponto.get_z()

        p = Matriz(4, 1)

        p.set_entrada(1, 1, local_x)
        p.set_entrada(2, 1, local_y)
        p.set_entrada(3, 1, local_z)
        p.set_entrada(4, 1, 1.0)  # porque é um ponto

        p_transformado = self.matriz * p

        global_x = p_transformado.get_entrada(1, 1)
        global_y = p_transformado.get_entrada(2, 1)
        global_z = p_transformado.get_entrada(3, 1)

        return Ponto3D(global_x, global_y, global_z)

    def get_pixel_global(self, linha, coluna):
        """Retorna o Ponto3D na linha e coluna do plano de projeção
        especificados pelos argumentos, no sistema de coordenadas
        global onde a câmara está inserida.
        """

        pixel_local = self.get_pixel_local(linha, coluna)

        pixel_global = self.local_para_global(pixel_local)

        return pixel_global


# testes
if __name__ == "__main__":

    # teste ao construtor
    posicao = Ponto3D(0.0, 0.0, 3.0)
    olhar_para = Ponto3D(0.0, 0.0, 0.0)
    vertical = Vetor3D(0.0, 1.0, 0.0)
    distancia_olho_plano_projecao = 2.0
    largura_retangulo_projecao = 2.0
    altura_retangulo_projecao = 2.0
    resolucao_horizontal = 5
    resolucao_vertical = 5

    camara = Camara(posicao, olhar_para, vertical, distancia_olho_plano_projecao,
                    largura_retangulo_projecao, altura_retangulo_projecao,
                    resolucao_horizontal, resolucao_vertical)

    # teste a __str__
    print(camara)

    # teste a get_pixel_local
    print("sistema de coordenadas LOCAL")
    print("canto superior esquerdo = ")
    p1 = camara.get_pixel_local(1, 1)
    print(p1)
    print("canto superior direito = ")
    p2 = camara.get_pixel_local(1, 5)
    print(p2)
    print("canto inferior esquerdo = ")
    p3 = camara.get_pixel_local(5, 1)
    print(p3)
    print("canto inferior direito = ")
    p4 = camara.get_pixel_local(5, 5)
    print(p4)


# teste a local_para_global
    print("sistema de coordenadas GLOBAL")
    print("canto superior esquerdo = ")
    p1_global = camara.local_para_global(p1)
    print(p1_global)
    print("canto superior direito = ")
    p2_global = camara.local_para_global(p2)
    print(p2_global)
    print("canto inferior esquerdo = ")
    p3_global = camara.local_para_global(p3)
    print(p3_global)
    print("canto inferior direito = ")
    p4_global = camara.local_para_global(p4)
    print(p4_global)

    # teste a get_pixel_global
    print("sistema de coordenadas GLOBAL")
    print("canto superior esquerdo = ")
    p5 = camara.get_pixel_global(1, 1)
    print(p5)
    print("canto superior direito = ")
    p6 = camara.get_pixel_global(1, 5)
    print(p6)
    print("canto inferior esquerdo = ")
    p7 = camara.get_pixel_global(5, 1)
    print(p7)
    print("canto inferior direito = ")
    p8 = camara.get_pixel_global(5, 5)
    print(p8)
