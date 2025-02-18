// [player]
// サイネージページ
// 機能：サイネージの再生、停止、一時停止、次のコンテンツへの遷移

"use client";
import { useState, useEffect } from "react";

import ContentSummary from "@/app/_components/ContentSummary";
import SignageContentView from "../_components/SignageContentView";
import FetchContents from "@/app/_components/FetchContents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import type { ContentApiResponse } from "@/app/_types/ContentApiResponse";
import type { Content } from "@/app/_types/Content";

const Page: React.FC = () => {
  // ローディング状態・送信状態・エラー状態のState
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // コンテンツ一覧のState
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    FetchContents(setContents, setFetchError, setIsLoading);
  }, []);

  if (isLoading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center space-y-4">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-blue-500"
        />
      </main>
    );
  }
  if (fetchError) {
    return (
      <main className="flex h-screen flex-col items-center justify-center space-y-4">
        <div className="text-2xl font-bold text-red-500">{fetchError}</div>
      </main>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <main className="" style={{ height: "91vh" }}>
        <SignageContentView contents={contents} />
      </main>

      {/* information */}
      <footer className="flex h-[5vh] items-center bg-gray-800 p-4 text-2xl text-white">
        <div className="">
          <p className="my-auto">
            This is a scrolling text example. Add your information here. This is
            a scrolling text example. Add your information here.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
