import React, { createContext, useState, useCallback, FC } from "react";

import { IFeedback, IFeedbackContext, IFeedbackData } from "./provider.types";
import { Alert } from "../../components";

export const AlertContext = createContext<IFeedbackContext>(
  {} as IFeedbackContext
);

export const AlertProvider: FC<any> = ({ children }) => {
  const [alertData, setAlertData] = useState<IFeedbackData>({
    message: "",
    type: "success",
  });

  const setFeedback = useCallback((data: IFeedback) => {
    if (data.message instanceof Error) {
      setAlertData({
        message: data.message?.message,
        type: "error",
      });
      return;
    }

    if (data.type === "error") {
      setAlertData({
        message: "Aconteceu algo inesperado, tente novamente",
        type: "error",
      });
      return;
    }

    const feedback: IFeedbackData = {
      message: data.message as string,
      type: data.type,
    };
    setAlertData(feedback);
  }, []);

  const onClose = useCallback(() => {
    setAlertData({
      message: "",
      type: "success",
    });
  }, []);

  return (
    <AlertContext.Provider
      value={{
        setFeedback,
      }}
    >
      <Alert data={alertData} onClose={onClose} />
      {children}
    </AlertContext.Provider>
  );
};
