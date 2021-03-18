import { isWeakPassword } from "./passwordValidation";

export namespace ItemCheck {
  export const hasReusedPassword = (item: IItem, itemList: Array<IItem>) => {
    const reusedItems = itemList.filter(
      (listItem) => listItem.password === item.password
    );

    return reusedItems.length > 1;
  };

  export const hasWeakPassword = (item: IItem) => {
    const { password } = item;

    return isWeakPassword(password);
  };

  export const isOld = (item: IItem) => {
    const { createdAt } = item;

    // Probably would be better to use Moment.js or date-fsn to check the timezoned value
    return new Date(createdAt).getDay() > 30;
  };

  export const isVulnerable = (item: IItem, items: IItem[]) =>
    hasReusedPassword(item, items) ||
    hasWeakPassword(item) ||
    isOld(item);
}
