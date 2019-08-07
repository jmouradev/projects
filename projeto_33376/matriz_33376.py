
class Matriz:

    def __init__(self, numero_linhas, numero_colunas):

        self.numero_linhas = numero_linhas
        self.numero_colunas = numero_colunas

        self.linhas = []
        for l in range(numero_linhas):
            linha = []
            # ciclo for para construir 1 linha
            for c in range(numero_colunas):
                linha.append(0.0)
            self.linhas.append(linha)

    def __str__(self):

        resultado = "Matriz de " + str(self.numero_linhas) + " linhas, " + str(self.numero_colunas) + " colunas" + "\n"

        for l in range(self.numero_linhas):
            for c in range(self.numero_colunas):
                resultado = resultado + str(self.linhas[l][c]) + " "
            resultado = resultado + "\n"

        return(resultado)

    def set_entrada(self, linha, coluna, valor):

        self.linhas[linha - 1][coluna - 1] = valor

    def get_entrada(self, linha, coluna):

        return(self.linhas[linha - 1][coluna - 1])

    def adiciona(self, outra_matriz):
        """Adiciona matrizes."""

        resultado = Matriz(self.numero_linhas,
                           self.numero_colunas)

        for l in range(self.numero_linhas):
            for c in range(self.numero_colunas):
                # valor da entrada na linha l, coluna c, do resultado
                valor = self.linhas[l][c] + outra_matriz.linhas[l][c]
                resultado.linhas[l][c] = valor

        return(resultado)

    def __add__(self, outra_matriz):

        return(self.adiciona(outra_matriz))

    # método transposta
    def transposta(self):

        outra_matriz = Matriz(self.numero_colunas,
                              self.numero_linhas)

        for l in range(self.numero_linhas):
            for c in range(self.numero_colunas):
                outra_matriz.linhas[c][l] = self.linhas[l][c]

        return(outra_matriz)

    def multiplica(self, outra_matriz):

        resultado = Matriz(self.numero_linhas, outra_matriz.numero_colunas)

        for l in range(resultado.numero_linhas):
            for c in range(resultado.numero_colunas):
                # valor da entrada na linha l, coluna c, do resultado
                valor = 0.0
                for n in range(self.numero_colunas):
                    valor = valor + self.linhas[l][n] * outra_matriz.linhas[n][c]
                resultado.linhas[l][c] = valor

        return(resultado)

    def multiplica_escalar(self, escalar):
        """Multiplica a matriz por um escalar."""

        resultado = Matriz(self.numero_linhas, self.numero_colunas)

        for l in range(self.numero_linhas):
            for c in range(self.numero_colunas):
                resultado.linhas[l][c] = self.linhas[l][c] * escalar

        return(resultado)

    def __mul__(self, valor):
        """Define o operador * com os métodos multiplica e
        multiplica_escalar."""

        if isinstance(valor, float):
            return(self.multiplica_escalar(valor))
        else:
            return(self.multiplica(valor))

    def det_2x2(self):
        """Retorna o determinante de uma matriz de 2 por 2."""

        # det( a b )
        #      c d
        a = self.linhas[0][0]
        b = self.linhas[0][1]
        c = self.linhas[1][0]
        d = self.linhas[1][1]

        return(a * d - b * c)

    def det_3x3(self):
        """Retorna o determinante de uma matriz de 3 por 3."""

        # det( a b c )
        #      d e f
        #      g h i
        a = self.linhas[0][0]
        b = self.linhas[0][1]
        c = self.linhas[0][2]
        d = self.linhas[1][0]
        e = self.linhas[1][1]
        f = self.linhas[1][2]
        g = self.linhas[2][0]
        h = self.linhas[2][1]
        i = self.linhas[2][2]

        return(a * e * i + b * f * g + d * h * c - c * e * g - b * d * i - h * f * a)

    def sub_matriz(self, linha_a_remover, coluna_a_remover):
        """Retorna a submatriz obtida removendo a linha
        linha_a_remover e a coluna coluna_a_remover."""

        resultado = Matriz(self.numero_linhas - 1, self.numero_colunas - 1)

        for l in range(resultado.numero_linhas):
            for c in range(resultado.numero_colunas):
                lindex = l
                cindex = c
                if l >= linha_a_remover - 1:
                    lindex = l + 1
                    if c >= coluna_a_remover - 1:
                        cindex = c + 1
                resultado.linhas[l][c] = self.linhas[lindex][cindex]

        return(resultado)

    def det(self):
        """Retorna o determinante de uma matriz quadrada de qualquer
        ordem."""

        if self.numero_linhas == 1:
            return(self.linhas[0][0])
        elif self.numero_linhas == 2:
            return(self.det_2x2())
        elif self.numero_linhas == 3:
            return(self.det_3x3())
        else:
            # desenvolvimento de Laplace pela linha 1
            resultado = 0.0
            for n in range(self.numero_colunas):
                resultado = resultado \
                    + (-1)**n * self.linhas[0][n] \
                    * self.sub_matriz(1, n + 1).det()
            return(resultado)

    # método copia
    def copia(self):

        outra_matriz = Matriz(self.numero_linhas,
                              self.numero_colunas)

        for l in range(self.numero_linhas):
            for c in range(self.numero_colunas):
                outra_matriz.linhas[l][c] = self.linhas[l][c]

        return(outra_matriz)

    # método set_linha
    def set_linha(self, linha, uma_lista):

        for c in range(len(uma_lista)):
            self.set_entrada(linha, c + 1, uma_lista[c])

    # método set_coluna
    def set_coluna(self, coluna, uma_lista):

        for l in range(len(uma_lista)):
            self.set_entrada(l + 1, coluna, uma_lista[l])


