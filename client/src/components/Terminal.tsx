import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Terminal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process your message at this time." },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    chatMutation.mutate(input);
    setInput("");
  };

  return (
    <Card className="p-4 bg-black border-primary">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-sm text-primary">chat.sh</span>
      </div>

      <ScrollArea className="h-[400px] mb-4">
        <div className="space-y-4 font-mono">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-green-400" : "text-primary"}>
              <span>{msg.role === "user" ? ">" : "$"} </span>
              {msg.content}
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="text-primary animate-pulse">$ ...</div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono bg-transparent border-primary"
          placeholder="Type your message..."
          disabled={chatMutation.isPending}
        />
      </form>
    </Card>
  );
}
