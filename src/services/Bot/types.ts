import { AxiosError } from "axios";

export interface IBot {
  id: string;
  name: string;
  nick: string;
  description: string;
}

export interface ITeam {
  id: string;
  botId: string;
  bot: IBot;
  userId: string;
  teamGroupId: string;
}

export interface IGetBotsResponseSuccess {
  teams: ITeam[];
}

export interface ResponseError {
  errors: [
    {
      message: string;
    }
  ];
}

export type IAuthResponseError = AxiosError<ResponseError, any>;
export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
}
