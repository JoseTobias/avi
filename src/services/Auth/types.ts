import { AxiosError } from "axios";

export interface IAuthProps {
  email: string;
  password: string;
}

export interface IAuthResponseSuccess {
  email: string;
  password: string;
}

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
