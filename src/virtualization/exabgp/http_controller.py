import cgi
import http.server
import socketserver
import re
import json
import checkhealth_exaBGP
from sys import stdout

#PORT = 5001
#data = {
#    'command' : 'Get',
#    'done' : 'true'
#}

#json_str = json.dumps(data, skipkeys=True, sort_keys=True)

class ServerHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, address, port):
        self.healthcheck = Healthcheck()
        self.address = address
        self.port = port

    def createResponse(self, command):
        """ Send command string back as confirmation """
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(command)
        self.wfile.close()

    def do_POST(self):
        """ Process command from POST and output to STDOUT """
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST'})
        command = form.getvalue('command')
        stdout.write('%s\n' % command)
        self.createResponse('Success: %s' % command)
        stdout.flush()

    def do_GET(self):
        if re.search('/healthcheck', self.path) != None:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            #execute('the healthcheck.py')
            #test_output.test_print('http://localhost', PORT)
            #returning a json rfile(Get_result)
            #self.wfile.write(bytes(json_str, 'utf-8'))

            if()


handler = ServerHandler("localhost", 5001)
httpd = socketserver.TCPServer(('', handler.port), handler)
#stdout.write('serving at port %s\n' % PORT)
stdout.flush()
httpd.serve_forever()
