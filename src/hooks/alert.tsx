import { useContext } from "react";
import { AlertContext } from "../contexts";

export function useAlert() {
  const context = useContext(AlertContext);

  return context;
}
