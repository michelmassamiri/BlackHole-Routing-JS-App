#!/bin/bash

sudo tunctl -t tap0
sudo ifconfig tap0 10.200.200.1 netmask 255.255.255.252 up
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE #change wlan0 to your internet connection
sudo iptables -A FORWARD -i tap0 -j ACCEPT
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
crontab -e
