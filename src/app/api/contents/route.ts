import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Content } from "@prisma/client";

type RequestBody = {
  title: string;
  text: string;
  coverImageURL: string;
  userIds: string[];
  tagIds: string[];
};

// [GET] /api/contents カテゴリ一覧の取得
export const GET = async (req: NextRequest) => {
  try {
    // カテゴリの取得
    const contents = await prisma.content.findMany({
      select: {
        id: true,
        title: true,
        text: true,
        coverImageURL: true,
        users: true,
        tags: true,
        createdAt: true,
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "カテゴリの取得に失敗しました" },
      { status: 500 } // 500: Internal Server Error
    );
  }
};
