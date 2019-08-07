#!/bin/sh


cd /
cd home/pi/Projeto42
sudo python3 projeto42MqttClientUpdateIp.py > /home/pi/Projeto42/logs/projeto42MqttClientUpdateIp_log.txt 2>&1
cd /

