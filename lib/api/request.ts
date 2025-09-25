type RequestConfig = RequestInit & {
  url: string | URL;
  retryCondition?: (
    response: Response,
    attempt: number
  ) => boolean | Promise<boolean>;
  maxAttempts?: number;
  baseDelayMs?: number;
};

type RequestResponse<T = unknown> = {
  data: T;
  response: Response;
  attempt: number;
};

const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_BASE_DELAY_MS = 1000;

export const request = async <T = unknown>(
  config: RequestConfig
): Promise<RequestResponse<T>> => {
  const {
    url,
    retryCondition = defaultRetryCondition,
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
    baseDelayMs = DEFAULT_BASE_DELAY_MS,
    ...fetchOptions
  } = config;

  let attempt = 0;
  let lastError: unknown;

  while (attempt < maxAttempts) {
    attempt++;
    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const shouldRetry = await retryCondition(response, attempt);
        if (shouldRetry && attempt < maxAttempts) {
          await delay(attempt * baseDelayMs);
          continue;
        }
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }

      const data: T = await response.json();
      return { data, response, attempt };
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await delay(attempt * baseDelayMs);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Request failed after all attempts");
};

const defaultRetryCondition = async (response: Response): Promise<boolean> => {
  return response.status === 429 || response.status >= 500;
};

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
