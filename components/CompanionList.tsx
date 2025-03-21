import { Companion } from "@prisma/client";
import React from "react";
import Image from "next/image";
import notFound from "../public/images/notFound.png";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

type CompanionListProps = {
  companions: (Companion & {
    _count: {
      messages: number;
    };
  })[];
};

const CompanionList = ({ companions }: CompanionListProps) => {
  if (companions.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="hover:grayscale " src={notFound} alt="Empty" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {companions.map((companion) => (
        <Card
          key={companion.name}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={companion.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="Character"
                />
              </div>
              <p className="font-bold">{companion.name}</p>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>
            <CardFooter className="flex  items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{companion.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="w-3 h-3 mr-1" />
                {companion._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CompanionList;
