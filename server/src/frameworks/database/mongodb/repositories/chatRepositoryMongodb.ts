import { newMessageInterface } from "../../../../types/chat";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export const chatRepositoryMongodb = () => {
  const isChatExists = async (filter: Record<string, any>) =>
    await Conversation.find(filter).populate([
      "user",
      "restaurant",
      "latestMessage",
    ]);

  const addNewChat = async (members: string[]) => {
    return await Conversation.create({ members });
  };

  const getChatsByMembers = async (id: string) =>
    await Conversation.find({ members: { $in: [id] } });

  const addNewMessage = async (newMessageData: newMessageInterface) =>
    await Message.create(newMessageData);

  const messages = async (conversationId: string) =>
    await Message.find({ conversationId });

  return {
    addNewChat,
    getChatsByMembers,
    isChatExists,
    addNewMessage,
    messages,
  };
};

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;
