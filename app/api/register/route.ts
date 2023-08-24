import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(requsest: Request) {
  const body = await requsest.json();
  const { email, name, password } = body;

  const hashedpassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedpassword,
    },
  });

  return NextResponse.json(user);
}
