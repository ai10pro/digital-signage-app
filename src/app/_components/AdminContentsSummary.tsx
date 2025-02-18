"use Client";

import type { Content } from "@/app/_types/Content";
import Image from "next/image";

import { useRouter } from "next/navigation";

type Props = {
  content: Content;
};

const AdminContentSummary: React.FC<Props> = (props) => {
  const { content } = props;
  const router = useRouter();

  return (
    <>
      <div className="my-2 flex h-1/6 justify-between rounded-lg border border-gray-300 py-2 shadow-md">
        <div className="flex ">
          {/* タイトル */}
          <div className="my-auto flex h-8 w-72 items-center p-1 pl-3 text-xl font-bold">
            {content.title}
          </div>

          {/* タグ */}
          <div className="my-auto flex w-32 flex-wrap items-center space-x-1 p-1 text-base">
            {content.tags.map((tag) => (
              <div
                key={tag.id}
                className="h-7 items-center rounded-lg bg-gray-200 p-1 text-sm"
              >
                {tag.name}
              </div>
            ))}
          </div>

          {/* ユーザー */}
          <div className="my-auto flex w-40 items-center p-1 text-base">
            <Image
              src={content.users[0].imageURL}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            ></Image>
            <div className="my-auto pl-2 text-xl">{content.users[0].name}</div>
          </div>
        </div>
        <>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => router.push(`/admin/contents/${content.id}`)}
          >
            編集
          </button>
          <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
            削除
          </button>
        </>
      </div>
    </>
  );
};

export default AdminContentSummary;
