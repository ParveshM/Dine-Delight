import { Server } from "socket.io";
interface SocketUserInterface {
  userId: string;
  socketId: string;
}
const socketConfig = (io: Server) => {
  let users: SocketUserInterface[] = [];

  function addUsers(userId: string, socketId: string) {
    const isUserPresent = users.some((user) => user.userId === userId);
    if (!isUserPresent) return users.push({ userId, socketId });
  }

  function removeUser(socketId: string) {
    return (users = users.filter((user) => user.socketId !== socketId));
  }

  function getUser(userId: string) {
    return users.find((user) => user.userId === userId);
  }

  io.on("connection", (socket) => {
    // when connection established
    console.log(`user connected with id ${socket.id}`);

    socket.on("addUser", (userId) => {
      // take userid and socketId from user
      addUsers(userId, socket.id);
      io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId ?? "").emit("getMessage", { senderId, text });
    });

    // when disconnection
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("A user has been disconnected");
      io.emit("getUsers", users);
    });
  });
};

export default socketConfig;
