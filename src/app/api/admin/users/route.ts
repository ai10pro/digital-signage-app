import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { User } from "@prisma/client";

import { supabase } from "@/utils/supabase";

type RequestBody = {
  name: string;
  userImageURL: string;
};

export const POST = async (req: NextRequest) => {
  // JWTトークンの検証・認証 (失敗したら 401 Unauthorized を返す)
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 401 });

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
