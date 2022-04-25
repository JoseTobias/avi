import { useContext } from "react";
import { MessagesContext } from "../contexts";

export function useChatMessage() {
  const context = useContext(MessagesContext);

  return context;
}
