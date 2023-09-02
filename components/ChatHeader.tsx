"use client";

import { Companion, Message, User } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import Avatar from "./Navbar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "react-hot-toast";
import axios from "axios";

type ChatHeaderProps = {
  companion: Companion & { messages: Message[]; _count: { messages: number } };
  user: User;
};

const ChatHeader = ({ companion, user }: ChatHeaderProps) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);
      toast.success("Companion Deleted");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Unable to delete companion");
    }
  };
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-3 items-center">
        <Button onClick={() => router.back()} size={"icon"} variant={"ghost"}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Avatar src={companion.src} size={45} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"secondary"} size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
