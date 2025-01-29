import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { User } from "@prisma/client";

// [GET] /api/user ユーザー一覧の取得
export const GET = async (req: NextRequest) => {
  try {
    const users: User[] = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc", // 降順 (新しい順)
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの取得に失敗しました" },
      { status: 500 } // 500: Internal Server Error
    );
  }
};
