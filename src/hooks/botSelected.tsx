import { useContext } from "react";
import { BotSelectedContext } from "../contexts";

export function useBotSelected() {
  const context = useContext(BotSelectedContext);

  return context;
}
