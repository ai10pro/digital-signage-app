import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { User } from "@prisma/client";

type RouteParams = {
  params: {
    id: string;
  };
};

type RequestBody = {
  name: string;
};

// [PUT] /api/admin/user/[id] ユーザーの更新
export const PUT = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const { name }: RequestBody = await req.json();
    const user: User = await prisma.user.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "ユーザー名の更新に失敗しました" },
      { status: 500 }
    );
  }
};

// [DELETE] /api/admin/tags/[id] タグの削除
export const DELETE = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const user: User = await prisma.user.delete({ where: { id } });
    return NextResponse.json({ msg: `「${user.name}」を削除しました。` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの削除に失敗しました" },
      { status: 500 }
    );
  }
};
