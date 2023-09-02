import { getAuthSession } from "@/actions/getUserSession";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/db";
import ClientChat from "./components/ClientChat";

type ChatpageProps = {
  params: {
    chatId: string;
  };
};

const Chatpage = async ({ params }: ChatpageProps) => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/signup");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    redirect("/signup");
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: user.id,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    redirect("/");
  }

  return <ClientChat companion={companion} user={user} />;
};

export default Chatpage;
