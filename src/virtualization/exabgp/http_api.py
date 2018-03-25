import sys, getopt
import http.server
import socketserver
import re
import os
import time

from io import StringIO
from urllib.parse import urlparse, parse_qs

from exabgp_pipe import ExaPipe
from jsonCoder import JsonCoder

PORT = 5001
exa_pipe = None
json_coder = None

class ExaBGPServerHandler(http.server.SimpleHTTPRequestHandler):
    global exa_pipe
    global json_coder
    unvalid_GET_command = {
        'shutdown',
        'restart',
        'reload',
        'announce',
        'teardown',
        'withdraw'
    }

    def createResponse(self, command, code):
        """ Send command string back as confirmation """
        self.send_response(code)
        self.send_header('Content-Type', 'application/text')
        self.end_headers()
        self.wfile.write(bytes(command, 'utf-8'))

    def exabgp_is_running(self):
        """ check if exaBGP is still running in UNIX.
        returns(bool): True if it is alive, False otherwise
        """
        exa_pid = os.getppid()
        try:
            os.kill(exa_pid, 0)
        except OSError:
            return False
        return True

    def do_POST(self):
        """ Process commands from POST and output the exabgp message """
        if(not(self.exabgp_is_running)):
            self.createResponse('ExaBGP is not running\n', 500)
            return

        length = int(self.headers['Content-length'])
        data = self.rfile.read(length)
        data = str(data, 'utf-8')
        command = json_coder.json_to_str(data)
        #TODO : check if it is a valid exabgp command form befor executing !
        """ Write the test here """

        if('shutdown' in command):
            sys.stdout.write(command +'\n')
            sys.stdout.flush()
            self.createResponse("Success: Shutdown Performed done\n", 200)

        if('is running' in command):
            if(self.exabgp_is_running()):
                self.createResponse("Success: True done", 200);
                return
            else:
                self.createResponse("ExaBGP is not Running", 200)
                return

        if(exa_pipe.writeToInput(command) == 0):
            #wait for exabgp to finish writing in the exabgp.out pipe
            #time.sleep(2)
            response = exa_pipe.readFromOutPut()
            self.createResponse('Success:\n' + response, 200)
        else:
            self.createResponse('exabgp.in does not exsit !\n', 500)

    def do_GET(self):
        """ Process commands from GET and output the exabgp message """
        if(not(self.exabgp_is_running)):
            self.createResponse('ExaBGP is not running\n', 500)
            return

        o = urlparse(self.path)
        if((o.query is not '') and ('command' in o.query)):
            query = parse_qs(o.query)
            #Filtering the query in order to take only the first arguments in the dict
            args = {first_element: elements[0] for first_element, elements in query.items()}
            #check if the its a valid command before executing on the server:
            for elem in self.unvalid_GET_command:
                if(elem in args['command']):
                    self.createResponse('Unauthorized command\n', 403)
                    return

            if(exa_pipe.writeToInput(args['command']) == 0):
                #wait for exabgp to finish writing in the exabgp.out pipe
                response = exa_pipe.readFromOutPut()
                self.createResponse('Success:\n' + response, 200)
            else:
                self.createResponse('exabgp.in does not exsit !\n', 500)

        else:
            self.createResponse('Please send a valid ExaBGP command\n', 403)


def main(argv):
    global exa_pipe
    global json_coder
    input_pipe = ''
    output_pipe = ''
    try:
        opts, args = getopt.getopt(argv,"hi:o:",["ipipe=","opipe="])
    except getopt.GetoptError:
        print('USAGE : http_api.py -i <exabgp input pipe path: /path/to/exabgp.in> -o <exabgp output pipe path: /path/to/exabgp.out>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('USAGE : http_api.py -i <exabgp input pipe path: /path/to/exabgp.in> -o <exabgp output pipe path: /path/to/exabgp.out>')
            sys.exit()
        elif opt in ("-i", "--ipipe"):
            input_pipe = arg
        if opt in ("-o", "--opipe"):
            output_pipe = arg
    if(input_pipe == '' or output_pipe == ''):
        print('USAGE : http_api.py -i <exabgp input pipe path: /path/to/exabgp.in> -o <exabgp output pipe path: /path/to/exabgp.out>')
        sys.exit(2)

    exa_pipe = ExaPipe(input_pipe, output_pipe)
    json_coder = JsonCoder()

    handler = ExaBGPServerHandler

    httpd = socketserver.TCPServer(('', PORT), handler)
    httpd.serve_forever()

if __name__ == "__main__":
    main(sys.argv[1:])
