import { useEffect, useState } from "react";
import { CHAT_API, USER_API } from "../../constants";
import { ChatInterface, MessageInterface } from "../../types/ChatInterface";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import axios from "axios";
import { UserInterface } from "../../types/UserInterface";
import { useAppSelector } from "../../redux/store/Store";
import { dummyUserImg } from "../../assets/images";
import { useSocket } from "../../pages/contextProvider";
interface ConversationProps extends ChatInterface {
  userId: string;
  currentChat: ChatInterface | null;
  onlineUsers: string[];
}
const Conversation: React.FC<ConversationProps> = ({
  members,
  userId,
  _id: conversationId,
  currentChat,
  onlineUsers,
}) => {
  const { role, id } = useAppSelector((state) => state.UserSlice);
  const [restaurant, setRestaurant] = useState<RestaurantInterface | null>(
    null
  );
  const [userinfo, setUserInfo] = useState<UserInterface | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessageCount, setNewMessageCount] = useState<number>(0);
  const socket = useSocket();
  const [isActive, setIsActive] = useState<boolean>(false);
  const isChatOpen = currentChat && currentChat._id === conversationId;

  useEffect(() => {
    socket?.on("notification", ({ count, senderId, chatId }) => {
      if (!isChatOpen || chatId !== conversationId) {
        if (members.includes(senderId)) {
          setNewMessageCount((prev) => prev + count);
        }
      }
    });
  }, []);

  useEffect(() => {
    const activeUser = onlineUsers.some((user) => {
      return members.filter((memberId) => memberId !== id).includes(user);
    });
    setIsActive(activeUser);
  }, [onlineUsers]);

  useEffect(() => {
    const recieverId = members.find((member) => member !== userId);
    const URI: string = role === "user" ? "/restaurants" : "/users";

    const userRequest = axios.get(USER_API + `${URI}/${recieverId}`);
    const chatRequest = axios.get(CHAT_API + `/messages/${conversationId}`, {
      params: {
        unReadMessages: true,
        recieverId,
      },
    });
    Promise.all([userRequest, chatRequest])
      .then((responses) => {
        const [userData, chatData] = responses;
        const { user, restaurant } = userData.data;
        role === "user" ? setRestaurant(restaurant) : setUserInfo(user);

        setMessages(chatData.data.messages);
        setNewMessageCount(chatData.data.latestMessages.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  return (
    <div className="flex items-center p-2 gap-2 mt-2 hover:bg-gray-200 hover:cursor-pointer rounded-md transition ease-in-out">
      <img
        src={
          role === "user"
            ? restaurant?.primaryImage ?? dummyUserImg
            : userinfo?.profilePicture ?? dummyUserImg
        }
        alt="User image"
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="relative h-10 w-10  border border-white">
        <img
          src={
            role === "user"
              ? restaurant?.primaryImage ?? dummyUserImg
              : userinfo?.profilePicture ?? dummyUserImg
          }
          alt="User image"
          className=" w-full rounded-full object-fit"
        />
        <div
          className={`absolute top-0 right-1 ${
            isActive ? "bg-green-500" : "bg-gray-500"
          }  h-3 w-3 rounded-full`}
        ></div>
      </div>
      <div className="flex flex-col items-start ml-2">
        <span className="font-semibold">
          {role === "user"
            ? restaurant?.restaurantName ?? "Unnamed"
            : userinfo?.name ?? "Unnamed"}
        </span>
        <div className="flex items-center gap-2">
          {newMessageCount > 0 && (
            <span className="text-sm font-medium text-gray-600">
              {newMessageCount === 1
                ? "You have a new message"
                : `${newMessageCount} new messages`}
            </span>
          )}
          {newMessageCount > 0 && (
            <span className="bg-red-400 rounded-full h-2 w-2"></span>
          )}
        </div>
        <div className="w-44">
          {newMessageCount === 0 && (
            <p className="font-medium text-sm text-gray-500 break-words">
              {messages.at(-1)?.text ?? "No recent messages"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
