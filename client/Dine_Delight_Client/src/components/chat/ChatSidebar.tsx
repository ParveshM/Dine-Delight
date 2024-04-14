import { PanelRightOpen } from "lucide-react";
import { useAppSelector } from "../../redux/store/Store";
import { ChatInterface } from "../../types/ChatInterface";
import Conversation from "./Conversation";
import { memo } from "react";
interface ChatSidebarProps {
  chats: ChatInterface[];
  showChatsidebar: boolean;
  setShowChatSidebar: (isOpen: boolean) => void;
  handleCurrentChatClick: (chat: ChatInterface) => void;
  currentChat: ChatInterface | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  currentChat,
  showChatsidebar,
  setShowChatSidebar,
  handleCurrentChatClick,
}) => {
  const user = useAppSelector((state) => state.UserSlice);
  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-2 z-20 left-0 w-[275px] h-screen pt-20 shadow-md  transition-transform ${
          showChatsidebar
            ? "translate-x-0"
            : "sm:-translate-x-0 -translate-x-full"
        } sm:translate-x-0 bg-gray-50 border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-xl font-semibold">Restaurants</h2>
          <PanelRightOpen
            className="md:hidden focus:outline-none cursor-pointer"
            onClick={() => setShowChatSidebar(false)}
          />
        </div>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {chats.map((chat) => (
              <li onClick={() => handleCurrentChatClick(chat)} key={chat._id}>
                <Conversation
                  {...chat}
                  userId={user?.id ?? ""}
                  currentChat={currentChat}
                />
                {chats.length > 1 && <hr className="mt-2" />}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default memo(ChatSidebar);
