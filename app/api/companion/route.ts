import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/actions/getUserSession";
import { companionValidator } from "@/lib/validators/companion";
import { z } from "zod";

export async function POST(requsest: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("UNauthorized", { status: 401 });
    }

    const body = await requsest.json();

    const { name, instructions, seed, src, description, categoryId } =
      companionValidator.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    const checkExistingCompanion = await prisma.companion.findFirst({
      where: {
        name,
      },
    });

    if (checkExistingCompanion) {
      return new Response("Companion Exist", { status: 403 });
    }

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user?.name,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response(
      "Could not create a companion at this time,please try again later",
      { status: 500 }
    );
  }
}
