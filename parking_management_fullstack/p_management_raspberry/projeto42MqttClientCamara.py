#!/usr/bin/python3

import json
import paho.mqtt.client as mqtt
import random
import time
import socket

# import ssl

#
# Global variables
#

with open("./data/mqttConfig.json", "r") as json_data:
    mqttConfig = json.load(json_data)

with open("./data/sensorConfig.json", "r") as json_data:
    sensorConfig = json.load(json_data)

# Name of this client. Don't use identical client IDs for different clients
clientID = "projeto42-server"
DEBUG = 0
retCod = True

# Subscribe to topic with unique identifier. This is where the
# response will be sent by the service.
requestTopic = (
    "services/sensor/request/"
)  # Request goes here. Request ID will be appended later
responseTopic = (
    "services/sensor/response/"
)  # Response comes here. Request ID will be appended later


#
# Callback that is executed when the client receives a CONNACK response from the server.
#
def onConnect(client, userdata, flags, rc):
    print("Connected to the broker with result code " + str(rc))


#
# Callback that is executed when subscribing to a topic
#
def onSubscribe(client, userdata, mid, granted_qos):
    if DEBUG:
        print("Subscribed on topic.")


#
# Callback that is executed when a message is received.
# This displays the time from the remote service.
#
def onMessage(client, userdata, message):
    # Decode the payload to get rid of the 'b' prefix and single quotes:
    retorno = str(message.payload.decode("utf-8"))
    print("It is " + retorno)

    if retorno[9:11] == "OK":
        retCod = True
    else:
        retCod = False


#
# Callback that is executed when we disconnect from the broker.
#
def onDisconnect(client, userdata, message):
    print("Disconnected from the broker.")


# -----------------------------------------------------------------------------
# Send Status
# -----------------------------------------------------------------------------


def sendStatus(idVaga, status):

    # Create MQTT client instance
    mqttc = mqtt.Client(client_id=clientID, clean_session=True)

    # Define the callback functions
    mqttc.on_connect = onConnect
    mqttc.on_subscribe = onSubscribe
    mqttc.on_message = onMessage
    mqttc.on_disconnect = onDisconnect

    requestID = (
        "Z"
        + str(sensorConfig["SENSOR"]["idZona"])
        + str(sensorConfig["SENSOR"]["idCamara"])
        + idVaga
    )

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
    mqttc.loop_start()

    # Subscribe to the topic where we expect the response
    mqttc.subscribe(responseTopic + requestID, 0)  # topic name, QoS

    # Publish time request on request topic
    # Note that we sent no payload in the request

    data = {}
    data["opcao"] = "status"
    data["zona"] = str(sensorConfig["SENSOR"]["idZona"])
    data["camara"] = str(sensorConfig["SENSOR"]["idCamara"])
    data["vaga"] = str(idVaga)
    data["tipo"] = str(sensorConfig["SENSOR"]["tpSensor"])
    data["status"] = str(status)
    json_data = json.dumps(data)

    print("msg:", json_data)
    mqttc.publish(requestTopic + requestID, payload=json_data, qos=0, retain=False)

    # Clean up when done
    mqttc.loop_stop()
    mqttc.disconnect()

    return retCod


# -----------------------------------------------------------------------------
# Send Deltas
# -----------------------------------------------------------------------------


def sendDelta(delta_list):

    # Create MQTT client instance
    mqttc = mqtt.Client(client_id=clientID, clean_session=True)

    # Define the callback functions
    mqttc.on_connect = onConnect
    mqttc.on_subscribe = onSubscribe
    mqttc.on_message = onMessage
    mqttc.on_disconnect = onDisconnect

    requestID = (
        "Z"
        + str(sensorConfig["SENSOR"]["idZona"])
        + str(sensorConfig["SENSOR"]["idCamara"])
    )

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
    mqttc.loop_start()

    # Subscribe to the topic where we expect the response
    mqttc.subscribe(responseTopic + requestID, 0)  # topic name, QoS

    # Publish time request on request topic
    # Note that we sent no payload in the request

    data = {}
    data["opcao"] = "delta"
    data["zona"] = str(sensorConfig["SENSOR"]["idZona"])
    data["camara"] = str(sensorConfig["SENSOR"]["idCamara"])
    data["vaga"] = 0
    data["tipo"] = str(sensorConfig["SENSOR"]["tpSensor"])
    data["delta_list"] = delta_list
    json_data = json.dumps(data)

    print("msg:", json_data)
    mqttc.publish(requestTopic + requestID, payload=json_data, qos=0, retain=False)

    # Clean up when done
    mqttc.loop_stop()
    mqttc.disconnect()

    return retCod


# End

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    print("Start : %s" % time.ctime())
    sendStatus("1", "0")
    print("End : %s" % time.ctime())
