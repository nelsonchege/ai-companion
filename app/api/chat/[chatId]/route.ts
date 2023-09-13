import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prisma from "@/lib/db";
import { getAuthSession } from "@/actions/getUserSession";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    // check if user exist,if not throw an error
    const session = await getAuthSession();

    if (!session) {
      return new Response("UNauthorized", { status: 401 });
    }

    //get users details
    let sessionMail = session.user.email;
    const user = await prisma.user.findUnique({
      where: {
        email: sessionMail,
      },
    });

    //get users prompt and check if passes the rate limiter
    const { prompt } = await request.json();
    const identifier = request.url + "-" + user?.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new Response("Rate limit exceeded", { status: 429 });
    }

    //add in users prompts into the database
    const companion = await prisma.companion.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!companion) {
      return new Response("Companion not found", { status: 404 });
    }

    const name = companion.id;
    const companion_file_name = name + ".txt";

    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: "llama2-13b",
    };

    // initialize memorry storage
    const memoryManager = await MemoryManager.getInstance();

    // check if there is previous conversations
    const records = await memoryManager.readLatestHistory(companionKey);

    //if no chat add new chat from the companion seed
    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    }

    // add the new user input to the chat
    await memoryManager.writeToHistory("Human: " + prompt + "\n", companionKey);

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );

    // const similarDocs = await memoryManager.vectorSearch(
    //   recentChatHistory,
    //   companion_file_name
    // );

    // let relevantHistory = "";

    // console.log("relevantHistory 1 ------------->", relevantHistory);
    // if (!!similarDocs && similarDocs.length !== 0) {
    //   relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    // }

    const { handlers } = LangChainStream();
    console.log("replicate env --------->", process.env.REPLICATE_API_TOKEN);
    const model = new Replicate({
      model:
        "meta/llama-2-13b-chat:de18b8b68ef78f4f52c87eb7e3a0244d18b45b3c67affef2d5055ddc9c2fb678",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });
    model.verbose = true;
    console.log("Here -------------------->", model);
    //sending prompt to the model
    const resp = String(
      await model
        .call(
          `
        Only generate plain sentences without prefix of who is speaking.DO NOT use ${name}:prefix:
        ${companion.instructions}

        Below are the relevant details about ${name}'s past and thr conversation you are in

        ${recentChatHistory}\n${companion.name}
        `
        )
        .catch((err) =>
          console.log("error getting ai response ---------->", err)
        )
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), companionKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);

    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), companionKey);

      await prisma.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
