import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../constants";

const SocketContext = createContext<Socket | null>(null);
SocketContext.displayName = "Socket Context";

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SERVER_URL); // Initialize socket connection on component load
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      console.log("connected");
    });
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
