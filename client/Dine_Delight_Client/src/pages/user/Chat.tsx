import { useEffect, useRef } from "react";
import ChatOnline from "../../components/chat/ChatOnline";
import Conversation from "../../components/chat/Conversation";
import Message from "../../components/chat/Message";
import Navbar from "../../components/user/Header/Navbar";
import useChats from "../../hooks/useChats";
import ChatSidebar from "../../components/chat/ChatSidebar";
import { ChevronLeft, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const {
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
    setCurrentChat,
    arrivalMessage,
    showChatsidebar,
    setShowChatSidebar,
    handleCurrentChatClick,
  } = useChats();
  const navigate = useNavigate();

  return (
    <>
      {user.role === "user" && <Navbar />}
      <div
        className={`flex ${
          user.role === "user" && "mt-[70px]"
        }  p-6 custom-vh border shadow-md rounded-md `}
      >
        {/* Chat Menu */}
        {user.role === "user" ? (
          <ChatSidebar
            chats={chats}
            showChatsidebar={showChatsidebar}
            setShowChatSidebar={setShowChatSidebar}
            handleCurrentChatClick={handleCurrentChatClick}
          />
        ) : (
          <div className="md:w-1/4   border rounded-md h-[33rem] ">
            <h1 className="text-center font-semibold text-lg">Users</h1>
            <hr className="mt-2" />
            {chats.map((chat, index) => (
              <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                <Conversation {...chat} userId={user?.id} />
                {chats.length > 1 && index !== chats.length - 1 && (
                  <hr className="mt-2" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Chat Box */}
        <div
          className={`relative flex-1 my-3  ${
            user.role === "user" ? " md:ml-64" : "ml-2"
          }`}
        >
          {!showChatsidebar && (
            <PanelRightClose
              className="md:hidden mr-4 focus:outline-none cursor-pointer"
              onClick={() => setShowChatSidebar(true)}
            />
          )}
          {currentChat ? (
            <>
              <div
                className="absolute z-10 mt-[-30px] left-0 right-0  py-4 px-6 bg-slate-300 rounded-md
                  dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between  items-center ">
                  {!showChatsidebar ? (
                    <PanelRightClose
                      className="md:hidden mr-4 focus:outline-none cursor-pointer"
                      onClick={() => setShowChatSidebar(true)}
                    />
                  ) : (
                    <PanelRightOpen
                      className="md:hidden mr-4 focus:outline-none cursor-pointer"
                      onClick={() => setShowChatSidebar(false)}
                    />
                  )}
                  <ChevronLeft
                    className="hidden md:block cursor-pointer"
                    onClick={() => navigate(-1)}
                  />

                  <h2 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200">
                    {user.name}
                  </h2>
                  <X onClick={() => setCurrentChat(null)} />
                </div>
              </div>

              <div className="flex justify-between h-full flex-col-reverse">
                <div className="relative pr-4 mt-10 mb-20 overflow-y-auto ">
                  {messages.length ? (
                    messages.map((message, index) => (
                      <div key={message._id ?? index} ref={scrollRef}>
                        <Message
                          {...message}
                          own={message.senderId === user.id}
                        />
                        {isTyping &&
                          index === messages.length - 1 &&
                          !arrivalMessage && (
                            <Message
                              {...message}
                              own={false}
                              isTyping={
                                isTyping && index === messages.length - 1
                              }
                            />
                          )}
                      </div>
                    ))
                  ) : (
                    <h1 className="absolute top-[30%] text-xl text-gray-400 cursor-default">
                      No messages yet
                    </h1>
                  )}
                </div>
                <div className="absolute  right-0 left-0 flex items-center mb-[-35px] py-6  px-4 bg-gray-50 rounded-lg dark:bg-gray-700 ">
                  <div className="flex flex-col w-full gap-2 mx-4 ">
                    <div className="flex">
                      <textarea
                        name="message"
                        onChange={handleChange}
                        value={newMessage}
                        rows={1}
                        className={`p-2.5 ${
                          error ? "border-red-500" : "border-gray-300"
                        } focus:outline-none w-full text-sm text-gray-900 bg-white rounded-lg border ${
                          error
                            ? "focus:border-red-500"
                            : "focus:border-blue-500"
                        } focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none`}
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
                    {error && <p className="ml-4 text-red-500 ">{error}</p>}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute top-[30%] text-center w-full">
              <h1 className="text-4xl text-gray-400 cursor-default mb-4">
                Start a Conversation!
              </h1>
              <p className="text-lg text-gray-600">
                Click on a conversation to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
