#!/bin/sh
#projeto42MqttServer.sh

PROCESS_NUM=$(ps -ef | grep "npm" | grep -v "grep" | wc -l)
echo $PROCESS_NUM

if [ $PROCESS_NUM -eq 0 ]; then
   cd /
   cd /home/euclydes/Public/Projeto42/gestao-estacionamento
   nohup npm run dev > /home/euclydes/Public/Projeto42/gestao-estacionamento/projeto42NodeServer_log.txt &
   cd /
fi


