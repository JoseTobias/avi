import { BotApi } from "../../config";
import {
  IChat,
  IAuthResponseError,
  IMessage,
  GetMessageProps,
  IMessageReturn,
  IMessageSend
} from "../";

export class ChatService {
  async getChats(): Promise<IChat[] | undefined> {
    try {
      const chats = await BotApi.get<IChat[]>("/chats");

      return chats.data;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  async getMessages({
    chatId,
    userId,
  }: GetMessageProps): Promise<IMessageReturn[] | undefined> {
    try {
      const response = await BotApi.get<IMessage[]>("/messages", {
        params: { chatId },
      });
      const formatted: IMessageReturn[] = response.data.map((chat) => {
        return {
          isMyMessage: chat.senderId === userId,
          message: chat.data,
        };
      });

      return formatted;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  async addChat(botId: string): Promise<IChat | undefined> {
    try {
      const chats = await BotApi.post<IChat>("/chats", { botId });

      return chats.data;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  async sendMessage({chatId, data}: IMessageSend) {
    try {
      const chats = await BotApi.post("/messages", { chatId, data });

      return chats.data;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }
}
