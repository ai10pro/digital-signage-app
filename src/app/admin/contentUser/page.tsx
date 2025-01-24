// [admin]
// コンテンツユーザー一覧表示ページ
// 機能: コンテンツユーザー一覧表示⇒コンテンツユーザーの編集・削除
// コンテンツユーザーに含まれるコンテンツの表示もする。
// コンテンツユーザーを消したときに、そのコンテンツも消す。

"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツユーザー一覧</div>
    </main>
  );
};
export default Page;
