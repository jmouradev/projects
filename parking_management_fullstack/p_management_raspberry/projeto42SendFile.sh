#!/bin/sh


cd /
cd home/pi/Projeto42
sudo python3 projeto42SendFile.py > /home/pi/Projeto42/logs/projeto42SendFile_log.txt 2>&1
cd /

