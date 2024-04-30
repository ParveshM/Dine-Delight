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
    console.log(`user connected with id ${socket.id} 😃`);

    socket.on("addUser", (userId) => {
      // take userid and socketId from user
      addUsers(userId, socket.id);
      io.emit(
        "getUsers",
        users.map((user) => user.userId)
      );
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, recieverId, text, chatId }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId ?? "").emit("getMessage", { senderId, text });
      io.to(user?.socketId ?? "").emit("notification", {
        count: 1,
        senderId,
        chatId,
        text,
      });
    });

    socket.on("update_message_status", ({ status, recieverId }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId ?? "").emit("get_message_status", {
        status,
        recieverId,
      });
    });

    // when user is typing
    socket.on("typing", ({ recieverId, isTyping }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId ?? "").emit("senderTyping", isTyping);
    });

    // new Food order
    socket.on("newOrder", ({ recieverId, order }) => {
      const user = getUser(recieverId);
      console.log(recieverId, order, "user", users);

      io.to(user?.socketId ?? "").emit("get_newOrder", order);
    });
    // update order
    socket.on("update_order", ({ recieverId, order }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId ?? "").emit("notify_updatedOrder", order);
    });

    // when disconnection
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("A user has been disconnected 😒");
      io.emit(
        "getUsers",
        users.map((user) => user.userId)
      );
    });
  });
};

export default socketConfig;
