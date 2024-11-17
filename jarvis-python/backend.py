import torch
import mmap
import numpy as np
import os

# Example: Create a tensor on CPU
tensor = torch.rand((3, 3))

# Convert tensor to NumPy array
tensor_np = tensor.numpy()

# Convert NumPy array to bytes (to store in memory-mapped file)
tensor_bytes = tensor_np.tobytes()

# Define a memory-mapped file path
filename = 'tensor_mmap.dat'

# Create the memory-mapped file with the required size (size of tensor_bytes)
with open(filename, 'wb') as f:
    f.write(tensor_bytes)

# Memory-map the file (readonly access in this example)
mmap_obj = mmap.mmap(os.open(filename, os.O_RDWR), len(tensor_bytes))

# Now `mmap_obj` contains the tensor data and can be accessed by other processes
