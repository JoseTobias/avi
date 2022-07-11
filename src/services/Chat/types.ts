export interface IChat {
  id: string;
  bot: {
    id: string;
    nick: string;
  };
  userId: string;
}

export interface GetMessageProps {
  chatId: string;
  userId: string;
}

export interface IMessage {
  id: string;
  botId: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  data: string;
}

export interface IMessageReturn {
  isMyMessage: boolean;
  message: string;
}

export interface IMessageSend {
  chatId: string;
  data: string;
}
