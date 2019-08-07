# coding=utf-8


class PDM(object):

    def __init__(self, gama, delta_max):
        self._gama = gama
        self._delta_max = delta_max

    def utilidade(self, modelo):
        A, S = modelo.A, modelo.S
        U = {s: 0 for s in S()}

        while True:
            delta = 0
            U_anterior = U.copy()
            for s in S():
                U[s] = max(self.util_accao(s, a, U_anterior, modelo) for a in A(s))
                delta = max(delta, abs(U[s] - U_anterior[s]))
            if delta < self._delta_max:
                break
        return U

    def util_accao(self, s, a, U, modelo):
        R, T, gama = modelo.R, modelo.T, self._gama
        return sum(p * (R(s, a, sn) + gama * U[sn]) for (p, sn) in T(s, a))

    def politica(self, U, modelo):
        A, S = modelo.A, modelo.S
        pi = {}
        for s in S():
            a_max = max(A(s), key=lambda a: self.util_accao(s, a, U, modelo))
            pi[s] = a_max
        return pi

    def resolver(self, modelo):
        U = self.utilidade(modelo)
        P = self.politica(U, modelo)
        return U, P
