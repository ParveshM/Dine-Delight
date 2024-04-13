import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../redux/store/Store";
import axios from "axios";
import { CHAT_API, SERVER_URL } from "../constants";
import { ChatInterface, MessageInterface } from "../types/ChatInterface";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "react-router-dom";

export default function useChats() {
  const user = useAppSelector((state) => state.UserSlice);
  const [showChatsidebar, setShowChatSidebar] = useState<boolean>(true);
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<MessageInterface | null>(
    null
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [params] = useSearchParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    const socketInstance = io(SERVER_URL); //Initialize socket connection on component load
    socket.current = socketInstance;
    socketInstance.on("connect", () => {
      console.log("Connected to server💬");
    });
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // get the chats by user and restaurant , load the data when user coming from other pages instead of chat page
    const conversationId = params.get("conversation");
    conversationId &&
      axios
        .get(CHAT_API + `/conversation/${conversationId}`)
        .then(({ data }) => setCurrentChat(data))
        .catch((error) => console.log(error));
  }, [params]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    setArrivalMessage(null);
  }, [arrivalMessage, currentChat]);

  const recieverId = useMemo(() => {
    return currentChat?.members.find((member) => member !== user.id);
  }, [currentChat]);

  useEffect(() => {
    // emit and take events from server
    if (socket) {
      socket.current?.emit("addUser", user.id);
      socket.current?.on("getUsers", (users) => {
        // console.log(users);
      });
      socket.current?.on("getMessage", (data) => {
        setIsTyping(false);
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date(),
        });
      });
      socket.current?.on("senderTyping", (isTyping) => {
        isTyping ? setIsTyping(true) : setIsTyping(false);
      });
    }
  }, []);

  // get chat done by user
  useEffect(() => {
    user.id &&
      axios
        .get(CHAT_API + `/conversations/${user.id}`)
        .then(({ data }) => setChats(data))
        .catch((error) => console.log(error));
  }, []);

  // get messages in a chat by user with chat id
  useEffect(() => {
    currentChat?._id &&
      axios
        .get(CHAT_API + `/messages/${currentChat?._id}`)
        .then(({ data }) => setMessages(data))
        .catch((error) => console.log(error));
    setError(null);
    setIsTyping(false);
    setNewMessage("");
  }, [currentChat]);

  // scroll to the bottom when the messages are verflowing
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const delay = setTimeout(() => {
      newMessage.length ? emitTypingStatus(true) : emitTypingStatus(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [newMessage]);

  const emitTypingStatus = (isTyping: boolean) => {
    socket.current?.emit("typing", {
      recieverId,
      isTyping,
    });
  };

  const handleCurrentChatClick = (chat: ChatInterface) => {
    setCurrentChat(chat);
    setShowChatSidebar(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (!value.trim().length) {
      setError("Please enter a message");
    } else {
      setError(null);
    }
    setNewMessage(value);
  };

  const handleTypingStatus = (action: "focus" | "blur") => {
    console.log("action", action);
    action === "focus" ? emitTypingStatus(true) : emitTypingStatus(false);
  };
  // handle newMessage submit in input
  const handleSumbit = () => {
    if (!newMessage.trim().length) {
      emitTypingStatus(false);
      return setError("Please enter a message");
    } else {
      setError(null);
    }
    emitTypingStatus(false);

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
    error,
    messages,
    isTyping,
    scrollRef,
    newMessage,
    currentChat,
    handleChange,
    handleSumbit,
    setNewMessage,
    setCurrentChat,
    arrivalMessage,
    showChatsidebar,
    setShowChatSidebar,
    handleTypingStatus,
    handleCurrentChatClick,
  };
}
