"use Client";

import type { Content } from "@/app/_types/Content";
import Image from "next/image";
import { ContentApiResponse } from "../_types/ContentApiResponse";

type Props = {
  content: ContentApiResponse;
};

const AdminContentSummary = ({ content }: Props) => {
  return (
    <div className="flex justify-between rounded-lg border border-gray-300 shadow-md">
      {/* タイトル */}
      <div className="font-bold">{content.title}</div>
      {/* タグ */}
      <div className="flex">
        {content.tags.map((tag) => (
          <span key={tag.id} className="text-xs">
            {tag.name}
          </span>
        ))}
      </div>
      {/* ユーザー */}
      <div className="flex">
        <Image
          src={content.users[0].img.url}
          alt={content.users[0].name}
          width={50}
          height={50}
          className="rounded-t-lg"
        ></Image>
        <div className="">{content.users[0].name}</div>
      </div>
    </div>
  );
};

export default AdminContentSummary;
