import axios from "axios";

export const BotApi = axios.create({
  baseURL: "http://164.92.65.70:5000",
});
