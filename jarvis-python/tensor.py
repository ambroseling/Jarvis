from tracker import TensorTracker
import torch

def test_function():
    tracker = TensorTracker()
    tracker.start()
    x = torch.randn(10)
    y = torch.randn(10)
    z = x + y 
    tracker.stop()

if __name__ == "__main__":
    test_function()