import { newMessageInterface } from "../../../../types/chat";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export const chatRepositoryMongodb = () => {
  const isChatExists = async (senderId: string, recieverId: string) =>
    await Conversation.findOne({ members: { $all: [senderId, recieverId] } });

  const getConversationById = async (id: string) =>
    await Conversation.findById(id);

  const addNewChat = async (members: string[]) => {
    return await Conversation.create({ members });
  };

  const getChatsByMembers = async (id: string) =>
    await Conversation.find({ members: { $in: [id] } });

  const addNewMessage = async (newMessageData: newMessageInterface) =>
    await Message.create(newMessageData);

  const messages = async (filter: Record<string, any>) =>
    await Message.find(filter);

  const updateMessages = async (
    filter: Record<string, any>,
    updateData: Record<string, any>
  ) => await Message.updateMany(filter, updateData);

  return {
    addNewChat,
    getChatsByMembers,
    getConversationById,
    isChatExists,
    addNewMessage,
    messages,
    updateMessages,
  };
};

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;