if __name__ == "__main__":

    # teste ao construtor
    m1 = Matriz(3, 4)

    # teste a __str__
    print(m1)

    # teste a set_entrada
    m1.set_entrada(1, 2, 1.0)
    m1.set_entrada(2, 2, 2.0)
    m1.set_entrada(3, 2, 3.0)
    print(m1)

    # teste a get_entrada
    print("m1 entrada 3,1 = ")
    print(m1.get_entrada(3, 1))
    print("m1 entrada 3,2 = ")
    print(m1.get_entrada(3, 2))

    # teste a adiciona
    m2 = m1.adiciona(m1)
    print(m2)

    # teste a +
    m3 = m1 + m1
    print(m3)

    # teste a transposta
    m4 = m1.transposta()
    print("m1 transposta = ")
    print(m4)

    # teste a multiplica
    m5 = m1.multiplica(m4)
    print(m5)

    # teste a multiplica_escalar
    m5a = m5.multiplica_escalar(-1.0)
    print(m5a)

    # teste a mul
    m6 = Matriz(1, 4)
    m6.set_entrada(1, 1, 1.0)
    m6.set_entrada(1, 2, 2.0)
    m6.set_entrada(1, 3, 3.0)
    m6.set_entrada(1, 4, 4.0)
    m7 = Matriz(4, 1)
    m7.set_entrada(1, 1, 1.0)
    m7.set_entrada(2, 1, 2.0)
    m7.set_entrada(3, 1, 3.0)
    m7.set_entrada(4, 1, 4.0)
    m8 = m6.multiplica(m7)
    print(m8)

    m15 = Matriz(1, 3)
    m15.set_entrada(1, 1, 1.0)
    m15.set_entrada(1, 2, 2.0)
    m15.set_entrada(1, 3, 3.0)
    m16 = Matriz(3, 1)
    m16.set_entrada(1, 1, -1.0)
    m16.set_entrada(2, 1, 1.0)
    m16.set_entrada(3, 1, -1.0)
    m17 = m15.multiplica(m16)
    print(m17)

    # teste a *
    m6 = m1 * m4
    print(m6)
    m6a = m1 * 2.0
    print(m6a)

    # teste a det_2x2
    m7 = Matriz(2, 2)
    m7.set_entrada(1, 1, 1.0)
    m7.set_entrada(1, 2, 2.0)
    m7.set_entrada(2, 1, 3.0)
    m7.set_entrada(2, 2, 4.0)
    print(m7)
    print("det(m7) = " + str(m7.det_2x2()))

    # teste a det_3x3
    print(m6)
    print("det(m6) = " + str(m6.det_3x3()))

    # teste a sub_matriz
    m8 = m6.sub_matriz(2, 2)
    print(m8)

    # testes a det
    print(m7.det())
    print(m6.det())
    m9 = Matriz(5, 5)
    m9.set_entrada(1, 1, 2.0)
    m9.set_entrada(2, 2, 2.0)
    m9.set_entrada(3, 3, 2.0)
    m9.set_entrada(4, 4, 2.0)
    m9.set_entrada(5, 5, 2.0)
    print(m9)
    print("det(m9) = " + str(m9.det()))

    # testes a copia
    m10 = m8.copia()
    m10.set_entrada(1, 1, -2.0)
    print("\ncópia = ")
    print(m8)
    print(m10)

    # teste a set_linha
    m9.set_linha(5, [1.0, 2.0, 3.0, 4.0, 5.0])
    print(m9)

    # teste a set_coluna
    m9.set_coluna(3, [10.0, 20.0, 30.0, 40.0, 50.0])
    print(m9)

    # teste adicional a determinantes de matrizes de 4x4
    matriz_A = Matriz(4, 4)
    matriz_A.set_linha(1, [1.0, 0.0, 0.0, -1.0])
    matriz_A.set_linha(2, [0.0, 1.0, 0.0, 0.0])
    matriz_A.set_linha(3, [0.0, 0.0, 1.0, 0.0])
    matriz_A.set_linha(4, [5.0, 5.0, 5.0, 0.0])
    det_A = matriz_A.det()
    print("det(A) = " + str(det_A))
    lista_B = [2.0, 0.5, 0.5, 10.0]
    matriz_A1 = matriz_A.copia()
    matriz_A2 = matriz_A.copia()
    matriz_A3 = matriz_A.copia()
    matriz_A4 = matriz_A.copia()
    matriz_A1.set_coluna(1, lista_B)
    matriz_A2.set_coluna(2, lista_B)
    matriz_A3.set_coluna(3, lista_B)
    matriz_A4.set_coluna(4, lista_B)
    print("x = " + str(matriz_A1.det() / det_A))
    print("y = " + str(matriz_A2.det() / det_A))
    print("z = " + str(matriz_A3.det() / det_A))
    print("t = " + str(matriz_A4.det() / det_A))

    # exercício 1 do trabalho 3
    matriz_B = Matriz(4, 4)
    matriz_B.set_linha(1, [1.0, 0.0, 0.0, -12.0])
    matriz_B.set_linha(2, [0.0, 1.0, 0.0, -7.0])
    matriz_B.set_linha(3, [0.0, 0.0, 1.0, -8.0])
    matriz_B.set_linha(4, [9.0, 5.0, 6.0, 0.0])
    det_B = matriz_B.det()
    print("\nexercício 1 det(B) = " + str(det_B))
    lista_B = [6.0, 3.0, 4.0, -7.0]
    matriz_B1 = matriz_B.copia()
    matriz_B2 = matriz_B.copia()
    matriz_B3 = matriz_B.copia()
    matriz_B4 = matriz_B.copia()
    matriz_B1.set_coluna(1, lista_B)
    matriz_B2.set_coluna(2, lista_B)
    matriz_B3.set_coluna(3, lista_B)
    matriz_B4.set_coluna(4, lista_B)
    print("x = " + str(round((matriz_B1.det() / det_B), 3)))
    print("y = " + str(round((matriz_B2.det() / det_B), 3)))
    print("z = " + str(round((matriz_B3.det() / det_B), 3)))
    print("t = " + str(round((matriz_B4.det() / det_B), 3)))

    # teste adicional a determinantes de matrizes de 9x9
    matriz_A = Matriz(9, 9)
    matriz_A.set_linha(1, [4.0, 0.0, 0.0, 5.0, 0.0, 0.0, 7.0, 0.0, 0.0])
    matriz_A.set_linha(2, [0.0, 4.0, 0.0, 0.0, 5.0, 0.0, 0.0, 7.0, 0.0])
    matriz_A.set_linha(3, [0.0, 0.0, 4.0, 0.0, 0.0, 5.0, 0.0, 0.0, 7.0])
    matriz_A.set_linha(4, [6.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0, 0.0, 0.0])
    matriz_A.set_linha(5, [0.0, 6.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0, 0.0])
    matriz_A.set_linha(6, [0.0, 0.0, 6.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0])
    matriz_A.set_linha(7, [1.0, 0.0, 0.0, 2.0, 0.0, 0.0, 3.0, 0.0, 0.0])
    matriz_A.set_linha(8, [0.0, 1.0, 0.0, 0.0, 2.0, 0.0, 0.0, 3.0, 0.0])
    matriz_A.set_linha(9, [0.0, 0.0, 1.0, 0.0, 0.0, 2.0, 0.0, 0.0, 3.0])
    det_A = matriz_A.det()
    print("\ndet(A) = " + str(det_A))
    lista_B = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
    matriz_A1 = matriz_A.copia()
    matriz_A2 = matriz_A.copia()
    matriz_A3 = matriz_A.copia()
    matriz_A4 = matriz_A.copia()
    matriz_A5 = matriz_A.copia()
    matriz_A6 = matriz_A.copia()
    matriz_A7 = matriz_A.copia()
    matriz_A8 = matriz_A.copia()
    matriz_A9 = matriz_A.copia()
    matriz_A1.set_coluna(1, lista_B)
    matriz_A2.set_coluna(2, lista_B)
    matriz_A3.set_coluna(3, lista_B)
    matriz_A4.set_coluna(4, lista_B)
    matriz_A5.set_coluna(5, lista_B)
    matriz_A6.set_coluna(6, lista_B)
    matriz_A7.set_coluna(7, lista_B)
    matriz_A8.set_coluna(8, lista_B)
    matriz_A9.set_coluna(9, lista_B)
    a = matriz_A1.det() / det_A
    print("a = " + str(round(a, 3)))
    b = matriz_A2.det() / det_A
    print("b = " + str(round(b, 3)))
    c = matriz_A3.det() / det_A
    print("c = " + str(round(c, 3)))
    d = matriz_A4.det() / det_A
    print("d = " + str(round(d, 3)))
    e = matriz_A5.det() / det_A
    print("e = " + str(round(e, 3)))
    f = matriz_A6.det() / det_A
    print("f = " + str(round(f, 3)))
    g = matriz_A7.det() / det_A
    print("g = " + str(round(g, 3)))
    h = matriz_A8.det() / det_A
    print("h = " + str(round(h, 3)))
    i = matriz_A9.det() / det_A
    print("i = " + str(round(i, 3)))
    # verificação
    matriz_M = Matriz(3, 3)
    matriz_M.set_linha(1, [4.0, 5.0, 7.0])
    matriz_M.set_linha(2, [6.0, 9.0, 8.0])
    matriz_M.set_linha(3, [1.0, 2.0, 3.0])
    matriz_M_inversa = Matriz(3, 3)
    matriz_M_inversa.set_linha(1, [a, b, c])
    matriz_M_inversa.set_linha(2, [d, e, f])
    matriz_M_inversa.set_linha(3, [g, h, i])
    matriz_I = matriz_M * matriz_M_inversa
    print(matriz_I)
    print("Entradas de matriz_I com 3 casas decimais")
    print(str(round(matriz_I.get_entrada(1, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(1, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(1, 3), 3)))
    print(str(round(matriz_I.get_entrada(2, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(2, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(2, 3), 3)))
    print(str(round(matriz_I.get_entrada(3, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(3, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(3, 3), 3)))

    # Exercício 3 do trabalho 3 (matriz B 9x9)
    matriz_B = Matriz(9, 9)
    matriz_B.set_linha(1, [2.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0, 0.0, 0.0])
    matriz_B.set_linha(2, [0.0, 2.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0, 0.0])
    matriz_B.set_linha(3, [0.0, 0.0, 2.0, 0.0, 0.0, 9.0, 0.0, 0.0, 8.0])
    matriz_B.set_linha(4, [2.0, 0.0, 0.0, 10.0, 0.0, 0.0, 13.0, 0.0, 0.0])
    matriz_B.set_linha(5, [0.0, 2.0, 0.0, 0.0, 10.0, 0.0, 0.0, 13.0, 0.0])
    matriz_B.set_linha(6, [0.0, 0.0, 2.0, 0.0, 0.0, 10.0, 0.0, 0.0, 13.0])
    matriz_B.set_linha(7, [4.0, 0.0, 0.0, 18.0, 0.0, 0.0, 19.0, 0.0, 0.0])
    matriz_B.set_linha(8, [0.0, 4.0, 0.0, 0.0, 18.0, 0.0, 0.0, 19.0, 0.0])
    matriz_B.set_linha(9, [0.0, 0.0, 4.0, 0.0, 0.0, 18.0, 0.0, 0.0, 19.0])
    det_B = matriz_B.det()
    print("\ndet(B) = " + str(det_B))
    lista_C = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
    matriz_B1 = matriz_B.copia()
    matriz_B2 = matriz_B.copia()
    matriz_B3 = matriz_B.copia()
    matriz_B4 = matriz_B.copia()
    matriz_B5 = matriz_B.copia()
    matriz_B6 = matriz_B.copia()
    matriz_B7 = matriz_B.copia()
    matriz_B8 = matriz_B.copia()
    matriz_B9 = matriz_B.copia()
    matriz_B1.set_coluna(1, lista_C)
    matriz_B2.set_coluna(2, lista_C)
    matriz_B3.set_coluna(3, lista_C)
    matriz_B4.set_coluna(4, lista_C)
    matriz_B5.set_coluna(5, lista_C)
    matriz_B6.set_coluna(6, lista_C)
    matriz_B7.set_coluna(7, lista_C)
    matriz_B8.set_coluna(8, lista_C)
    matriz_B9.set_coluna(9, lista_C)
    a = matriz_B1.det() / det_B
    print("a = " + str(round(a, 3)))
    b = matriz_B2.det() / det_B
    print("b = " + str(round(b, 3)))
    c = matriz_B3.det() / det_B
    print("c = " + str(round(c, 3)))
    d = matriz_B4.det() / det_B
    print("d = " + str(round(d, 3)))
    e = matriz_B5.det() / det_B
    print("e = " + str(round(e, 3)))
    f = matriz_B6.det() / det_B
    print("f = " + str(round(f, 3)))
    g = matriz_B7.det() / det_B
    print("g = " + str(round(g, 3)))
    h = matriz_B8.det() / det_B
    print("h = " + str(round(h, 3)))
    i = matriz_B9.det() / det_B
    print("i = " + str(round(i, 3)))
    # verificação
    matriz_M = Matriz(3, 3)
    matriz_M.set_linha(1, [8.0, 3.0, 2.0])
    matriz_M.set_linha(2, [16.0, 12.0, 13.0])
    matriz_M.set_linha(3, [8.0, 3.0, 9.0])
    matriz_M_inversa = Matriz(3, 3)
    matriz_M_inversa.set_linha(1, [a, b, c])
    matriz_M_inversa.set_linha(2, [d, e, f])
    matriz_M_inversa.set_linha(3, [g, h, i])
    matriz_I = matriz_M * matriz_M_inversa
    print(matriz_I)
    print("Entradas de matriz_I com 3 casas decimais")
    print(str(round(matriz_I.get_entrada(1, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(1, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(1, 3), 3)))
    print(str(round(matriz_I.get_entrada(2, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(2, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(2, 3), 3)))
    print(str(round(matriz_I.get_entrada(3, 1), 3)) + " " +
        str(round(matriz_I.get_entrada(3, 2), 3)) + " " +
        str(round(matriz_I.get_entrada(3, 3), 3)))
