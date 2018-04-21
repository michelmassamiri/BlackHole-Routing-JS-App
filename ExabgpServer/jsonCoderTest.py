#!/usr/bin/python3

import unittest
import json
from jsonCoder import JsonCoder

'''
Test module for the class JsonCoder
'''

class JsonCoderTest(unittest.TestCase):
    
    def setUp(self):
         self.eq_json = json.dumps({"command" : "ceci", "arg1" : "est", "arg2" : "un" , "arg3" : "test"}, separators = (',',':'))
         self.neq_json = json.dumps({"command" : "ceci", "arg1" : "n'est", "arg2" : "pas un" , "arg3" : "test"}, separators = (',',':'))
         self.unvalid_json = json.dumps({"ccommand" : "ceci", "arg5" : "est", "ar" : "un" , "arg3" : "test"}, separators = (',',':'))
         self.res_str = "ceci est un test"

         
    def testJsonToStr(self):
        a = JsonCoder()
        #is equal ?
        a.jsonToStr(self.eq_json)
        self.assertEqual(a.json_str, self.res_str)
        #is unequal ?
        a.jsonToStr(self.neq_json)
        self.assertNotEqual(a.json_str, self.res_str)
        #does the json is well formatted?
        self.assertRaises(KeyError,a.jsonToStr,self.unvalid_json)

if __name__ == '__main__':
    unittest.main()
