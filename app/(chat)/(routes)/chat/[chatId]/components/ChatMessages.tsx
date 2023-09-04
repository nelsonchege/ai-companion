import { Companion } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

type ChatMessagesProps = {
  isLoading: boolean;
  companion: Companion;
  messages: ChatMessageProps[];
};

const ChatMessages = ({
  isLoading,
  companion,
  messages = [],
}: ChatMessagesProps) => {
  const ScrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    ScrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        role={"system"}
        src={companion.src}
        content={`Hello, I am ${companion.name}.`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          src={message.src}
          content={message.content}
        />
      ))}
      {isLoading && (
        <ChatMessage role={"system"} src={companion.src} isLoading />
      )}
      <div ref={ScrollRef} />
    </div>
  );
};

export default ChatMessages;
