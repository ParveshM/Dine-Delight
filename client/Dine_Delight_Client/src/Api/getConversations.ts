import axios from "axios";
import { CHAT_API } from "../constants";

export default async function getConversations(
  conversationId: string,
  recieverId: string,
  senderId?: string
) {
  try {
    const { data } = await axios.get(
      CHAT_API + `/conversation/${conversationId}`,
      {
        params: {
          recieverId,
          senderId,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
