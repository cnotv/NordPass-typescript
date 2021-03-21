import { ItemCheck } from "../itemCheck";

describe('FX: isOld should return true if creation date is older than 30 days', () => {
  test.each([
    [
      true,
      {
        createdAt: new Date(2010).toISOString(),
      }
    ],
    [
      false,
      {
        createdAt: new Date().toISOString(),
      }
    ],
  ])('should return %s', (expectedResult, item) => {
    expect(ItemCheck.isOld(item as IItem)).toBe(expectedResult);
  })
});