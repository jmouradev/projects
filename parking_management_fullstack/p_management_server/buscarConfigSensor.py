#!/usr/bin/python3


import sys
import socket
import _mysql
import json

import MySQLdb as mdb


def load_mysql_configuration():
    mysqlConfig = ""

    try:
        with open("config/mysqlConfig.json", "r") as json_data:
            mysqlConfig = json.load(json_data)
    except Exception:
        return 0, 0

    return mysqlConfig


def select_camera_configuration(zona, camara, filename):
    print("zona:", zona, "camara:", camara, "filename:", filename)
    mysqlConfig = load_mysql_configuration()

    con = None
    cur = None

    # 2 - "sensorConfig"
    # 3 - "config_file"
    # 4 - "file_quit"
    # 5 - "slots_test_cam"
    # 6 - "send_file"

    try:
        con = mdb.connect(
            mysqlConfig["MYSQL"]["host"],
            mysqlConfig["MYSQL"]["user"],
            mysqlConfig["MYSQL"]["password"],
            mysqlConfig["MYSQL"]["dbname"],
        )
        cur = con.cursor()

        sql = "SELECT "
        sql_upd = "UPDATE sensor_camara SET "

        if filename == "sensorConfig":
            sql = sql + "config_2_sensor_camara, send_config_2_sensor_camara"
            sql_upd = sql_upd + "send_config_2_sensor_camara = 'N'"

        if filename == "config_file":
            sql = sql + "config_3_sensor_camara, send_config_3_sensor_camara"
            sql_upd = sql_upd + "send_config_3_sensor_camara = 'N'"

        if filename == "file_quit":
            sql = sql + "config_4_sensor_camara, send_config_4_sensor_camara"
            sql_upd = sql_upd + "send_config_4_sensor_camara = 'N'"

        if filename == "slots_test_cam":
            sql = sql + "config_5_sensor_camara, send_config_5_sensor_camara"
            sql_upd = sql_upd + "send_config_5_sensor_camara = 'N'"

        if filename == "send_file":
            sql = sql + "config_6_sensor_camara, send_config_6_sensor_camara"
            sql_upd = sql_upd + "send_config_6_sensor_camara = 'N'"

        sql = sql + " FROM sensor_camara WHERE id_zona = %s AND id_sensor_camara = %s"
        sql_upd = sql_upd + " WHERE id_zona = %s AND id_sensor_camara = %s"

        # print("sql:", sql)
        # print("sql_upd:", sql_upd)

        cur.execute(sql, (zona, camara))
        #      print(cur.rowcount)
        results = cur.fetchall()

        resp = ""

        for r in results:
            conf = r[0]
            send = r[1]
        #         print(r)

        if send == "S":
            cur.execute(sql_upd, (zona, camara))
            print("rowcount (1);", cur.rowcount)

            if cur.rowcount == 0:
                con.rollback()
                return False

            con.commit()

        if send == "S":
            return conf
        else:
            return send
    except _mysql.Error as e:
        print(e)
        return False
    except Exception as e:
        print(e)
        return False
    finally:
        if con:
            con.close()


if __name__ == "__main__":
    select_camera_configuration(0, 0, "teste")
