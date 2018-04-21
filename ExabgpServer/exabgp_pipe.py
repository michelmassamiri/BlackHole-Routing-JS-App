import os
import select

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
        reader = open(self.output_pipe_path, "r")
        if(reader == None):
            return 'exabgp.in does not exists\n'

        str_buffer = StringIO()
        done = False
        while not done:
                try:
                            for line in reader:
                                str_buffer.write(line)
                                if('done' in str_buffer.getvalue() or 'error' in str_buffer.getvalue()):
                                    done = True
                                    break

                            select.select([reader],[],[],0.01)
                except OSError as exc:
                    if exc.errno in error.block:
                        break
                except IOError as exc:
                    if exc.errno in error.block:
                        break

        response = str_buffer.getvalue()
        str_buffer.close()
        reader.close()
        return response
