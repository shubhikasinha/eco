"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const prompts = [
  "How to reduce packaging waste?",
  "Suggest eco-friendly office supplies",
  "Explain carbon offsetting",
];

const SolutionsHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! How can I help you make your business more sustainable today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newUserMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm here to help with sustainability questions. In a full implementation, I would provide detailed, actionable advice based on your query using AI.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-9 h-9 text-[#85b708]" />
            <h1 className="text-5xl font-bold text-[#003e0c]">Ask Eco-AI</h1>
          </div>
          <p className="text-xl text-gray-600">
            Your Instant Sustainability Assistant
          </p>
        </div>

        <Card className="border-2 border-gray-200/80 animate-fade-in-up shadow-lg">
          {/* Chat Messages */}
          <div className="p-6 space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-9 h-9 rounded-full bg-[#85b708] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                    message.role === "user"
                      ? "bg-[#003e0c] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Starters */}
          {messages.length === 1 && (
            <div className="px-6 pb-4 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500 mb-3">Or try one of these suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(prompt)}
                    className="text-sm border-gray-300 text-[#003e0c] hover:bg-gray-100 hover:text-[#003e0c]"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
            <div className="flex gap-2 items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your sustainability question..."
                className="flex-1 text-[#003e0c] focus-visible:ring-1 focus-visible:ring-[#85b708]"
              />
              <Button
                onClick={() => handleSend()}
                className="bg-[#85b708] text-[#003e0c] hover:bg-[#85b708]/90 transition-transform duration-200 hover:scale-105"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolutionsHub;