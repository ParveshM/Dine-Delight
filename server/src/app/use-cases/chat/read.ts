import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const getChats = async (
  senderId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  return await chatRepository.getAllConversations(senderId);
};
export const getChatById = async (
  id: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  return await chatRepository.getConversationById(id);
};

export const getMessages = async (
  memberId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => await chatRepository.getMessagesByConversationId(memberId);
