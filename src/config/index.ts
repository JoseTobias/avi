import axios from "axios";

export const BotApi = axios.create({
  baseURL: "http://164.92.65.70:5000",
  withCredentials: true,
});

BotApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const message =
      error.response.data.errors && error.response.data.errors[0].message;
    if (error.response.status === 400 && message === "session expired") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
