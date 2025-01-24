// [admin]
// タグ一覧表示ページ
// 機能: タグ一覧表示⇒タグの編集・削除

"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="text-2xl font-bold">Admin タグ一覧表示</div>
    </main>
  );
};
export default Page;
