#!/usr/bin/python3

import sys
import _mysql
import json
from time import localtime, strftime
import MySQLdb as mdb
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import math
from matplotlib.ticker import MaxNLocator
from matplotlib.pyplot import figure
import base64
from io import BytesIO
from imutils import encodings


def load_mysql_configuration():
    mysqlConfig = ""

    try:
        with open("config/mysqlConfig.json", "r") as json_data:
            mysqlConfig = json.load(json_data)
    except Exception:
        return 0, 0

    return mysqlConfig


def update_deltas_table(zona, camara, delta_list):
    print("zona:", zona, "camara:", camara, "in_delta_list:", delta_list)

    data_hora = delta_list["data_hora"]
    print("data_hora:", data_hora)

    laplacian_threshold = delta_list["laplacian_threshold"]

    print("laplacian_threshold:", laplacian_threshold)

    id_vagas = []
    delta_vagas = []

    for item in delta_list["delta_list"]:
        id_vagas.append(item["id_vaga"])
        delta_vagas.append(item["delta"])

    ax = figure().gca()
    plt.grid()
    plt.title(
        "Deltas da zona " + str(zona) + " camara " + str(camara) + " - " + data_hora
    )
    plt.axhline(laplacian_threshold, 0.0, 20.0, color="g", linewidth=2)
    plt.xlabel("Vagas")
    plt.ylabel(r"$\mu{(|laplacian \times mask|)}$")
    ax.plot(id_vagas, delta_vagas, "o")
    ax.xaxis.set_major_locator(MaxNLocator(integer=True))

    png_filename = (
        "../gestao-estacionamento/server/images/deltas_cameras/grafico_delta_z"
        + str(zona)
        + "_c"
        + str(camara)
        + ".png"
    )
    txt_filename = (
        "../gestao-estacionamento/server/images/deltas_cameras/grafico_delta_z"
        + str(zona)
        + "_c"
        + str(camara)
        + ".svg"
    )

    plt.savefig(png_filename)

    with open(png_filename, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    txt = encoded_string.decode("utf-8")
    txt = "data:image/png;base64," + txt

    with open(txt_filename, "w") as f:
        f.write(txt.format(txt))

    delta_list_json = json.dumps(delta_list)

    mysqlConfig = load_mysql_configuration()

    now = strftime("%Y-%m-%d %H:%M:%S", localtime())

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

        cur.execute(
            "INSERT INTO sensor_camara_historico_delta (id_zona, id_sensor_camara, dh_inclusao_historico_delta, delta_list_historico_delta) VALUES (%s, %s, %s, %s)",
            (zona, camara, now, delta_list_json),
        )

        print("rowcount;", cur.rowcount)

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
    delta_list = {
        "delta_list": [
            {"id_vaga": 6, "delta": 0.26175213675213677},
            {"id_vaga": 7, "delta": 3.4276223776223778},
        ],
        "data_hora": "Sat Jun 30 16:26:22 2018",
    }
    delta_list = {
        "delta_list": [
            {"id_vaga": 6, "delta": 0.33875739644970415},
            {"id_vaga": 7, "delta": 1.3601398601398602},
        ],
        "data_hora": "Sat Jun 30 16:43:23 2018",
    }
    update_deltas_table(4, 1, delta_list)
