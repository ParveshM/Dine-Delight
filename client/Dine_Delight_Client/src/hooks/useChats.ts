import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/store/Store";
import axios from "axios";
import { CHAT_API, SERVER_URL } from "../constants";
import { ChatInterface, MessageInterface } from "../types/ChatInterface";
import { io, Socket } from "socket.io-client";

export default function useChats() {
  const user = useAppSelector((state) => state.UserSlice);
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<MessageInterface | null>(
    null
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    const socketInstance = io(SERVER_URL); //Initialize socket connection on component load
    socket.current = socketInstance;
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log(arrivalMessage);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // emit and take events from server
    if (socket) {
      socket.current?.emit("addUser", user.id);
      socket.current?.on("getUsers", (users) => {
        console.log(users);
      });
      socket.current?.on("getMessage", (data) => {
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date(),
        });
      });
    }
  }, []);

  // get chat done by user
  useEffect(() => {
    axios
      .get(CHAT_API + `/conversations/${user.id}`)
      .then(({ data }) => setChats(data))
      .catch((error) => console.log(error));
  }, [user.id]);

  // get messages in a chat by user with chat id
  useEffect(() => {
    currentChat?._id &&
      axios
        .get(CHAT_API + `/messages/${currentChat?._id}`)
        .then(({ data }) => setMessages(data))
        .catch((error) => console.log(error));
  }, [currentChat]);

  // scroll to the bottom when the messages are verflowing
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // handle newMessage submit in input
  const handleSumbit = () => {
    const recieverId = currentChat?.members.find(
      (member) => member !== user.id
    );

    socket.current?.emit("sendMessage", {
      senderId: user.id,
      recieverId,
      text: newMessage,
    });
    axios
      .post(CHAT_API + `/messages`, {
        conversationId: currentChat?._id,
        senderId: user.id,
        text: newMessage.trim(),
      })
      .then(({ data }) => {
        setMessages((prev) => [...prev, data]);
        setNewMessage("");
      })
      .catch((error) => console.log(error));
  };
  return {
    user,
    chats,
    currentChat,
    setCurrentChat,
    messages,
    newMessage,
    scrollRef,
    setNewMessage,
    handleSumbit,
  };
}
