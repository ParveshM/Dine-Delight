import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const getChats = async (
  senderId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => await chatRepository.getAllConversations(senderId);

export const getChatById = async (
  id: string,
  userId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  await chatRepository.updateMessages(
    { conversationId: id, senderId: { $ne: userId } },
    { isRead: true }
  );
  return await chatRepository.getConversationById(id);
};

export const getMessages = async (
  memberId: string,
  skip: number,
  limit: number,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) =>
  await chatRepository.getPaginatedMessage(
    {
      conversationId: memberId,
    },
    { skip, limit }
  );

export const getLatestMessages = async (
  conversationID: string,
  recieverId: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) =>
  await chatRepository.getLatestMessage({
    conversationId: conversationID,
    senderId: recieverId,
    isRead: false,
  });
