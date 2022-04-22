export interface IAuthProps {
  email: string;
  password: string;
}

export interface IAuthResponseSuccess {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface IAuthReturn extends IAuthResponseSuccess {
  cookie: string;
}
