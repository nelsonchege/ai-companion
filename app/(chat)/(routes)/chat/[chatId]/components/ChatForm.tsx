"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";

type ChatFormProps = {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
};

const ChatForm = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant={"secondary"}>
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
