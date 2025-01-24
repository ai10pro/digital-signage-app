"use Client";

import type { Content } from "@/app/_types/Content";
import Image from "next/image";

type Props = {
  content: Content;
};

const ContentSummary = ({ content }: Props) => {
  return (
    <div className="w-full">
      <Image
        src={content.image.url}
        alt={content.title}
        width={content.image.width}
        height={content.image.height}
      />
      <h2>{content.title}</h2>
      <p>投稿者: {content.user.name}</p>
      <p>タグ: {content.tags.map((tag) => tag.name).join(", ")}</p>
      <p>投稿日: {new Date(content.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ContentSummary;
