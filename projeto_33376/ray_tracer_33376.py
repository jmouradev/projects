
from ponto_33376 import Ponto3D
from cor_rgb_33376 import CorRGB
from cor_phong_33376 import CorPhong
from face_33376 import FaceTriangular
from luz_33376 import Luz
from vetor_33376 import Vetor3D
from camara_33376 import Camara
from reta_33376 import Reta
from imagem_33376 import Imagem


class RayTracer:

    def __init__(self, lista_faces, lista_luzes, camara, cor_fundo):
        """Aqui são definidos os atributos de dados - menbros.
        """

        self.lista_faces = lista_faces
        self.lista_luzes = lista_luzes
        self.camara = camara
        self.cor_fundo = cor_fundo

    def __str__(self):
        """Retorna uma string constituída por
        RayTracer(lista1, lista2, camara, fundo).
        """

        lista1 = ""
        lista2 = ""

        for f in lista_faces:
            lista1 = lista1 + str(f) + " "

        for l in lista_luzes:
            lista2 = lista2 + str(l) + " "

        return("RayTracer(" + lista1 + "\n" + ",\n" + lista2 + "\n" + ",\n" + str(self.camara)
               + ",\n" + str(self.cor_fundo)
               + "\n)")

    def renderiza(self):
        """Retorna um objeto da classe Imagem com a renderização obtida.
        """
        img = Imagem(self.camara.resolucao_vertical,
                     self.camara.resolucao_horizontal)

        for m in range(img.numero_linhas):
            print("linha = " + str(m + 1) + " de " + str(camara.resolucao_vertical))
            for n in range(img.numero_colunas):
                pos = self.camara.posicao
                proj = self.camara.get_pixel_global(m, n)
                reta = Reta(pos, proj)
                cor_vista_por_raio = self.get_cor_vista_por_raio(reta)

                img.set_cor(m, n, cor_vista_por_raio)

        return(img)

    def get_face_intercetada_mais_proxima(self, raio):
        """Caso a reta raio intercete alguma das faces da cena, da origem
        para a frente, retorna uma lista com 4 elementos, que contém também
        a face intercetada.
        """

        ponto_intercecao = None
        face_intercetada = None

        for face_int in self.lista_faces:
            (interceta_face, pi, t) = face_int.interceta_triangulo(raio)
            if interceta_face is True:
                ponto_intercecao = pi
                face_intercetada = face_int

        if face_intercetada is None:
            return[False, None, None, None]
        else:
            return[True, ponto_intercecao, t, face_intercetada]

    def get_cor_face(self, face_int, pi, direcao_olho):
        """Retorna a cor RGB num ponto de uma face triangular resultante
        da soma das contribuições de todas as luzes em cena mesmo quando
        o ponto está em sombra (de uma ou mais luzes).
        """

        resultado_cor = CorRGB(0.0, 0.0, 0.0)

        for luz in self.lista_luzes:
            raio_luz = Reta(pi, luz.posicao)
            sombra, _, t, _ = self.get_face_intercetada_mais_proxima(raio_luz)
            direcao_luz = raio_luz.vetor_diretor
            vetor_normal = face_int.normal
            resultado_cor += face_int.get_cor_phong().get_cor_rgb(luz, direcao_luz, vetor_normal, direcao_olho, sombra)
        return resultado_cor

    def get_cor_vista_por_raio(self, raio):
        """Retorna a cor da face intercetada pelo raio mais próxima
        da origem do raio (no sentido do destino do raio).
        """
        interceta_face, pi, t, face_int = self.get_face_intercetada_mais_proxima(raio)

        if not interceta_face:
            return self.cor_fundo

        direcao_olho = raio.vetor_diretor
        cor_face = self.get_cor_face(face_int, pi, direcao_olho)

        return cor_face


