import os
import time

from sys import stdout
from io import StringIO

class ExaPipe:

    def __init__(self, input_pipe_path, output_pipe_path):
        self.input_pipe_path = input_pipe_path
        self.output_pipe_path = output_pipe_path

    def writeToInput(self, command):
        """ send and exaBGP command to the pipe from which exaBGP read
        the command to execute.
        command(str): The exabgp command
        returns (int): 0 on Success, 1 otherwise
        """
        fifo_sender = open(self.input_pipe_path, "w")
        if(fifo_sender == None):
            #"exabgp.in pipe does not exist\n"
            return 1

        fifo_sender.write(command + '\n')
        fifo_sender.close()
        return 0

    def readFromOutPut(self):
        """ read an exaBGP response from the pipe that exabgp writes its
        messages.
        returns (str): The exabgp response, if something went wrong, it returns
        an "error Message"
        """
        fifo_receiver = open(self.output_pipe_path, "r")
        if(fifo_receiver == None):
            return "exabgp.out pipe does not exist\n"

        str_buffer = StringIO()
        for line in fifo_receiver:
            str_buffer.write(line)

        response = str_buffer.getvalue()
        str_buffer.close()
        fifo_receiver.close()
        return response
