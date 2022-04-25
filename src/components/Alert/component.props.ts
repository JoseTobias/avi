export interface IFeedback {
  type: "error" | "success";
  message: string;
  actionButtonText?: string;
  onActionButton?: () => void;
}

export interface IFeedbackProps {
  data: IFeedback;
  onClose?: () => void;
}
