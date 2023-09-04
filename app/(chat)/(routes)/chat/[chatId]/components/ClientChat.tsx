"use client";

import ChatHeader from "@/components/ChatHeader";
import { useCompletion } from "ai/react";
import { Companion, Message, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import { ChatMessageProps } from "./ChatMessage";

type ClientChatProps = {
  companion: Companion & { messages: Message[]; _count: { messages: number } };
  user: User;
};

const ClientChat = ({ companion, user }: ClientChatProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
        setInput("");
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} user={user} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ClientChat;
