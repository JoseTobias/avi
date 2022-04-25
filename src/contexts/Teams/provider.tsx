import React, { createContext, useState, useCallback, FC } from "react";

import { ITeam, ITeamContext } from "./provider.types";
export const TeamsContext = createContext<ITeamContext>({} as ITeamContext);

export const TeamsProvider: FC<any> = ({ children }) => {
  const [teams, setTeams] = useState<ITeam[]>();

  const updateTeams = useCallback((data: ITeam[]) => {
    setTeams(data);
  }, []);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        updateTeams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
