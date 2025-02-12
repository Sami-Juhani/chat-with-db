export interface ChatMessage {
  role: "ai" | "user";
  content: string;
}

const API_URL =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_API_URL
    : "http://127.0.0.1:5000";

export async function askAI({
  question,
  token,
}: {
  question: string;
  token: string;
}): Promise<ChatMessage | undefined> {
  if (!token) return;

  try {
    const result = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question: question }),
      credentials: "include",
    });

    if (!result.ok) {
      return {
        role: "ai",
        content: "There was an unexpected error, Please try again later.",
      };
    }

    const data = await result.json();

    return { role: "ai", content: data.response };
  } catch (error) {
    return {
      role: "ai",
      content: "There was an unexpected error, Please try again later.",
    };
  }
}
