export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any): never => {
  if (error.response) {
    throw new ApiError(
      error.response.data?.message || "API request failed",
      error.response.status,
      error.response.statusText
    );
  } else if (error.request) {
    throw new ApiError("Please check your connection", 0, "Network Error");
  } else {
    throw new ApiError("Request setup error", 0, "Setup Error");
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatRating = (rating: number): string => {
  return rating?.toFixed(1);
};
