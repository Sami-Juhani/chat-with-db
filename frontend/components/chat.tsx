"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "./code-display-block";
import { askAI, ChatMessage } from "@/lib/chat";
import { useAuth } from "@/context/auth-context";

export default function ChatBot() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user == null) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsGenerating(true);
    try {
      const response = await askAI({ question: input, user: user });

      if (!response) return;
      setMessages((prev) => [...prev, response]);
      setIsGenerating(false);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "There was an error generating the response, please try again later",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || !input || !user) return;
      setIsGenerating(true);
      onSubmit(e);
    }
  };

  return (
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with our AI ✨</h1>
        <p>Ask any question for our AI to answer</p>
        <div className="flex gap-2 items-center pt-2">
          <Button variant="secondary" onClick={() => setMessages([])}>
            New Chat
          </Button>
        </div>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList className="bg-muted/25" ref={messagesRef}>
          {/* Initial message */}
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage>
              {user == null
                ? "Please login to use the chat..."
                : "Hello! I'm the AI assistant. How can I help you today?"}
            </ChatBubbleMessage>
          </ChatBubble>

          {/* Messages */}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={message.role == "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  src=""
                  fallback={message.role == "user" ? "👨🏽" : "🤖"}
                />
                <ChatBubbleMessage
                  variant={message.role == "user" ? "sent" : "received"}
                >
                  {message.content
                    .split("```")
                    .map((part: string, index: number) => {
                      if (index % 2 === 0) {
                        return (
                          <Markdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </Markdown>
                        );
                      } else {
                        return (
                          <pre className=" pt-2" key={index}>
                            <CodeDisplayBlock code={part} lang="" />
                          </pre>
                        );
                      }
                    })}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="bg-muted/25">
        <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none "
          />
          <Button
            className="absolute top-1/2 right-2 transform  -translate-y-1/2"
            type="submit"
            size="icon"
            disabled={isGenerating || !input || user == null}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
