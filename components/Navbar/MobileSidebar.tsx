import { Menu } from "lucide-react";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideBar from "../SideBar/SideBar";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="block md:hidden" />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 bg-secondary">
          <SideBar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
