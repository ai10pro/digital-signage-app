"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ContentApiResponse } from "./_types/ContentApiResponse";

import PadButton from "@/app/_components/PadButton";
import ContentSummary from "@/app/_components/ContentSummary";

import fetchContents from "./_components/FetchContents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const buttonStyles: {
  [key: string]: {
    color: string;
    hoverColor: string;
    page: string;
    accessible: boolean;
  };
} = {
  ["サイネージ一覧"]: {
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    page: "/admin/contents",
    accessible: true,
  },
  ["サイネージ新規追加"]: {
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    page: "/admin/contents/new",
    accessible: true,
  },
  ["コンテンツユーザー一覧"]: {
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    page: "/admin/contentUser",
    accessible: true,
  },
  ["コンテンツユーザー新規追加"]: {
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
    page: "/admin/contentUser/new",
    accessible: true,
  },
  ["タグ新規追加"]: {
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    page: "/admin/tags/new",
    accessible: true,
  },
  ["タグ一覧"]: {
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
    page: "/admin/tags",
    accessible: true,
  },
};

const Page: React.FC = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contents, setContetns] = useState<ContentApiResponse[] | null>(null);

  const router = useRouter();

  const onClick = (name: string) => {
    if (buttonStyles[name].accessible) {
      router.push(buttonStyles[name].page);
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log("FetchContents executed");
    fetchContents(setContetns, setFetchError, setIsLoading);
  }, []);

  // 投稿データが取得できるまでは「Loading...」を表示
  if (!contents) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <main>
      <div className="text-2xl font-bold">Main</div>
      <div className="mx-2 flex flex-wrap justify-start">
        {Object.entries(buttonStyles).map(
          ([name, { color, hoverColor, accessible }]) => (
            <PadButton
              key={name}
              color={color}
              hoverColor={hoverColor}
              onClick={() => onClick(name)}
              accessible={accessible}
            >
              {name}
            </PadButton>
          )
        )}
      </div>
      {/* コンテンツ一覧表示 */}
      <div className="mt-8 w-full text-2xl font-bold">コンテンツ一覧表示</div>
      <div className="-mx-2 flex flex-wrap justify-around">
        {contents.map((content) => (
          <ContentSummary key={content.id} content={content} />
        ))}
      </div>
    </main>
  );
};

export default Page;
