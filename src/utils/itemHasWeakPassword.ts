import {IItem} from "~/services/getUserItems";
import { isWeakPassword } from "./passwordValidation";

const itemHasWeakPassword = (item: IItem) => {
  const { password } = item;

  return isWeakPassword(password);
};

export default itemHasWeakPassword;