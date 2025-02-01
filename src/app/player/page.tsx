// [player]
// サイネージページ
// 機能：サイネージの再生、停止、一時停止、次のコンテンツへの遷移

"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="text-2xl font-bold">Player サイネージ</div>
    </main>
  );
};

export default Page;
