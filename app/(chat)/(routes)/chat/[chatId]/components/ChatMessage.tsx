"use client";

import Avatar from "@/components/Navbar/Avatar";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { theme } = useTheme();
  const { data: session } = useSession();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast.success("Message saved to clipboard");
  };
  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <Avatar src={src} size={45} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <PulseLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role !== "system" && <Avatar src={session?.user?.image} size={45} />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size={"icon"}
          variant={"ghost"}
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
