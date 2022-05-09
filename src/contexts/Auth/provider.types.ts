import { IAuthProps } from "../../services";

export interface IAuthData {
  name: string;
  email: string;
  role: string;
  id: string;
}
export type ISignInCredentials = IAuthProps;

export interface IAuthContextData {
  isAuthenticated: boolean;
  authData: IAuthData;
  signIn: (data: ISignInCredentials) => Promise<void>;
  signOut: () => void;
  verifyAuth: () => boolean;
  setAuth: (data: IAuthData | undefined) => void;
}
