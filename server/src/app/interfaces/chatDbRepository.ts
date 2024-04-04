import { Types } from "mongoose";
import { ChatRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { newMessageInterface } from "../../types/chat";

export default function chatDbRepository(
  repository: ReturnType<ChatRepositoryMongodbType>
) {
  const isChatExists = async (filter: Record<string, any>) =>
    repository.isChatExists(filter);

  const createNewChat = async (members: string[]) =>
    await repository.addNewChat(members);

  const getAllConversations = async (id: string) =>
    await repository.getChatsByMembers(id);

  const addNewMessage = async (newMessageData: newMessageInterface) =>
    await repository.addNewMessage(newMessageData);

  const getAllmessagesByconversationId = async (conversationId: string) =>
    await repository.messages(conversationId);

  return {
    createNewChat,
    getAllConversations,
    addNewMessage,
    getAllmessagesByconversationId,
    isChatExists,
  };
}

export type ChatDbRepositoryInterace = typeof chatDbRepository;
