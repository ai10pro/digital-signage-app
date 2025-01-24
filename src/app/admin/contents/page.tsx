// [admin]
// コンテンツ一覧表示ページ
// 機能: コンテンツ一覧表示⇒コンテンツの編集・削除

"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツ一覧</div>
    </main>
  );
};
export default Page;
