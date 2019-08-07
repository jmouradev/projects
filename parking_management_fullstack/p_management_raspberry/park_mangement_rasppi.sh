#!/bin/sh

PROCESS_NUM=$(ps -ef | grep "park_mangement_rasppi.py" | grep -v "grep" | wc -l)
echo $PROCESS_NUM

if [ $PROCESS_NUM -eq 0 ]; then
   cd /
   cd /home/pi/Projeto42
   python3 park_mangement_rasppi.py > /home/pi/Projeto42/logs/park_mangement_rasppi_log.txt  2>&1
   cd /
fi


