import { IBot } from "../";

export interface ITeam {
  id: string;
  botId: string;
  bot: IBot;
  userId: string;
  teamGroupId: string;
  havePermissions?: boolean;
}

export interface ITeamContext {
  teams: ITeam[] | undefined;
  updateTeams: (data: ITeam[]) => void;
}
