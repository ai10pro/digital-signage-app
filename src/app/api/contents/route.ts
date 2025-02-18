import { name } from "./../../../../node_modules/ci-info/index.d";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Content } from "@prisma/client";

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
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                userImageURL: true,
              },
            },
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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
