"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type NextAuthProps = {
  children: React.ReactNode;
};

function NextAuthSessionProvider({ children }: NextAuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;
