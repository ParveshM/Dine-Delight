import { ChatDbRepositoryInterace } from "../../interfaces/chatDbRepository";

export const addNewChat = async (
  userID: string,
  restaurantID: string,
  chatRepository: ReturnType<ChatDbRepositoryInterace>
) => {
  const isChat = await chatRepository.isChatExists({
    user: userID,
    restaurant: restaurantID,
  });

  if (isChat.length > 0) {
    return isChat[0];
  } else {
    const createdChat = await chatRepository.createNewChat({
      user: userID,
      restaurant: restaurantID,
    });
    return await chatRepository.getAllChats(createdChat._id);
  }

  return;
};
