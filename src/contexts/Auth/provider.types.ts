import { IAuthProps } from "../../services";

export type IAuthData = any;
export type ISignInCredentials = IAuthProps;

export interface IAuthContextData {
  isAuthenticated: boolean;
  // authData: IAuthData;
  signIn: (data: ISignInCredentials) => Promise<void>;
  signOut: () => void;
}
