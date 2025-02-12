const baseApiUrl =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_API_URL
    : "http://127.0.0.1:5000";

if (!baseApiUrl) {
  throw new Error("Environment variable BASE_API_URL is missing");
}

export interface LoginResponse {
  access_token: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${baseApiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 401) {
      throw new Error(data.msg || "Invalid email or password");
    }

    if (!response.ok) {
      throw new Error(data.msg || "Login failed, please try again later.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error, please try again later.");
  }
}
