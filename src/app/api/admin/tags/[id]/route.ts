import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Tag } from "@prisma/client";

type RouteParams = {
  params: {
    id: string;
  };
};

type RequestBody = {
  name: string;
};

// [PUT] /api/admin/tags/[id] タグの更新
export const PUT = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const { name }: RequestBody = await req.json();
    const tag: Tag = await prisma.tag.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(tag);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの更新に失敗しました" },
      { status: 500 }
    );
  }
};

// [DELETE] /api/admin/tags/[id] タグの削除
export const DELETE = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const tag: Tag = await prisma.tag.delete({ where: { id } });
    return NextResponse.json({ msg: `「${tag.name}」を削除しました。` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "タグの削除に失敗しました" },
      { status: 500 }
    );
  }
};
