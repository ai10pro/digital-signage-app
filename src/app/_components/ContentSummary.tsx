"use Client";

import type { Content } from "@/app/_types/Content";
import Image from "next/image";

type Props = {
  content: Content;
};

const ContentSummary = ({ content }: Props) => {
  return (
    <div className="my-2 max-w-xs">
      <Image
        src={content.image.url}
        alt={content.title}
        width={content.image.width}
        height={content.image.height}
      />
      <h2>{content.title}</h2>
      <div className="flex space-x-3">
        <Image
          className="rounded-full"
          src={content.user.img.url}
          alt={content.user.name}
          width={50}
          height={50}
        />
        <p className="my-auto">{content.user.name}</p>
      </div>
      <p>投稿者: {content.user.name}</p>
      <p>タグ: {content.tags.map((tag) => tag.name).join(", ")}</p>
      <p>投稿日: {new Date(content.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ContentSummary;
