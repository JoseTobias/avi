export type ChangeType = "message" | "response";

export interface MessageFormProps {
  message: string;
  response: string;
  changeText: (value: string, type: ChangeType) => void;
  onSubmit: () => void;
  loading?: boolean;
}
