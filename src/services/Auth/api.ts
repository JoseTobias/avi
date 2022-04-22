import { BotApi } from "../../infra";
import {
  IAuthProps,
  IRegisterProps,
  IAuthResponseError,
  IAuthResponseSuccess,
  IAuthReturn,
} from "../";

export class AuthService {
  async signIn(props: IAuthProps): Promise<IAuthReturn> {
    const response = await BotApi.post<IAuthResponseSuccess>("/login", props, {
      withCredentials: true,
    });
    this.setToken(response.headers["x-authorization"]);
    const data = {
      ...response.data,
      cookie: response.headers["x-authorization"],
    };
    return data;
  }

  setToken(token: string) {
    BotApi.defaults.headers.common["x-authorization"] = token;
  }

  async usersMe() {
    const response = await BotApi.get("/users/me");

    return "response";
  }

  async signUp(props: IRegisterProps): Promise<string> {
    try {
      const response = await BotApi.post("/users", props);
      return "response";
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }
}
