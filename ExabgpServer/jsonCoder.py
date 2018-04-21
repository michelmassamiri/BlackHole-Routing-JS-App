'''
JsonCoder is used to encode/decode JSON string formatedself.
The class specializes The Json encoder/decoder methodology, and it is used essentially in the ExaBGP server class.

The Json file MUST be formated this way :
{
"command":"command-name",
 "arg1":"your 1st argument",
 "arg2": "your 2nd arg",
 "arg3": "your 3nd arg",
 ....
 "argn": ...
}
'''

import json
class JsonCoder:

    def __init__(self):
        self.json_object = None
        self.json_str = None
        
    def jsonToStr(self, json_object):
        '''
        Decode a JSON respecting the form {command : "command-name", arg1 : "arg1",...}
        to an ExaBGP Input command.
        Initialise the json_object attribut
        json_object(str): The JSON format of the ExaBGP command
        returns(str): The ExaBGP command, in order to send it to the ExaBGP STDIN.
        '''
        self.json_object = json_object
        #check if json_object is valid(with a command and arg1,arg2,..argn) so we can decode it and send it to ExaBGP.
        data = json.loads(self.json_object)
        try:
            self.json_str = data["command"]
        except KeyError as e:
            raise
        for i in range(1, len(data)):
            try:
                self.json_str += ' ' + data["arg"+str(i)]
            except KeyError as e:
                raise
        return self.json_str
