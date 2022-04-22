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

export interface IGetBotsResponseSuccess {
  teams: ITeam[];
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
