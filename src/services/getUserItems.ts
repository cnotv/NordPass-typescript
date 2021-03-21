import { API } from "~/constants";
import getUrl from "~/utils/getUrl";

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    return data.items;
  } catch (error) {
    throw Error(error);
  }
};

export default getUserItems;
