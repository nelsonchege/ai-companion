import { getAuthSession } from "@/actions/getUserSession";
import prisma from "@/lib/db";
import { companionValidator } from "@/lib/validators/companion";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  requsest: Request,
  { params }: { params: { companionId: string } }
) {
  //do something

  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("UNauthorized", { status: 401 });
    }

    const body = await requsest.json();
    const { instructions, seed, src, name, categoryId, description } =
      companionValidator.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const companion = await prisma.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.email,
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
      "Could not update your companion at this time,please try again later",
      { status: 500 }
    );
  }
}
