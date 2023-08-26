"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import UserMenu from "./UserMenu";
import MobileSidebar from "./MobileSidebar";

type Props = {};

const font = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const NavBar = (props: Props) => {
  return (
    <div className="fixed w-full h-16 z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <UserMenu />
    </div>
  );
};

export default NavBar;
