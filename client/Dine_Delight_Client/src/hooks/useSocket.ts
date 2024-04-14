import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../constants";
let socketInstance: Socket | null;
export function useSocket() {
  const socket = useRef<Socket>();

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(SERVER_URL); //Initialize socket connection on component load
      socketInstance.on("connect", () => {
        console.log("connected");
      });
    }
    socket.current = socketInstance;
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);
  return socket.current;
}
