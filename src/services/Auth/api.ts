import { BotApi } from "../../infra";
import { IAuthProps } from "./types";

export class AuthApi {
  async signIn(props: IAuthProps) {
    // const headers = {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // };
    const response = await BotApi.post("/login", props);

    // console.log(response.headers);

    return response;
  }

  private setToken(token: string) {
    BotApi.defaults.headers.common["Authorization"] = token;
  }
}
