import { AxiosError } from "axios";

export * from "./Auth";
export * from "./Bot";
export * from "./Chat";
export * from "./Config";

export interface ResponseError {
  errors: [
    {
      message: string;
    }
  ];
}

export type IAuthResponseError = AxiosError<ResponseError, any>;
export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
}
