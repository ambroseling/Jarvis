import asyncio
import torch
import websockets
import pickle  # For serialization

# Function to create a tensor (example)
def create_tensor():
    return torch.rand(3, 3)  # A 3x3 random tensor

# WebSocket handler
async def send_tensor(websocket, path):
    while True:
        # Create a tensor
        tensor = create_tensor()

        # Serialize the tensor using pickle
        serialized_tensor = pickle.dumps(tensor)

        # Send the serialized tensor to the client
        await websocket.send(serialized_tensor)

        # Wait before sending the next tensor
        await asyncio.sleep(1)  # Adjust as needed

# Start WebSocket server
start_server = websockets.serve(send_tensor, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
