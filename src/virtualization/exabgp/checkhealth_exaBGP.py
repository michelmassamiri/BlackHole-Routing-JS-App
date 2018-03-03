#!/usr/bin/ python3

from __future__ import print_function

import socket
from collections import namedtuple
from sys import stdout
from time import sleep


class Healthcheck() :

    def is_alive(self, address, port):
        """ This is a method that will test TCP connectivity of a given
        address and port. If a domain name is passed in instead of an address,
        the socket.connect() method will resolve.
        address (str): An IP address or FQDN of a host
        port (int): TCP destination port to use
        returns (bool): True if alive, False if not
        """
        # Create a socket object to connect with
        s = socket.socket()

        # Now try connecting, passing in a tuple with address & port
        try:
            s.connect((address, port))
            return True
        except socket.error:
            return False
        finally:
            s.close()

    def get_json(self):
        """ This is a method that will return the parsed json object.
        The method will read from the STDIN what exaBGP returned, then parse the output
        to JSON object.
        """

    def is_running(self):
        """This method will check if exaBGP is running,
        and if the config file has successfully loaded.
        returns (bool) : True if running, False if not.
        """
