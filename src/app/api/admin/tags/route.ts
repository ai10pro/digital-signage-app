import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Tag } from "@prisma/client";

type RequestBody = {
  name: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const { name }: RequestBody = await req.json();
    const tag: Tag = await prisma.tag.create({
      data: {
        name,
      },
    });
    return NextResponse.json(tag);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "カテゴリの作成に失敗しました" },
      { status: 500 }
    );
  }
};
