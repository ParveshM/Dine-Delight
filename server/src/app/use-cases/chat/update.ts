import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const updateUnreadMessages = async (
  conversationID: string,
  recieverID: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) =>
  await chatRepository.updateMessages(
    { conversationId: conversationID, senderId: recieverID },
    { isRead: true }
  );
