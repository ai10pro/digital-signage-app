import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Content } from "@prisma/client";

type RouteParams = {
  params: {
    id: string;
  };
};

type RequestBody = {
  title: string;
  text: string;
  coverImageURL: string;
  userIds: string[];
  tagIds: string[];
};

// [PUT] /api/admin/contents/[id] コンテンツの更新
export const PUT = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const requestBody: RequestBody = await req.json();

    const { title, text, coverImageURL, userIds, tagIds } = requestBody;

    // タグの存在確認
    if (tagIds.length > 0) {
      const tags = await prisma.tag.findMany({
        where: {
          id: { in: tagIds },
        },
      });
      if (tags.length !== tagIds.length) {
        return NextResponse.json(
          { error: "指定されたタグが存在しません" },
          { status: 400 }
        );
      }
    }

    // ユーザーの存在確認
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });
    if (users.length !== userIds.length) {
      return NextResponse.json(
        { error: "指定されたユーザーが存在しません" },
        { status: 400 }
      );
    }

    // 既存のcontentTags（中間テーブル）を削除
    await prisma.contentTags.deleteMany({
      where: {
        contentId: id,
      },
    });
    // 既存のcontentUsers（中間テーブル）を削除
    await prisma.contentsUser.deleteMany({
      where: {
        contentId: id,
      },
    });

    // contentテーブルの更新
    const content: Content = await prisma.content.update({
      where: { id },
      data: {
        title,
        text,
        coverImageURL,
      },
    });

    // contentTags（中間テーブル）にレコードを追加
    for (const tagId of tagIds) {
      await prisma.contentTags.create({
        data: {
          contentId: id,
          tagId: tagId,
        },
      });
    }

    // contentUsers（中間テーブル）にレコードを追加
    for (const user of users) {
      await prisma.contentsUser.create({
        data: {
          contentId: id,
          userId: user.id,
        },
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "コンテンツの更新に失敗しました" + error },
      { status: 500 }
    );
  }
};

// [DELETE] /api/admin/contents/[id] コンテンツの削除
export const DELETE = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const content: Content = await prisma.content.delete({ where: { id } });
    return NextResponse.json({ msg: `「${content.title}」を削除しました。` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの削除に失敗しました" },
      { status: 500 }
    );
  }
};
