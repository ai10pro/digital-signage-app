// [admin]
// タグ一覧表示ページ
// 機能: タグ一覧表示⇒タグの編集・削除

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import type { Tag } from "@/app/_types/Tag";
import Link from "next/link";

type TagApiResponse = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const router = useRouter();

  const [tags, setTags] = useState<Tag[] | null>(null);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const requestUrl = "/api/tags";
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setTags(null);
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const apiResBody = (await response.json()) as TagApiResponse[];
      setTags(
        apiResBody.map((body) => ({
          id: body.id.toString(),
          name: body.name,
        }))
      );
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"タグ一覧取得に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      setFetchError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("削除してよろしいですか？")) {
      return;
    }
    setIsSubmitting(true);
    try {
      const requestUrl = `/api/admin/tags/${id}`;
      const response = await fetch(requestUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      await fetchTags();
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"タグ削除に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tags) {
    return <div className="text-red-500">{fetchError}</div>;
  }

  return (
    <main>
      <div className="text-2xl font-bold">Admin タグ一覧表示</div>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex items-center rounded-lg bg-white px-8 py-4 shadow-lg">
            <FontAwesomeIcon
              icon={faSpinner}
              className="mr-2 animate-spin text-gray-500"
            />
            <div className="flex items-center text-gray-500">処理中...</div>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-4">
        <Link
          href="/admin/tags/new"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          タグ新規作成
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={twMerge(
              "group border border-slate-400 p-3 transition-shadow hover:shadow-lg"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{tag.name}</div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/tags/${tag.id}`}
                  className="text-blue-500 group-hover:text-blue-700"
                >
                  <button
                    type="button"
                    className={twMerge(
                      "rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                    )}
                  >
                    編集
                  </button>
                </Link>
                <button
                  type="button"
                  className={twMerge(
                    "rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  )}
                  onClick={() => handleDelete(tag.id)}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Page;
