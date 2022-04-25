export interface IAuthProps {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface IAuthResponseSuccess {
  user: IUser;
}

export interface IAuthReturn extends IAuthResponseSuccess {
  cookie: string;
}
