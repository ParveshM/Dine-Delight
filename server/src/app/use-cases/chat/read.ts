import { Types } from "mongoose";
import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const getChats = async (
  userID: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  return await chatRepository.getAllChats({ user: userID });
};
