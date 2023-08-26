import NavBar from "@/components/Navbar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import React from "react";

type RootlayoutProps = {
  children: React.ReactNode;
};

const Rootlayout = ({ children }: RootlayoutProps) => {
  return (
    <div className="h-full">
      <NavBar />
      <div className="hidden md:flex mt-10 w-20 flex-col fixed inset-y-6">
        <SideBar />
      </div>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default Rootlayout;
