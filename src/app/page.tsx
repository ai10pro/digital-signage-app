"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Content } from "@/app/_types/Content";

import PadButton from "@/app/_components/PadButton";
import ContentSummary from "@/app/_components/ContentSummary";

import dummyPosts from "./_mock/dummyContents";

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
  const [contents, setContetns] = useState<Content[] | null>(null);

  const router = useRouter();

  const onClick = (name: string) => {
    if (buttonStyles[name].accessible) {
      router.push(buttonStyles[name].page);
    } else {
      return;
    }
  };

  useEffect(() => {
    // 本来はウェブAPIを叩いてデータを取得するが、まずはモックデータを使用
    // (ネットからのデータ取得をシミュレートして１秒後にデータをセットする)
    const timer = setTimeout(() => {
      console.log("ウェブAPIからデータを取得しました (虚言)");
      setContetns(dummyPosts);
    }, 1000); // 1000ミリ秒 = 1秒

    // データ取得の途中でページ遷移したときにタイマーを解除する処理
    return () => clearTimeout(timer);
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
      <div className="grid grid-cols-4 gap-4">
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
      <div className="text-2xl font-bold mt-8">コンテンツ一覧表示</div>
      <div className="grid grid-cols-2 gap-4">
        {contents.map((content) => (
          <ContentSummary key={content.id} content={content} />
        ))}
      </div>
    </main>
  );
};

export default Page;
