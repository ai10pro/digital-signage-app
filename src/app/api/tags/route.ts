import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Tag } from "@prisma/client";

// [GET] /api/tags タグ一覧の取得
export const GET = async (req: NextRequest) => {
  try {
    const tags: Tag[] = await prisma.tag.findMany({
      orderBy: {
        name: "asc", // 昇順 (A-Z)
      },
    });
    // console.log(tags);
    return NextResponse.json(tags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの取得に失敗しました" },
      { status: 500 } // 500: Internal Server Error
    );
  }
};
