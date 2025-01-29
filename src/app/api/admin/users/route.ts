import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { User } from "@prisma/client";

type RequestBody = {
  name: string;
  userImageURL: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, userImageURL }: RequestBody = await req.json();
    const user: User = await prisma.user.create({
      data: {
        name,
        userImageURL,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "カテゴリの作成に失敗しました" },
      { status: 500 }
    );
  }
};
