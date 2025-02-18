"use Client";

import type { Content } from "@/app/_types/Content";
import Image from "next/image";
import { ContentApiResponse } from "../_types/ContentApiResponse";

type Props = {
  content: Content;
};

const ContentSummary = ({ content }: Props) => {
  console.log(content);
  return (
    <div className="rounded-lg border border-gray-300 shadow-md">
      <Image
        src={content.image.url}
        alt={content.title}
        width={300}
        height={200}
        className="rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{content.title}</h2>
        <p className="text-sm text-gray-500">{content.text}</p>
        <div className="flex space-x-2">
          {content.users.map((user) => (
            <span key={user.id} className="text-xs">
              {user.name}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {content.tags.map((tag) => (
            <span key={tag.id} className="text-xs">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSummary;
