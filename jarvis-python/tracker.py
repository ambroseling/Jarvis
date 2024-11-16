import asyncio
import websockets
import json
import torch 
import inspect
import ast
from typing import Optional


class TensorTracker:
    def __init__(self,mode:str=""):
        self.start_frame = None

    def start(self):
        self.start_frame = inspect.currentframe().f_back
        self.start_locals = dict(self.start_frame.f_locals)
        code_obj = inspect.currentframe().f_back.f_code
        src_lines, _ = inspect.getsourcelines(self.start_frame.f_globals[code_obj.co_name])
        for l in src_lines:
            if l.strip():
                print(l.strip())

    def stop(self):
        
        assert self.start_frame is not None, "ERROR - Did not start tracker."
        
        end_frame = dict(inspect.currentframe().f_back.f_locals)       

        if self.start_locals:

            new_vars = {k: end_frame[k] for k in end_frame if k not in self.start_locals}
        
    def render(self):
        