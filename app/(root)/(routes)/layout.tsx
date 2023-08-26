import NavBar from "@/components/NavBar";
import React from "react";

type RootlayoutProps = {
  children: React.ReactNode;
};

const Rootlayout = ({ children }: RootlayoutProps) => {
  return (
    <div className="h-full">
      <NavBar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default Rootlayout;
