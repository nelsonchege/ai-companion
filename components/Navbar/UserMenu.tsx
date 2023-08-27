"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import MenuItems from "./MenuItems";
import { Sparkles } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function UserMenu() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="p-3 md:py-1 md:px-2 border-[1px] border-neutral-200 dark:border-purple-700 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <ModeToggle />
          <div
            onClick={() => {}}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white border-0 hover:bg-neutral-100 transition cursor-pointer hover:shadow-md"
          >
            <span className="flex items-center justify-center">
              Upgrade
              <Sparkles
                className="h-4 w-4 fill-white text-white ml-2
            "
              />
            </span>
          </div>
          <div
            onClick={toggleOpen}
            className="flex items-center justify-center gap-1"
          >
            <div className="hidden md:block">
              <AiOutlineMenu />
            </div>
            <Avatar src={session?.user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw]  dark:border-slate-700 sm:3/4 border bg-white dark:bg-slate-800 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {!session ? (
                <>
                  <MenuItems onClick={() => {}} label="login" />
                  <MenuItems onClick={() => {}} label="signin" />
                </>
              ) : (
                <>
                  <MenuItems
                    onClick={() => {
                      router.push("/trips");
                      setIsOpen(false);
                    }}
                    label="My trips"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/favorites");
                      setIsOpen(false);
                    }}
                    label="My Favorites"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/reservations");
                      setIsOpen(false);
                    }}
                    label="My Reservations"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/properties");
                      setIsOpen(false);
                    }}
                    label="My Properties"
                  />
                  <MenuItems onClick={() => {}} label="Airbnb my Home" />
                  <hr />
                  <MenuItems onClick={() => signOut()} label="logout" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}
