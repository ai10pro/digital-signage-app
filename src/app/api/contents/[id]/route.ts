import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

type RouterParams = {
  params: {
    id: string;
  };
};

export const GET = async (req: NextRequest, routeParams: RouterParams) => {
  try {
    const id = routeParams.params.id;

    const content = await prisma.content.findUnique({
      where: { id },
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

    if (!content) {
      return NextResponse.json(
        { error: "コンテンツが見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "コンテンツの取得に失敗しました" },
      { status: 500 }
    );
  }
};
