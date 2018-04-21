#!/usr/bin/python3

import unittest
import os
import sys
from io import StringIO

from sys import stdout

from exabgp_pipe import ExaPipe


class ExaPipeTest(unittest.TestCase):

    def setUp(self):
        self.res = "c'est un test que dis je done\n"
        path_out = "test_out.fifo"
        path_in = "test_in.fifo"
        self.pipe_in = path_in
        self.pipe_out = path_out
        try: os.mkfifo(self.pipe_in)
        except OSError: pass
        try: os.mkfifo(self.pipe_out)
        except OSError: pass
        self.pipe = ExaPipe(self.pipe_in, self.pipe_in)
        self.pipe2 = ExaPipe(self.pipe_out, self.pipe_in)
        
    def testWriteToInput(self):
        pid = os.fork()
        if pid != 0:
            ret_val = self.pipe.writeToInput(self.res)
            self.assertEqual(ret_val, 0)
        else:
            test = open(self.pipe.input_pipe_path, "r")
            str_pipe_in = StringIO()
            done = False
            while not done:
                try:
                    for line in test:
                        str_pipe_in.write(line)
                        if('done' in str_pipe_in.getvalue() or 'error' in str_pipe_in.getvalue()):
                            done = True
                            break
                        select.select([str_pipe_in],[],[],0.01)
                except OSError as exc:
                    if exc.errno in error.block:
                        break
                except IOError as exc:
                    if exc.errno in error.block:
                        break
                ret_str = str_pipe_in.getvalue()
                str_pipe_in.close()
                self.assertEqual(self.res,ret_str)
                os._exit(0)
        os.waitpid(pid,0)        

        

    
    def testReadFromOutput(self):
        pid = os.fork()
        if pid != 0:
            ret_str = self.pipe.readFromOutPut()
            self.assertEqual(ret_str, self.res)
        else:
            ret_val = self.pipe.writeToInput(self.res)
            self.assertEqual(ret_val, 0)
            os._exit(0)
        os.waitpid(pid,0)
        
        
    def tearDown(self):
        os.remove(self.pipe_in)
        os.remove(self.pipe_out)
    

if __name__ == '__main__':
    unittest.main()

