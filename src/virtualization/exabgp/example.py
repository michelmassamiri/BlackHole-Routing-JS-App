#!/usr/bin/ python3

from __future__ import print_function

from sys import stdin, stdout
from time import sleep
import json

# messages = [
#     'announce route 100.10.0.0/24 next-hop self',
#     'announce route 200.20.0.0/24 next-hop self',
# ]
#
# sleep(5)
#
# #Iterate through messages
# for message in messages:
#     stdout.write(message + '\n')
#     stdout.flush()
#     sleep(1)

sleep(5)

#Get message from exaBGP

counter = 0
#Loop endlessly to allow ExaBGP to continue running
while True:
    #sleep(1)
    try:
        line = stdin.readline().strip()

        if line =="":
            counter += 1
            if counter > 100
                break
            continue
        counter = 0

        message = json.loads(line)
        stdout.write(message)

    except KeyboardInterrupt:
        pass
    except IOError:
        pass
