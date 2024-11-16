import { useEffect, useRef } from 'react';

export const useWebSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:8765");
    socketRef.current.binaryType = "arraybuffer";

    socketRef.current.onmessage = (event) => {
      const buffer = event.data;
      const floatArray = new Float32Array(buffer);
      console.log("Received tensor:", floatArray);
    };

    socketRef.current.onopen = () => console.log("WebSocket connected");
    socketRef.current.onclose = () => console.log("WebSocket disconnected");

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return socketRef.current;
};