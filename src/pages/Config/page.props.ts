export type { ITeam } from "../../services/Bot";

export interface IParams {
  nick: string;
}

export type RenderOption = 0 | 1 | 2;

export interface MessageDataState {
  message: string;
  response: string;
}
