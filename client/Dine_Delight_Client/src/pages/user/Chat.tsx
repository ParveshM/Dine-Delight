import { useEffect, useState } from "react";
import ChatOnline from "../../components/chat/ChatOnline";
import Conversation from "../../components/chat/Conversation";
import Message from "../../components/chat/Message";
import Navbar from "../../components/user/Header/Navbar";
import { useAppSelector } from "../../redux/store/Store";
import axios from "axios";
import { CHAT_API } from "../../constants";
import { ChatInterface, MessageInterface } from "../../types/ChatInterface";
import { current } from "@reduxjs/toolkit";

const Chat: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatInterface | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [sendMessage, setSendMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(CHAT_API + `/conversations/${user.id}`)
      .then(({ data }) => setChats(data))
      .catch((error) => console.log(error));
  }, [user.id]);

  useEffect(() => {
    axios
      .get(CHAT_API + `/messages/${currentChat?._id}`)
      .then(({ data }) => setMessages(data))
      .catch((error) => console.log(error));
  }, [currentChat]);

  const handleSumbit = () => {
    axios
      .post(CHAT_API + `/messages`, {
        conversationId: currentChat?._id,
        senderId: user.id,
        text: sendMessage.trim(),
      })
      .then(({ data }) => {
        setMessages((prev) => [...prev, data]);
        setSendMessage("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <div className="flex mt-[70px] p-6 custom-vh">
        {/* Chat Menu */}
        <div className="w-1/4 p-2">
          <div>
            <input
              type="text"
              placeholder="Search here.."
              name="search"
              className="border-b border-black py-2 focus:outline-none"
            />
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation {...chat} userId={user?.id} key={chat._id} />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <div className="relative flex-1 ">
          {currentChat ? (
            <div className="flex flex-col justify-between h-full">
              <div className="relative pr-4 overflow-y-auto">
                {messages.length ? (
                  messages.map((message) => (
                    <Message
                      {...message}
                      own={message.senderId === user.id}
                      key={message._id}
                    />
                  ))
                ) : (
                  <h1 className="absolute top-[30%] text-xl text-gray-400 cursor-default">
                    No messages yet
                  </h1>
                )}
              </div>
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 ">
                <input
                  name="message"
                  onChange={(e) => setSendMessage(e.target.value)}
                  value={sendMessage}
                  type="text"
                  className="block mx-4 p-2.5 focus:outline-none w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                  placeholder="Your message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSumbit();
                  }}
                />
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 transition ease-out"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSumbit();
                  }}
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <h1 className="absolute  top-[30%] text-4xl text-gray-400 cursor-default">
              Open a conversation to chat.
            </h1>
          )}
        </div>

        {/* Active Users */}
        <div className="w-1/4 p-2">
          <div className="h-full">
            <ChatOnline />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
