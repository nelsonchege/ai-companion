import { getAuthSession } from "@/actions/getUserSession";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const Settingspage = () => {
  const session = getAuthSession();

  if (!session) {
    toast.error("Unathorized");
    redirect("/signup");
  }
  return <div>page</div>;
};

export default Settingspage;
