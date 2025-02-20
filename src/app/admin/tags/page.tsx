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
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main>
      <div className="text-2xl font-bold">Admin タグ一覧表示</div>
    </main>
  );
};
export default Page;
