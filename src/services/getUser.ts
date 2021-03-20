import { API } from "~/constants";
import getUrl from "../utils/getUrl";

export const getUser = async (): Promise<User> => {
  try {
    const response = await fetch(getUrl(API.User), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return await response.json();
  } catch (error) {
    localStorage.removeItem("token");
  }
};
