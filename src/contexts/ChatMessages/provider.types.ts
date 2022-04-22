export interface IMessage {
  isMyMessage: boolean;
  message: string;
}

export interface IMessages {
  [key: string]: IMessage[];
}

export interface IMessagesContext {
  messages: IMessages | undefined;
  addChat: (data: IMessage[], botId: string) => void;
}
