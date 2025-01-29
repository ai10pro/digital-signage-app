import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { Tag } from "@prisma/client";

type RouteParams = {
  params: {
    id: string;
  };
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
