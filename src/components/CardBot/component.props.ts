export interface ICardBotProps {
  name: string;
  nick: string;
  description: string;
  onConfig?: () => void;
  onClick?: () => void;
  enableConfig?: boolean;
}
