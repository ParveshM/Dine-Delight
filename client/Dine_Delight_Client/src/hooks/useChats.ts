import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../redux/store/Store";
import axios from "axios";
import { CHAT_API } from "../constants";
import { ChatInterface, MessageInterface } from "../types/ChatInterface";
import getConversations from "../Api/getConversations";
import { useSocket } from "../redux/Context/SocketContext";
import { useSearchParams } from "react-router-dom";

export default function useChats() {
  const user = useAppSelector((state) => state.UserSlice);
  const [showChatsidebar, setShowChatSidebar] = useState<boolean>(true);
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<MessageInterface | null>(
    null
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [params] = useSearchParams();
  const topRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();

  const observer = useRef<IntersectionObserver>();
  const firstChat = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isScrollingUp && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore, isScrollingUp]
  );

  const recieverId = useMemo(() => {
    return currentChat?.members.find((member) => member !== user.id);
  }, [currentChat]);

  useEffect(() => {
    // get the chats by user and restaurant , load the data when user coming from other pages instead of chat page
    async function getChats() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const conversation = urlSearchParams.get("conversation");

      if (conversation) {
        const data = await getConversations(
          conversation ?? "",
          recieverId ?? "",
          user.id ?? ""
        );
        setCurrentChat(data);
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.delete("conversation");
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
    getChats();
  }, [params]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    setArrivalMessage(null);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // emit and take events from server
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to socket");
      });
      socket?.emit("addUser", user.id);
      socket?.on("getUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
      socket?.on("getMessage", (data) => {
        setIsTyping(false);
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date(),
        });
      });

      socket?.on("senderTyping", (isTyping) => {
        isTyping ? setIsTyping(true) : setIsTyping(false);
      });
    }
  }, []);

  // get chat done by user
  useEffect(() => {
    user.id &&
      axios
        .get(CHAT_API + `/conversations/${user.id}`)
        .then(({ data }) => {
          setChats(data);
        })
        .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setPage(1);
    setIsScrollingUp(false);

    setMessages([]);
  }, [currentChat]);

  // get messages in a chat by user with chat id
  useEffect(() => {
    if (currentChat?._id) {
      page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
      axios
        .get(CHAT_API + `/messages/?conversationId=${currentChat?._id}`, {
          params: {
            page,
          },
        })
        .then(({ data }) => {
          setMessages((prev) => {
            if (prev && prev.length) {
              return [...data.messages.reverse(), ...prev];
            } else {
              return data.messages.reverse();
            }
          });

          setHasMore(data.messages.length > 0);
        })
        .catch((error) => console.log(error))
        .finally(() =>
          page === 1 ? setIsLoading(false) : setIsLoadingMore(false)
        );
    }
    setError(null);
    setIsTyping(false);
    setNewMessage("");
  }, [currentChat, page]);

  // scroll to the bottom when the messages are overflowing
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
    socket?.emit("typing", {
      recieverId,
      isTyping,
    });
  };

  const handleCurrentChatClick = async (chat: ChatInterface) => {
    setCurrentChat(chat);
    setShowChatSidebar(false);
    const reciever = chat.members.find((member) => member !== user.id);
    await getConversations(chat._id, reciever ?? ""); // updating the unread messages when a chat is opened
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

  const handleTypingStatus = (action: "focus" | "blur") =>
    action === "focus" ? emitTypingStatus(true) : emitTypingStatus(false);

  const handleSubmit = () => {
    if (!newMessage.trim().length) {
      emitTypingStatus(false);
      return setError("Please enter a message");
    } else {
      setError(null);
    }
    emitTypingStatus(false);

    socket?.emit("sendMessage", {
      senderId: user.id,
      recieverId,
      text: newMessage,
      chatId: currentChat?._id,
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

  const handleScroll = () => {
    const scrollTop = topRef.current?.scrollTop;
    scrollTop !== undefined && scrollTop <= 20
      ? setIsScrollingUp(true)
      : setIsScrollingUp(false);
  };

  return {
    user,
    chats,
    error,
    topRef,
    messages,
    isTyping,
    scrollRef,
    isLoading,
    newMessage,
    onlineUsers,
    currentChat,
    firstChat,
    handleChange,
    handleSubmit,
    handleScroll,
    setNewMessage,
    isLoadingMore,
    setCurrentChat,
    arrivalMessage,
    showChatsidebar,
    setShowChatSidebar,
    handleTypingStatus,
    handleCurrentChatClick,
  };
}
