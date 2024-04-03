import { Types } from "mongoose";
import Chat from "../models/chat";

export const chatRepositoryMongodb = () => {
  const isChatExists = async (filter: Record<string, any>) =>
    await Chat.find(filter).populate(["user", "restaurant", "latestMessage"]);

  const addNewChat = async (newChatData: Record<string, any>) =>
    await Chat.create(newChatData);

  const allChats = async (filter: Record<string, any>) =>
    await Chat.find(filter)
      .populate(["user", "restaurant", "latestMessage"])
      .sort({ createAt: -1 });

  return { addNewChat, allChats, isChatExists };
};

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;
