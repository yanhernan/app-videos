import { fetchVideos } from "./videos-service";

describe("Test suite videos service", () => {
  it("Test fetch success", async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockJsonPromise,
      ok: true,
    }) as any;
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const VideosResponse = await fetchVideos();
    expect(VideosResponse.status).toEqual("ok");
  });
});
