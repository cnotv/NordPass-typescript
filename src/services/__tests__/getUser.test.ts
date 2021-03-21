import { getUser } from "../getUser";

describe("FX: getUser should", () => {
  it("return user", async () => {
    const fakeUser = {} as User;
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    
    const user = await getUser();

    expect(user).toEqual(fakeUser);
  });
});
