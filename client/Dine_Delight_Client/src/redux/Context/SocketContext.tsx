import { ReactNode, useContext, createContext } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../../constants";

const SocketContext = createContext<Socket | null>(null);
SocketContext.displayName = "Socket Context";

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socket = io(SERVER_URL);
  socket.on("connect", () => console.log("connected"));
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
