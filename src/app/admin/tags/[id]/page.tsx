"use client";

import { useState, useEffect, isValidElement } from "react";
import { useRouter, useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

  const [currentTag, setCurrentTag] = useState<string | undefined>(undefined);

  // パラメーターからIDを取得
  const { id } = useParams();

  const router = useRouter();

  const [tags, setTags] = useState<Tag[] | null>(null);

  const fetchTags = async () => {
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
    fetchTags();
  }, []);

  useEffect(() => {
    const currentTag = tags?.find((c) => c.id === id);
    if (currentTag !== undefined) {
      setCurrentTag(currentTag.name);
    }
  }, [tags, id]);

  const isValidTagName = (name: string): string => {
    if (name.length < 2 || name.length > 16) {
      return "タグ名は2文字以上16文字以下で入力してください";
    }
    if (tags && tags.some((c) => c.name === name)) {
      return "既に存在するタグ名です";
    }
    return "";
  };

  const updateNewTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagNameError(isValidTagName(e.target.value));
    setNewTagName(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const requestUrl = `/api/admin/tags/${id}`;
      const res = await fetch(requestUrl, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTagName }),
      });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      setNewTagName("");
      await fetchTags(); // カテゴリ一覧を再取得
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `カテゴリの更新に失敗しました: ${error.message}`
          : `予期せぬエラーが発生しました ${error}`;
      console.error(errorMsg);
      setFetchError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // カテゴリをウェブAPIから取得中の画面
  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  // カテゴリをウェブAPIから取得することに失敗したときの画面
  if (!tags) {
    return <div className="text-red-500">{fetchError}</div>;
  }

  // プレースホルダのid一致するカテゴリが存在しないときの画面
  if (!tags.some((c) => c.id === id)) {
    return <div className="text-red-500">指定されたカテゴリが存在しません</div>;
  }

  return (
    <main>
      <div className="mb-4 text-2xl font-bold">カテゴリの編集・削除</div>

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
          <label htmlFor="newTagName" className="block">
            カテゴリ名
          </label>
          <input
            id="newTagName"
            type="text"
            value={newTagName}
            onChange={updateNewTagName}
            className={twMerge(
              "w-full rounded-md border px-2 py-1",
              newTagNameError ? "border-red-500" : "border-gray-300"
            )}
          />
          {newTagNameError && (
            <div className="text-red-500">{newTagNameError}</div>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            disabled={newTagNameError !== ""}
          >
            更新
          </button>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={async () => {
              if (confirm("本当に削除しますか？")) {
                try {
                  const requestUrl = `/api/admin/tags/${id}`;
                  const res = await fetch(requestUrl, {
                    method: "DELETE",
                    cache: "no-cache",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  if (!res.ok) {
                    throw new Error(`${res.status}: ${res.statusText}`);
                  }

                  await fetchTags(); // カテゴリ一覧を再取得
                  router.push("/admin/tags");
                } catch (error) {
                  const errorMsg =
                    error instanceof Error
                      ? `カテゴリの削除に失敗しました: ${error.message}`
                      : `予期せぬエラーが発生しました ${error}`;
                  console.error(errorMsg);
                  setFetchError(errorMsg);
                }
              }
            }}
          >
            削除
          </button>
        </div>
      </form>
    </main>
  );
};

export default Page;
