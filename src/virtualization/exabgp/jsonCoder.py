'''
JsonCoder is used to encode/decode JSON string formatedself.
The class specializes The Json encoder/decoder methodology, and it is used essentially in the ExaBGP server class.

The JSON must be formated in this way :
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

    def string_to_json(self,str):
        '''
        Prend une chaine de caractere en argument
        '''

        #1.ouvre le fichier en lecture

        #2.pour tout i dans nb de mot inserer mot dans un string de format json

        #3. ouvrir un fichier json en écriture puis json.dump


    def json_to_str(self, json_object):
        '''
        Decode a JSON respecting the form {command : "command-name", arg1 : "arg1",...}
        to an ExaBGP Input command.
        Initialise the json_object attribut
        json_object(str): The JSON format of the ExaBGP command
        returns(str): The ExaBGP command, in order to send it to the ExaBGP STDIN.
        '''
        self.json_object = json_object
        #check if json_object is valid(with a comand and arg1,arg2,..argn) so we can decode it and send it to ExaBGP.
        data = json.loads(self.json_object)
        json_str_len = len(data)

        self.json_str = data["command"]
        for i in range(1, json_str_len):
            self.json_str += ' ' + data["arg"+str(i)]

        return self.json_str
