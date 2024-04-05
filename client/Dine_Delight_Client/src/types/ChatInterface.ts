export interface ChatInterface {
  _id: string;
  members: string[];
  createdAt: Date;
}
export interface MessageInterface {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  own?: boolean;
}
