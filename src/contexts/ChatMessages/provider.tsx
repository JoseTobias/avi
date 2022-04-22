import React, { createContext, useState, useCallback, FC } from "react";

import { IMessages, IMessagesContext, IMessage } from "./provider.types";
export const MessagesContext = createContext<IMessagesContext>(
  {} as IMessagesContext
);

export const ChatMessageProvider: FC<any> = ({ children }) => {
  const [messages, setMessages] = useState<IMessages>();

  const addChat = useCallback(
    (data: IMessage[], botId: string) => {
      setMessages({ ...messages, [botId]: data });
    },
    [messages]
  );

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addChat,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
