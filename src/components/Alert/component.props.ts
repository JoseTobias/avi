export interface IFeedback {
  type: "error" | "success";
  message: string;
}

export interface IFeedbackProps {
  data: IFeedback;
  onClose?: () => void;
}
