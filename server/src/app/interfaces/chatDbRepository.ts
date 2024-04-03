import { Types } from "mongoose";
import { ChatRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/chatRepositoryMongodb";

export default function chatDbRepository(
  repository: ReturnType<ChatRepositoryMongodbType>
) {
  const isChatExists = async (filter: Record<string, any>) =>
    repository.isChatExists(filter);

  const createNewChat = async (newChatData: Record<string, any>) =>
    await repository.addNewChat(newChatData);
  const getAllChats = async (filter: Record<string, any>) =>
    await repository.allChats(filter);
  return {
    createNewChat,
    getAllChats,
    isChatExists,
  };
}

export type ChatDbRepositoryInterace = typeof chatDbRepository;
