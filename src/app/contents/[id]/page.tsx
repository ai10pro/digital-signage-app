"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Content } from "@/app/_types/Content";
import dummyPosts from "@/app/_mock/dummyContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// コンテンツの詳細表示ページ (URL:/contents/[id])
const Page: React.FC = () => {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 動的ルートパラメータから 記事id を取得 （URL:/contents/[id]）
  const { id } = useParams() as { id: string };

  // コンポーネントが読み込まれたときに「1回だけ」実行する処理
  useEffect(() => {
    // 本来はウェブAPIを叩いてデータを取得するが、まずはモックデータを使用
    // (ネットからのデータ取得をシミュレートして１秒後にデータをセットする)
    setIsLoading(true);
    const timer = setTimeout(() => {
      console.log("ウェブAPIからデータを取得しました (虚言)");
      // dummyPosts から id に一致する投稿を取得してセット
      setContent(dummyPosts.find((post) => post.id === id) || null);
      setIsLoading(false);
    }, 1000);

    // データ取得の途中でページ遷移したときにタイマーを解除する処理
    return () => clearTimeout(timer);
  }, [id]);

  // 投稿データの取得中は「Loading...」を表示
  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  // 投稿データが取得できなかったらエラーメッセージを表示
  if (!content) {
    return <div>指定idのコンテンツ取得に失敗しました。</div>;
  }

  return (
    <main>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="my-auto mb-2 text-2xl font-bold">{content.title}</div>
          <div className="flex">
            <Image
              src={content.user.img.url}
              alt="User Icon"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="my-auto ml-2">{content.user.name}</div>
          </div>
        </div>
        <div className="flex">
          {content.tags.map((tag) => (
            <div
              key={tag.id}
              className="mr-2 rounded-md bg-gray-200 p-1 text-sm"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div>
          <Image
            src={content.image.url}
            alt="Example Image"
            width={content.image.width}
            height={content.image.height}
            priority
            className="rounded-xl"
          />
        </div>
        <div>{content.text}</div>
      </div>
    </main>
  );
};

export default Page;
