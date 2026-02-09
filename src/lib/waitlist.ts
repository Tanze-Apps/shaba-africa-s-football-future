export type WaitlistResponse = {
  status: number;
  message: string;
  data: unknown;
};

export class WaitlistError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "WaitlistError";
    this.status = status;
  }
}

const WAITLIST_BASE_URL =
  import.meta.env.VITE_WAITLIST_URL;

const buildWaitlistUrl = (baseUrl: string) => {
  if (baseUrl.includes("/api/")) {
    return baseUrl;
  }
  return `${baseUrl.replace(/\/+$/, "")}/api/v1/auth/waitlist`;
};

export const joinWaitlist = async (
  email: string,
  signal?: AbortSignal
): Promise<WaitlistResponse> => {
  const response = await fetch(buildWaitlistUrl(WAITLIST_BASE_URL), {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    signal,
  });

  const data = (await response.json().catch(() => null)) as
    | WaitlistResponse
    | null;

  if (!response.ok) {
    const message =
      data?.message || "Unable to join the waitlist. Please try again.";
    throw new WaitlistError(message, response.status);
  }

  if (!data?.message) {
    return {
      status: response.status,
      message: "You have successfully joined the waitlist.",
      data: data?.data ?? {},
    };
  }

  return data;
};
