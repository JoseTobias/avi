import { BotApi } from "../../infra";
import {
  IGetBotsResponseSuccess,
  ITeam,
  IAuthResponseError,
  IBot,
  AddBotProps,
} from "./types";

export class BotService {
  async getBots(): Promise<ITeam[] | undefined> {
    try {
      const response = await BotApi.get<IGetBotsResponseSuccess>("/users/me");
      return response.data.teams;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  async getBotsByNick(nick: string): Promise<ITeam[] | undefined> {
    try {
      const response = await BotApi.get<IBot[]>("/bots", {
        params: { nick },
      });
      const team: ITeam[] = response.data.map((item) => ({
        bot: item,
        botId: item.id,
        id: item.id,
        teamGroupId: item.id,
        userId: item.id,
      }));

      return team;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }

  async addBot(props: AddBotProps): Promise<ITeam | undefined> {
    try {
      const response = await BotApi.post<IBot>("/bots", props);

      const team = {
        bot: response.data,
        botId: response.data.id,
        id: response.data.id,
        teamGroupId: response.data.id,
        userId: response.data.id,
      };

      return team;
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }
}
