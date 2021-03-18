import itemHasReusedPassword from "./itemHasReusedPassword";
import itemHasWeakPassword from "./itemHasWeakPassword";
import itemIsOld from "./itemIsOld";

const itemIsVulnerable = (item: IItem, items: IItem[]) =>
  itemHasReusedPassword(item, items) ||
  itemHasWeakPassword(item) ||
  itemIsOld(item);

export default itemIsVulnerable;