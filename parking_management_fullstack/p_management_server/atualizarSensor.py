#!/usr/bin/python3


import sys
import _mysql
import json
from time import localtime, strftime
import MySQLdb as mdb

# import mysql.connector as mc


def load_mysql_configuration():
    mysqlConfig = ""

    try:
        with open("config/mysqlConfig.json", "r") as json_data:
            mysqlConfig = json.load(json_data)
    except Exception:
        return 0, 0

    return mysqlConfig


def update_sensor_table(zona, vaga, tipo, status):
    print("zona:", zona, "vaga:", vaga, "status:", status)
    mysqlConfig = load_mysql_configuration()

    con = None
    cur = None

    try:
        con = mdb.connect(
            mysqlConfig["MYSQL"]["host"],
            mysqlConfig["MYSQL"]["user"],
            mysqlConfig["MYSQL"]["password"],
            mysqlConfig["MYSQL"]["dbname"],
        )
        cur = con.cursor()

        now = strftime("%Y-%m-%d %H:%M:%S", localtime())

        cur.execute(
            "SELECT estado_vaga FROM vaga WHERE id_zona = %s AND id_vaga = %s",
            (zona, vaga),
        )
        results = cur.fetchall()

        estado = 9

        for r in results:
            estado = r[0]

        encontrou = False

        cur.execute(
            "SELECT * FROM parqueamento WHERE id_zona = %s AND id_vaga = %s AND dh_inicio_parqueamento = dh_final_parqueamento",
            (zona, vaga),
        )

        print("rowcount (0);", cur.rowcount)

        if cur.rowcount > 0:
            encontrou = True

        print("estado:", int(estado), " status:", int(status), " encontrou:", encontrou)

        if int(estado) == int(status) and encontrou:
            print("Sai aqui")
            return True

        cur.execute(
            "UPDATE vaga SET estado_vaga = %s, dh_alteracao_vaga = %s WHERE id_zona = %s AND id_vaga = %s",
            (status, now, zona, vaga),
        )

        print("rowcount (1);", cur.rowcount)

        if cur.rowcount == 0:
            con.rollback()
            return False

        con.commit()

        if vaga == 0:
            return True

        if int(status) == 0:
            print("INSERT")
            cur.execute(
                "INSERT INTO parqueamento (id_zona, id_vaga, id_utilizador, id_veiculo, dh_inicio_parqueamento, dh_final_parqueamento, valor_pagar) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (zona, vaga, 0, 0, now, now, 0.0),
            )
        else:
            print("UPDATE")
            now = strftime("%Y-%m-%d %H:%M:%S", localtime())
            cur.execute(
                "UPDATE parqueamento SET dh_final_parqueamento = %s WHERE id_zona = %s AND id_vaga = %s AND dh_inicio_parqueamento = dh_final_parqueamento",
                (now, zona, vaga),
            )

        print("rowcount (2);", cur.rowcount)

        if cur.rowcount == 0:
            con.rollback()
            return False

        con.commit()
        return True
    except _mysql.Error as e:
        print(e)
        con.rollback()
        return False
    except Exception as e:
        print(e)
        con.rollback()
        return False
    finally:
        if con:
            con.close()


def update_camara_table(zona, camara, ip):
    print("zona:", zona, "camara:", camara, "ip:", ip)
    mysqlConfig = load_mysql_configuration()

    con = None
    cur = None

    try:
        con = mdb.connect(
            mysqlConfig["MYSQL"]["host"],
            mysqlConfig["MYSQL"]["user"],
            mysqlConfig["MYSQL"]["password"],
            mysqlConfig["MYSQL"]["dbname"],
        )
        cur = con.cursor()

        now = strftime("%Y-%m-%d %H:%M:%S", localtime())

        desc = "Nova camara na zona=" + str(int(zona)) + " com o id=" + str(int(camara))
        #      print(desc)

        cur.execute(
            "UPDATE sensor_camara SET ip_sensor_camara = %s, dh_alteracao_sensor_camara = %s WHERE id_zona = %s AND id_sensor_camara = %s ",
            (ip, now, zona, camara),
        )

        #      print("rowcount (1);", cur.rowcount)

        if cur.rowcount == 0:
            con.rollback()
            return False

        con.commit()
        return True
    except _mysql.Error as e:
        print(e)
        con.rollback()
        return False
    except Exception as e:
        print(e)
        con.rollback()
        return False
    finally:
        if con:
            con.close()


if __name__ == "__main__":
    # update_sensor_table(0, 0, 0)
    update_sensor_table(4, 4, 1, 0)
