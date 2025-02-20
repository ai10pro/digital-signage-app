// [admin]
// タグ作成ページ
// 機能: タグの作成

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import type { Tag } from "@/app/_types/Tag";

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

  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagNameError, setNewTagNameError] = useState<string>("");

  const [tags, setTags] = useState<Tag[] | null>(null);

  const fetchCategories = async () => {
    try {
      const requestUrl = "/api/tags";
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setTags(null);
        setFetchError("Failed to fetch tags");
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
      console.error(errorMsg);
      setFetchError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const requestUrl = "/api/admin/tags";
      const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTagName }),
      });
      console.log(res);
      if (!res.ok) {
        const errorMsg = await res.text();
        setNewTagNameError(errorMsg);
        return;
      }

      setNewTagName("");
      await fetchCategories();
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"タグ作成に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      console.error(errorMsg);
      setNewTagNameError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  if (!tags) {
    return <div className="text-red-500">{fetchError}</div>;
  }

  return (
    <main>
      <div className="text-2xl font-bold">Admin タグ作成</div>

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

      <form
        onSubmit={handleSubmit}
        className={twMerge("mb-4 space-y-4", isSubmitting && "opacity-50")}
      >
        <div className="space-y-1">
          <label htmlFor="name" className="block font-bold">
            名前
          </label>
          <input
            type="text"
            id="name"
            placeholder="タグ名を入力"
            value={newTagName}
            onChange={(e) => {
              setNewTagName(e.target.value);
              setNewTagNameError("");
            }}
            className={twMerge(
              "w-full rounded-md border border-gray-300 px-3 py-1",
              newTagNameError !== "" && "border-red-500"
            )}
          />
          {newTagNameError && (
            <div className="flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTagNameError}</div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={twMerge(
              "rounded-md px-5 py-1 font-bold",
              "bg-indigo-500 text-white hover:bg-indigo-600",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={
              isSubmitting || newTagNameError !== "" || newTagName === ""
            }
          >
            タグを作成
          </button>
        </div>
      </form>
      <div className="mb-2 text-2xl font-bold">作成されたタグの一覧</div>
      {tags.length === 0 ? (
        <div className="text-gray-500">タグは１つも作成されていません</div>
      ) : (
        <div className="">
          <div className="mb-2">
            クリックすると各タグの名前編集・削除に移動します。
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={twMerge(
                  "rounded-md px-2 py-0.5",
                  "border border-slate-400 text-slate-500"
                )}
              >
                <Link href={`/admin/categories/${tag.id}`}>{tag.name}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};
export default Page;
