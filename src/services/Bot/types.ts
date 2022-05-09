import { IAuthData } from "../../contexts";

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
  havePermissions?: boolean;
}

export interface IGetBotsResponseSuccess extends IAuthData {
  teams: ITeam[];
}

export interface IGetBotsReturn {
  teams: ITeam[];
  auth: IAuthData;
}

export interface AddBotProps {
  name: string;
  nick: string;
  description: string;
}
export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
}
