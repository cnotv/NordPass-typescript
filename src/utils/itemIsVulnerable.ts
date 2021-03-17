import { IItem } from "~/services/getUserItems";
import itemHasReusedPassword from "./itemHasReusedPassword";
import itemHasWeakPassword from "./itemHasWeakPassword";
import itemIsOld from "./itemIsOld";

export const itemIsVulnerable = (item: IItem, items: IItem[]) =>
  itemHasReusedPassword(item, items) ||
  itemHasWeakPassword(item) ||
  itemIsOld(item);
