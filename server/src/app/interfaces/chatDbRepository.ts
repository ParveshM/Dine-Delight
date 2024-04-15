import { ChatRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { newMessageInterface } from "../../types/chat";

export default function chatDbRepository(
  repository: ReturnType<ChatRepositoryMongodbType>
) {
  const isChatExists = async (senderId: string, recieverId: string) =>
    repository.isChatExists(senderId, recieverId);

  const getConversationById = async (id: string) =>
    repository.getConversationById(id);

  const createNewChat = async (members: string[]) =>
    await repository.addNewChat(members);

  const getAllConversations = async (id: string) =>
    await repository.getChatsByMembers(id);

  const addNewMessage = async (newMessageData: newMessageInterface) =>
    await repository.addNewMessage(newMessageData);

  const getLatestMessage = async (filter: Record<string, any>) =>
    await repository.messages(filter);

  const getPaginatedMessage = async (
    filter: Record<string, any>,
    pagination: { skip: number; limit: number }
  ) => await repository.paginatedMessages(filter, pagination);

  const updateMessages = async (
    filter: Record<string, any>,
    updateData: Record<string, any>
  ) => await repository.updateMessages(filter, updateData);

  return {
    createNewChat,
    addNewMessage,
    isChatExists,
    getConversationById,
    getAllConversations,
    getLatestMessage,
    updateMessages,
    getPaginatedMessage,
  };
}

export type ChatDbRepositoryInterace = typeof chatDbRepository;
