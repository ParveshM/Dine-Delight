"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketConfig = (io) => {
    let users = [];
    function addUsers(userId, socketId) {
        const isUserPresent = users.some((user) => user.userId === userId);
        if (!isUserPresent)
            return users.push({ userId, socketId });
    }
    function removeUser(socketId) {
        return (users = users.filter((user) => user.socketId !== socketId));
    }
    function getUser(userId) {
        return users.find((user) => user.userId === userId);
    }
    io.on("connection", (socket) => {
        // when connection established
        console.log(`user connected with id ${socket.id} 😃`);
        socket.on("addUser", (userId) => {
            // take userid and socketId from user
            addUsers(userId, socket.id);
            io.emit("getUsers", users.map((user) => user.userId));
        });
        // send and get message
        socket.on("sendMessage", ({ senderId, recieverId, text, chatId }) => {
            var _a, _b;
            const user = getUser(recieverId);
            io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("getMessage", { senderId, text });
            io.to((_b = user === null || user === void 0 ? void 0 : user.socketId) !== null && _b !== void 0 ? _b : "").emit("notification", {
                count: 1,
                senderId,
                chatId,
                text,
            });
        });
        socket.on("update_message_status", ({ status, recieverId }) => {
            var _a;
            const user = getUser(recieverId);
            io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("get_message_status", {
                status,
                recieverId,
            });
        });
        // when user is typing
        socket.on("typing", ({ recieverId, isTyping }) => {
            var _a;
            const user = getUser(recieverId);
            io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("senderTyping", isTyping);
        });
        // new Food order
        socket.on("newOrder", ({ recieverId, order }) => {
            var _a;
            const user = getUser(recieverId);
            console.log(recieverId, order, "user", users);
            io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("get_newOrder", order);
        });
        // update order
        socket.on("update_order", ({ recieverId, order }) => {
            var _a;
            const user = getUser(recieverId);
            io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("notify_updatedOrder", order);
        });
        // when disconnection
        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("A user has been disconnected 😒");
            io.emit("getUsers", users.map((user) => user.userId));
        });
    });
};
exports.default = socketConfig;
