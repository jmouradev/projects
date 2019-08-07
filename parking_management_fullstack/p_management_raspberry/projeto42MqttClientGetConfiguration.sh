#!/bin/sh

cd /
cd home/pi/Projeto42
sudo python3 projeto42MqttClientGetConfiguration.py > /home/pi/Projeto42/logs/projeto42MqttClientGetConfiguration_log.txt 2>&1
cd /

