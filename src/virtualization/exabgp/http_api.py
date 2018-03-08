import cgi
import http.server
import socketserver
import re
import os
import time

from sys import stdout
from io import StringIO

PORT = 5001

#TODO: The path needs to be dynamic and not local
fifo_sender_path = "/home/michs94/.local/run/exabgp/exabgp.in"
fifo_receiver_path = "/home/michs94/.local/run/exabgp/exabgp.out"

class ExaBGPServerHandler(http.server.SimpleHTTPRequestHandler):

    def writeToFifo(self, path, command):
        """ send and exaBGP command to the pipe from which exaBGP read
        the command to execute.
        path(str): The pipe's location to which we send exaBGP commands
        command(str): The exabgp command
        returns (int) 0 on Success, 1 otherwise
        """
        fifo_sender = open(path, "w")
        if(fifo_sender == None):
            self.createResponse("exabgp.in pipe does not exist\n")
            return 1
            #create exabgp.in pipe

        fifo_sender.write(command + '\n')
        fifo_sender.close()
        return 0

    def readFromFifo(self, path):
        """ read an exaBGP response from the pipe that exabgp writes its
        messages.
        path(str): The pipe's location from which we receive exaBGP messages
        returns (str): The exabgp response
        """
        fifo_receiver = open(path, "r")
        if(fifo_receiver == None):
            self.createResponse("exabgp.out pipe does not exist\n")
            return 1

        str_buffer = StringIO()

        for line in fifo_receiver:
            str_buffer.write(line)

        response = str_buffer.getvalue()
        str_buffer.close()
        fifo_receiver.close()
        return response


    def createResponse(self, command):
        """ Send command string back as confirmation """
        self.send_response(200)
        self.send_header('Content-Type', 'application/text')
        self.end_headers()
        self.wfile.write(bytes(command, 'utf-8'))

    def do_POST(self):
        """ Process command from POST and output the exabgp message """
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST'})
        command = form.getvalue('command')

        if('shutdown' in command):
            stdout.write(command +'\n')
            stdout.flush()
            self.createResponse("shutdown Success\n")
        else :
            if(self.writeToFifo(fifo_sender_path, command) == 0):
                #wait for exabgp to finish writing in the exabgp.out pipe
                time.sleep(0.5)
                response = self.readFromFifo(fifo_receiver_path)
                self.createResponse('Success:\n' + response)

    #def do_GET(self):
        #TODO: The entire function is a TODO
        #if re.search('/showcommand', self.path) != None:
            #self.send_response(200)
            #self.send_header('Content-Type', 'application/json')
            #self.end_headers()
            #stdout.write('show version\n')
            #stdout.flush()
            #execute('the healthcheck.py')
            #test_output.test_print('http://localhost', PORT)
            #returning a json rfile(Get_result)
            #self.wfile.write(bytes(json_str, 'utf-8'))


handler = ExaBGPServerHandler
httpd = socketserver.TCPServer(('', PORT), handler)
httpd.serve_forever()
