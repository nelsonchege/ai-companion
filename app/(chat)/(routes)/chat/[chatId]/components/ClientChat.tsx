import ChatHeader from "@/components/ChatHeader";
import { Companion, Message, User } from "@prisma/client";
import React from "react";

type ClientChatProps = {
  companion: Companion & { messages: Message[]; _count: { messages: number } };
  user: User;
};

const ClientChat = ({ companion, user }: ClientChatProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} user={user} />
    </div>
  );
};

export default ClientChat;
