import { request } from "./request";

global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

const createResponse = (ok: boolean, status: number, body: any = {}) =>
  new Response(JSON.stringify(body), {
    status,
    statusText: ok ? "OK" : "Error",
    headers: { "Content-Type": "application/json" },
  });

describe("request()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when response is ok", async () => {
    const responseData = { message: "success" };
    mockFetch.mockResolvedValueOnce(createResponse(true, 200, responseData));

    const result = await request<{ message: string }>({
      url: "https://api.test.com/test",
    });

    expect(result.data).toEqual(responseData);
    expect(result.response.ok).toBe(true);
    expect(result.attempt).toBe(1);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should retry on 500 error and succeed on 2nd attempt", async () => {
    const responseData = { message: "recovered" };

    mockFetch
      .mockResolvedValueOnce(createResponse(false, 500))
      .mockResolvedValueOnce(createResponse(true, 200, responseData));

    const result = await request<{ message: string }>({
      url: "https://api.test.com/test",
      baseDelayMs: 1,
    });

    expect(result.data).toEqual(responseData);
    expect(result.attempt).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should fail after max attempts", async () => {
    mockFetch.mockResolvedValue(createResponse(false, 500));

    await expect(
      request({
        url: "https://api.test.com/test",
        maxAttempts: 2,
        baseDelayMs: 1,
      })
    ).rejects.toThrow("Request failed with status 500: Error");

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should retry on fetch throw and succeed later", async () => {
    const responseData = { message: "finally worked" };

    mockFetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce(createResponse(true, 200, responseData));

    const result = await request<{ message: string }>({
      url: "https://api.test.com/test",
      baseDelayMs: 1,
    });

    expect(result.data).toEqual(responseData);
    expect(result.attempt).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
