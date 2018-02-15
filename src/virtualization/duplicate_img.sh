#!/bin/bash

path = ''

qemu-img create -f qcow2 -b $(path)debian9lxde.img client.qcow2
qemu-img create -f qcow2 -b $(path)debian9lxde.img attacker.qcow2
qemu-img create -f qcow2 -b $(path)debian9lxde.img target.qcow2
qemu-img create -f qcow2 -b $(path)debian9lxde.img route_server.qcow2 
