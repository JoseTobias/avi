export interface IFeedback {
  type: "error" | "success";
  message: string | Error | unknown;
}

export interface IFeedbackData {
  type: "error" | "success";
  message: string;
}

export interface IFeedbackContext {
  setFeedback: (data: IFeedback) => void;
}
