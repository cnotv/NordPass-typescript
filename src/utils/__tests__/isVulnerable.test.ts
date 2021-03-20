import { ItemCheck } from "../itemCheck";

describe('FX: isVulnerable should', () => {
  it('return false if everything is valid', () => {
    const item = {
      createdAt: new Date().toISOString(),
      password: 'StrongPassword123~'
    } as IItem;
    const items = [{
      password: 'old'
    }] as IItem[];
  
    expect(ItemCheck.isVulnerable(item, items)).toBe(false);
  })
});