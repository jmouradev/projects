#!/usr/bin/python3

import json
import time
from paramiko import SSHClient
from scp import SCPClient

with open("data/send_file.json", "r") as json_data:
    send_file = json.load(json_data)

zona = send_file["id_zona"]
camara = send_file["id_camara"]
enviar = send_file["send_file"]
file_name = send_file["file_name"]
host = send_file["dest_host"]

print(
    "zona:",
    zona,
    "camara:",
    camara,
    "enviar:",
    enviar,
    "filename:",
    file_name,
    "host:",
    host,
)

if enviar:
    ssh = SSHClient()
    ssh.load_system_host_keys()
    ssh.connect(host, 22, "projeto42")

    with SCPClient(ssh.get_transport()) as scp:
        scp.put(
            "/home/pi/Projeto42/data/" + file_name,
            "/home/projeto42/images/" + file_name,
        )

    send_file["send_file"] = False

    with open("data/send_file.json", "w") as json_data:
        json.dump(send_file, json_data, ensure_ascii=False)

    print("Enviado com sucesso")

print("fim")
