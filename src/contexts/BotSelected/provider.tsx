import React, { createContext, useState, useCallback, FC } from "react";

import { IBot, IBotContext } from "./provider.types";
export const BotSelectedContext = createContext<IBotContext>({} as IBotContext);

export const BotSelectedProvider: FC<any> = ({ children }) => {
  const [bot, setBot] = useState<IBot>({
    description: "",
    id: "",
    name: "",
    nick: "",
  });

  const selectBot = useCallback((data: IBot) => {
    setBot(data);
  }, []);

  return (
    <BotSelectedContext.Provider
      value={{
        bot,
        selectBot,
      }}
    >
      {children}
    </BotSelectedContext.Provider>
  );
};
