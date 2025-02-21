// [admin]
// コンテンツユーザー一覧表示ページ
// 機能: コンテンツユーザー一覧表示⇒コンテンツユーザーの編集・削除
// コンテンツユーザーに含まれるコンテンツの表示もする。
// コンテンツユーザーを消したときに、そのコンテンツも消す。

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import type { User } from "@/app/_types/User";
import Link from "next/link";

type UserApiResponse = {
  id: number;
  name: string;
  userImageURL: string;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const router = useRouter();

  const [users, setUsers] = useState<User[] | null>(null);

  const fetchUsers = async () => {
    try {
      const requestUrl = "/api/users";
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setUsers(null);
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const apiResBody = (await response.json()) as UserApiResponse[];
      setUsers(
        apiResBody.map((body) => ({
          id: body.id.toString(),
          name: body.name,
          imageURL: body.userImageURL,
        }))
      );
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"ユーザー一覧取得に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      setFetchError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className={twMerge("animate-spin text-4xl text-blue-500")}
        />
      </div>
    );
  }

  const handleDeleteUser = async (userId: string) => {
    if (isSubmitting) {
      return;
    }

    if (!window.confirm("本当に削除しますか？")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const requestUrl = `/api/admin/users/${userId}`;
      const response = await fetch(requestUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      await fetchUsers();
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"ユーザー削除に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      alert(errorMsg);
    }
    setIsSubmitting(false);
  };

  if (!users) {
    return <div className="text-red-500">{fetchError}</div>;
  }

  console.log(users);
  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツユーザー一覧</div>

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
          ユーザー新規作成
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={twMerge(
              "group border border-slate-400 p-3 transition-shadow hover:shadow-lg"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={user.imageURL}
                  alt={user.name}
                  className="size-12 rounded-full"
                  width={50}
                  height={50}
                />
                <div className="font-bold">{user.name}</div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                  編集
                </Link>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
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
