// [admin]
// コンテンツ一覧表示ページ
// 機能: コンテンツ一覧表示⇒コンテンツの編集・削除

"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import AdminContentsSummary from "@/app/_components/AdminContentsSummary";
import type { ContentApiResponse } from "@/app/_types/ContentApiResponse";
import type { Content } from "@/app/_types/Content";
import fetchContents from "@/app/_components/FetchContents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contents, setContetns] = useState<Content[] | null>(null);

  useEffect(() => {
    fetchContents(setContetns, setFetchError, setIsLoading);
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
    <main>
      <div className="text-2xl font-bold">Admin コンテンツ一覧</div>
      <div className="mt-4">
        {contents &&
          contents.map((content) => (
            <AdminContentsSummary key={content.id} content={content} />
          ))}
      </div>
    </main>
  );
};
export default Page;
