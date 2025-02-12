"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  if (process.env.NODE_ENV === "development") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold text-red-600">
            Something went wrong!
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Error Details:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code className="text-sm">
                {error.name}: {error.message}
                {"\n\n"}
                {error.stack}
              </code>
            </pre>
          </div>
          <Button onClick={reset} className="mt-4">
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Oops!</h1>
          <p className="text-xl text-gray-600">
            Something went wrong. We're working on fixing it.
          </p>
        </div>

        <Button onClick={reset} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}