# testes
if __name__ == "__main__":

    # teste ao construtor
    # teste ao construtor - cor da face
    verde = CorRGB(0.0, 0.3, 0.0)
    brilho = 100.0
    cor = CorPhong(verde, verde, verde, brilho)
    # teste ao construtor - face
    p1 = Ponto3D(0.0, 0.0, 0.0)
    p2 = Ponto3D(1.0, 0.0, 0.0)
    p3 = Ponto3D(0.0, 1.0, 0.0)
    face = FaceTriangular(p1, p2, p3, cor)
    lista_faces = [face]
    # teste ao construtor - luz
    branco = CorRGB(1.0, 1.0, 1.0)
    luz_posicao = Ponto3D(1.0, 0.0, 2.0)
    luz = Luz(luz_posicao, branco, branco, branco)
    lista_luzes = [luz]
    # teste ao construtor - camara
    camara_posicao = Ponto3D(0.0, 0.0, 2.0)
    olhar_para = Ponto3D(0.0, 0.0, 0.0)
    vertical = Vetor3D(0.0, 1.0, 0.0)
    distancia_olho_plano_projecao = 1.5
    largura_retangulo_projecao = 2.0
    altura_retangulo_projecao = 2.0
    resolucao_horizontal = 50
    resolucao_vertical = 50
    camara = Camara(camara_posicao,
                    olhar_para,
                    vertical,
                    distancia_olho_plano_projecao,
                    largura_retangulo_projecao,
                    altura_retangulo_projecao,
                    resolucao_horizontal,
                    resolucao_vertical)

    # teste ao construtor - cor de fundo
    cor_fundo = CorRGB(0.0, 0.0, 0.2)

    # teste ao construtor - ray tracer
    ray_tracer = RayTracer(lista_faces, lista_luzes, camara, cor_fundo)

    # teste a __str__
    print(ray_tracer)

    # teste a renderiza
    imagem = ray_tracer.renderiza()
    imagem.guardar_como_ppm("teste1.ppm")

    # teste de referência

    # definição da câmara
    camara_posicao = Ponto3D(0.0, 0.0, 2.5)
    olhar_para = Ponto3D(0.0, 0.0, 0.0)
    vertical = Vetor3D(0.0, 1.0, 0.0)
    distancia_olho_plano_projecao = 0.5
    largura_retangulo_projecao = 8.0
    altura_retangulo_projecao = 4.0
    resolucao_horizontal = 100
    resolucao_vertical = 100
    camara = Camara(camara_posicao,
                    olhar_para,
                    vertical,
                    distancia_olho_plano_projecao,
                    largura_retangulo_projecao,
                    altura_retangulo_projecao,
                    resolucao_horizontal,
                    resolucao_vertical)

    # definição da lista de faces

    # triângulos cinzentos
    reflexao_ambiente_cinzento = CorRGB(0.5, 0.5, 0.5)
    reflexao_difusa_cinzento = CorRGB(0.75, 0.75, 0.75)
    reflexao_especular_cinzento = CorRGB(0.0, 0.0, 0.0)
    brilho_cinzento = 1.0
    cor_cinzento = CorPhong(reflexao_ambiente_cinzento, reflexao_difusa_cinzento, reflexao_especular_cinzento, brilho_cinzento)

    # vé́rtices dos triângulo 1 (de baixo)
    j = Ponto3D(16.0, -5.1, 0.0)
    k = Ponto3D(150.0, -5.1, -20.0)
    l = Ponto3D(-16.0, -5.1, 0.0)
    face_tri_1 = FaceTriangular(j, k, l, cor_cinzento)

    # vé́rtices dos triângulo 2 (de cima)
    m = Ponto3D(-16.0, -5.1, 0.0)
    n = Ponto3D(150.0, -5.1, -20.0)
    o = Ponto3D(-16.0, 5.1, 0.0)
    face_tri_2 = FaceTriangular(m, n, o, cor_cinzento)

    # triângulos vermelhos
    reflexao_ambiente_vermelho = CorRGB(1.0, 0.0, 0.0)
    reflexao_difusa_vermelho = CorRGB(1.0, 0.0, 0.0)
    reflexao_especular_vermelho = CorRGB(1.0, 0.0, 0.0)
    brilho_vermelho = 1000.0
    cor_vermelho = CorPhong(reflexao_ambiente_vermelho, reflexao_difusa_vermelho, reflexao_especular_vermelho, brilho_vermelho)

    # vé́rtices dos triângulos da letra M
    a = Ponto3D(-16.0, -5.0, 0.0)
    b = Ponto3D(-12.0, -5.0, 0.0)
    c = Ponto3D(-16.0, 5.0, 0.0)
    face_m = FaceTriangular(a, b, c, cor_vermelho)

    a1 = Ponto3D(-16.0, 5.0, 0.0)
    b1 = Ponto3D(-11.0, 0.0, 0.0)
    c1 = Ponto3D(-6.0, 5.0, 0.0)
    face_m1 = FaceTriangular(a1, b1, c1, cor_vermelho)

    a2 = Ponto3D(-10.0, -5.0, 0.0)
    b2 = Ponto3D(-6.0, -5.0, 0.0)
    c2 = Ponto3D(-6.0, 5.0, 0.0)
    face_m2 = FaceTriangular(a2, b2, c2, cor_vermelho)

    # vé́rtices dos triângulos da letra C
    d = Ponto3D(-5.0, -2.0, 0.0)
    e = Ponto3D(5.0, 5.0, 0.0)
    f = Ponto3D(-5.0, 3.0, 0.0)
    face_c = FaceTriangular(d, e, f, cor_vermelho)

    d1 = Ponto3D(-5.0, -3.0, 0.0)
    e1 = Ponto3D(5.0, -5.0, 0.0)
    f1 = Ponto3D(-5.0, 2.0, 0.0)
    face_c1 = FaceTriangular(d1, e1, f1, cor_vermelho)

    # vé́rtices dos triângulos da letra G
    g = Ponto3D(6.0, -2.0, 0.0)
    h = Ponto3D(16.0, 5.0, 0.0)
    i = Ponto3D(6.0, 5.0, 0.0)
    face_g = FaceTriangular(g, h, i, cor_vermelho)

    g1 = Ponto3D(6.0, -5.0, 0.0)
    h1 = Ponto3D(16.0, -5.0, 0.0)
    i1 = Ponto3D(6.0, 2.0, 0.0)
    face_g1 = FaceTriangular(g1, h1, i1, cor_vermelho)

    g2 = Ponto3D(16.0, -5.0, 0.0)
    h2 = Ponto3D(16.0, 0.0, 0.0)
    i2 = Ponto3D(12.0, 0.0, 0.0)
    face_g2 = FaceTriangular(g2, h2, i2, cor_vermelho)

    lista_faces = [face_tri_1,
                   face_tri_2,
                   face_m,
                   face_m1,
                   face_m2,
                   face_c,
                   face_c1,
                   face_g,
                   face_g1,
                   face_g2]

    # definição da cor de fundo
    cor_fundo = CorRGB(0.0, 0.0, 0.0)

    # definição da lista de luzes
    intensidade_ambiente = CorRGB(0.1, 0.1, 0.1)
    intensidade_difusa = CorRGB(0.75, 0.75, 0.75)
    intensidade_especular = CorRGB(0.75, 0.75, 0.75)
    luz_posicao1 = Ponto3D(16.0, 2.0, 2.0)
    luz_posicao2 = Ponto3D(-16.0, -2.0, 2.0)

    luz1 = Luz(luz_posicao1, intensidade_ambiente, intensidade_difusa, intensidade_especular)
    luz2 = Luz(luz_posicao2, intensidade_ambiente, intensidade_difusa, intensidade_especular)

    lista_luzes = [luz1, luz2]

    # ray tracer
    ray_tracer = RayTracer(lista_faces, lista_luzes, camara, cor_fundo)
    print(ray_tracer)

    # renderização
    imagem = ray_tracer.renderiza()

    # ficheiro com a renderização
    imagem.guardar_como_ppm("teste2.ppm")
