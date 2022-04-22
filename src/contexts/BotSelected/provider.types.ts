export interface IBot {
  id: string;
  name: string;
  nick: string;
  description: string;
}

export interface IBotContext {
  bot: IBot;
  selectBot: (data: IBot) => void;
}
