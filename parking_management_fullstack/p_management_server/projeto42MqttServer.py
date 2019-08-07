#!/usr/bin/python3

from time import localtime, strftime
import json
import paho.mqtt.client as mqtt

# import ssl
import atualizarSensor
import buscarConfigSensor
import trataDeltas
import datetime

#
# Global variables
#

with open("config/mqttConfig.json", "r") as json_data:
    mqttConfig = json.load(json_data)

requestTopic = "services/sensor/request/+"  # Request comes in here. Note wildcard.
responseTopic = (
    "services/sensor/response/"
)  # Response goes here. Request ID will be appended later

mylist = []


#
# Callback that is executed when the client receives a CONNACK response from the server.
#
def onConnect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribe on request topic with a single-level wildcard.
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(requestTopic, 0)  # topic, QoS


#
# Callback that is executed when a message is received.
#
def onMessage(client, userdata, message):
    lTime = strftime("%H:%M:%S", localtime())
    json_string = message.payload.decode()
    requestTopic = message.topic
    requestID = requestTopic.split("/")[
        3
    ]  # obtain requestID as last field from the topic
    today = datetime.date.today()
    mylist.append(today)

    print(
        "-------------------------------------------------------------------------------------------------------------------"
    )
    print(
        mylist[0], "time:", lTime, "requestID:", requestID, "json_string:", json_string
    )

    #   json_string = '{"zona":"002","camara":"002","vaga":"002","tipo":"001","status":"1"}'
    msg = json.loads(json_string)
    rc = False

    print("opcao:", msg["opcao"])

    if msg["opcao"] == "status":
        id_zona = int(msg["zona"])
        id_vaga = int(msg["vaga"])

        if id_vaga == 999:
            id_vaga = 0

        id_camara = int(msg["camara"])
        tp_sensor = int(msg["tipo"])
        status = int(msg["status"])
        rc = atualizarSensor.update_sensor_table(id_zona, id_vaga, tp_sensor, status)

    if msg["opcao"] == "status-i":
        id_zona = msg["zona"]
        id_vaga = msg["vaga"]
        id_camara = msg["camara"]
        tp_sensor = msg["tipo"]
        status = msg["status"]
        rc = atualizarSensor.update_sensor_table(id_zona, id_vaga, tp_sensor, status)

    if msg["opcao"] == "ip":
        id_zona = int(msg["zona"])
        id_camara = int(msg["camara"])
        ip = msg["ip"]
        rc = atualizarSensor.update_camara_table(id_zona, id_camara, ip)

    if msg["opcao"] == "delta":
        id_zona = int(msg["zona"])
        id_camara = int(msg["camara"])
        delta_list = msg["delta_list"]
        rc = trataDeltas.update_deltas_table(id_zona, id_camara, delta_list)

    # Publish the time to the response topic
    if msg["opcao"] == "config":
        id_zona = int(msg["zona"])
        id_camara = int(msg["camara"])
        filename = msg["file"]

        data = {}
        data["opcao"] = msg["opcao"]
        data["zona"] = int(msg["zona"])
        data["camara"] = int(msg["camara"])
        data["file"] = msg["file"]

        rc = buscarConfigSensor.select_camera_configuration(
            id_zona, id_camara, filename
        )

        if rc is False:
            data["rc"] = "NOK"
        else:
            if rc == "N":
                data["update"] = False
                data["data"] = ""
                data["rc"] = "OK"
            else:
                data["update"] = True
                json_dataR = json.loads(rc)
                data["data"] = json_dataR
                data["rc"] = "OK"

        json_data = json.dumps(data)
        client.publish(
            (responseTopic + requestID), payload=json_data, qos=0, retain=False
        )

    codRet = "OK"

    if rc is False:
        codRet = "NOK"

    # print("Received a time request on topic " + requestTopic + ".")

    # Get and format the local time
    lTime = strftime("%H:%M:%S", localtime())

    print("time:", lTime, "requestID:", requestID, "codRet:", codRet)


#
# Callback that is executed when we disconnect from the broker.
#
def onDisconnect(client, userdata, message):
    print("Disconnected from the broker.")


# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------


# # Create MQTT client instance
mqttc = mqtt.Client(client_id="projeto42-client", clean_session=True)

mqttc.on_connect = onConnect
mqttc.on_message = onMessage
mqttc.on_disconnect = onDisconnect

# mqttc.tls_set(ca_certs=mqttConfig['MQTT']['caMQTT'], certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)
# mqttc.tls_insecure_set(False)

# Connect to the broker
mqttc.username_pw_set(
    mqttConfig["MQTT"]["userMQTT"], password=mqttConfig["MQTT"]["passwdMQTT"]
)
mqttc.connect(
    mqttConfig["MQTT"]["hostMQTT"],
    port=int(mqttConfig["MQTT"]["portMQTT"]),
    keepalive=60,
    bind_address="",
)

# This is a blocking form of the network loop and will not return until the client
# calls disconnect(). It automatically handles reconnecting.
mqttc.loop_forever()

# End
