import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Content } from "@prisma/client";

import { supabase } from "@/utils/supabase";

type RequestBody = {
  title: string;
  text: string;
  coverImageURL: string;
  userIds: string[];
  tagIds: string[];
};

export const POST = async (req: NextRequest) => {
  try {
    const requestBody: RequestBody = await req.json();

    const token = req.headers.get("Authorization") ?? "";
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // 分割代入
    const { title, text, coverImageURL, userIds, tagIds } = requestBody;

    // users で指定されるユーザーが存在するか確認
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
    if (users.length !== userIds.length) {
      return NextResponse.json(
        { error: "ユーザーが存在しません" },
        { status: 400 }
      );
    }

    // tags で指定されるタグが存在するか確認
    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagIds,
        },
      },
    });
    if (tags.length !== tagIds.length) {
      return NextResponse.json(
        { error: "タグが存在しません" },
        { status: 400 }
      );
    }

    // コンテンツの作成
    const content: Content = await prisma.content.create({
      data: {
        title,
        text,
        coverImageURL,
      },
    });

    // 中間テーブルの作成
    for (const userId of userIds) {
      await prisma.contentsUser.create({
        data: {
          userId,
          contentId: content.id,
        },
      });
    }
    for (const tagId of tagIds) {
      await prisma.contentTags.create({
        data: {
          tagId,
          contentId: content.id,
        },
      });
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "コンテンツの作成に失敗しました" },
      { status: 500 }
    );
  }
};
