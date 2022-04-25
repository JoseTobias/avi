import { BotApi } from "../../infra";
import { AddEntityProps, IAuthResponseError } from "../";

export class ConfigService {
  async sendEntity({
    botId,
    input,
    output,
  }: AddEntityProps): Promise<void | undefined> {
    try {
      await BotApi.post(
        "/entities",
        { input, output },
        { headers: { "x-bot": botId } }
      );

      return;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  // async getMessages({
  //   chatId,
  //   userId,
  // }: GetMessageProps): Promise<IMessageReturn[] | undefined> {
  //   try {
  //     const response = await BotApi.get<IMessage[]>("/messages", {
  //       params: { chatId },
  //     });
  //     const formatted: IMessageReturn[] = response.data.map((chat) => {
  //       return {
  //         isMyMessage: chat.senderId === userId,
  //         message: chat.data,
  //       };
  //     });

  //     return formatted;
  //   } catch (err) {
  //     const error = err as IAuthResponseError;
  //     throw new Error(error.response?.data.errors[0].message);
  //   }
  // }

  // async addChat(botId: string): Promise<IChat | undefined> {
  //   try {
  //     const chats = await BotApi.post<IChat>("/chats", { botId });

  //     return chats.data;
  //   } catch (err) {
  //     const error = err as IAuthResponseError;
  //     throw new Error(error.response?.data.errors[0].message);
  //   }
  // }
}
