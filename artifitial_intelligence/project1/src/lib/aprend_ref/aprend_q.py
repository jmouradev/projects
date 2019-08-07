from aprend_ref import AprendRef


class AprendQ(AprendRef):

    def __init__(self, mem_aprend, sel_accao, alfa, gama):
        super(AprendQ, self).__init__(mem_aprend, sel_accao)
        self._alfa = alfa
        self._gama = gama

    def aprender(self, s, a, r, sn):

        # Q(s, a) = Q(s, a) + alfa[r + gama * max(Q(s', a')) - Q(s, a)]

        an = self._sel_accao.max_accao(sn)
        q_sa = self._mem_aprend.obter(s, a)
        q_snan = self._mem_aprend.obter(sn, an)
        q_n = q_sa + self._alfa * (r + self._gama * q_snan - q_sa)
        self._mem_aprend.actualizar(s, a, q_n)
