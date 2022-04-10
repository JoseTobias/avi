import { BotApi } from "../../infra";
import { IAuthProps, IRegisterProps, IAuthResponseError } from "./types";

export class AuthApi {
  async signIn(props: IAuthProps) {
    const response = await BotApi.post("/login", props);

    return response;
  }

  private setToken(token: string) {
    BotApi.defaults.headers.common["Authorization"] = token;
  }

  async signOut(props: IRegisterProps): Promise<string> {
    try {
      const response = await BotApi.post("/users", props);
      return "response";
    } catch (err) {
      const error = err as IAuthResponseError;
      throw new Error(error.response?.data.errors[0].message);
    }
  }
}
