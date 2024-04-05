import { Types } from "mongoose";
import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const getChats = async (
  userID: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  return await chatRepository.getAllConversations(userID);
};

export const getMessages = async (
  memberId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => await chatRepository.getMessagesByConversationId(memberId);
