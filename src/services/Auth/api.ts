import { BotApi } from "../../infra";
import { IAuthProps, IRegisterProps, IAuthResponseError } from "./types";

export class AuthService {
  async signIn(props: IAuthProps): Promise<void> {
    const response = await BotApi.post("/login", props, {
      withCredentials: true,
    });
    this.setToken(response.headers["x-authorization"]);
  }

  private setToken(token: string) {
    BotApi.defaults.headers.common["x-authorization"] = token;
  }

  async usersMe() {
    const response = await BotApi.get("/users/me");
    console.log("usersMe", response);

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
