import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate assistant response (replace this with your LLM logic)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-response`,
          text: `You said: ${input.trim()}`,
          sender: "assistant",
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <Card className="col-span-3 flex flex-col items-center justify-center bg-purpleVariant-300 shadow-xl">
      <div
      className={cn(
        "bg-card text-darkpurple rounded-lg p-4 flex flex-col h-full w-full  bg-purpleVariant-300 shadow-xl"
      )}
    >
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 border rounded-md bg-purpleLight-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("p-3 rounded-lg", {
              "bg-darkpurple text-white self-end":
                message.sender === "user",
              "bg-muted text-muted-foreground self-start":
                message.sender === "assistant",
            })}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="mt-4 flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} variant="default" className="bg-darkpurple">
          <Send className="w-4 h-4 " />
        </Button>
      </div>
    </div>
    </Card>
  );
};

export default Chat;
