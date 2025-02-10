import { type User } from "./users";

export interface ChatMessage {
  role: "ai" | "user";
  content: string;
}

const baseApiUrl =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_API_URL
    : "http://127.0.0.1:5000";

if (!baseApiUrl) {
  throw new Error("Environment variable BASE_API_URL is missing");
}

const API_URL = `${baseApiUrl}/ask`;

export async function askAI({
  question,
  user,
}: {
  question: string;
  user: User;
}): Promise<ChatMessage | undefined> {
  if (!user) return;

  try {
    const result = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, question: question }),
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();

    return { role: "ai", content: data.response };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw to handle in the UI
  }
}
