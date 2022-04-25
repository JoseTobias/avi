import { useContext } from "react";
import { TeamsContext } from "../contexts";

export function useTeams() {
  const context = useContext(TeamsContext);

  return context;
}
