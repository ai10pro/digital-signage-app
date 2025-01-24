// [admin]
// コンテンツ作成ページ
// 機能: コンテンツの作成
// 画像アップロード機能{初期：横（16:9）画像のみ、拡張：縦（9:16）画像のアップロード}

"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツ作成</div>
    </main>
  );
};
export default Page;
