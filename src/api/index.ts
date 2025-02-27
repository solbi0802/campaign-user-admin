const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`; // API 개발되면 교체

export const fetchData = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const isJsonBody = options.body && !(options.body instanceof FormData);

  try {
    console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: isJsonBody
        ? {
            "Content-Type": "application/json",
            ...options.headers,
          }
        : options.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(
      "API Fetch Error:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
