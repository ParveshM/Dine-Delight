export interface ChatInterface {
  _id: string;
  members: string[];
  createdAt: Date;
}
export interface MessageInterface {
  _id?: string;
  conversationId?: string;
  senderId: string;
  text: string;
  isRead?: boolean;
  createdAt: Date;
  own?: boolean;
  isTyping?: boolean;
}
