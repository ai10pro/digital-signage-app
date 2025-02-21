// [admin]
// コンテンツユーザー作成ページ
// 機能: コンテンツユーザーの作成

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import type { User } from "@/app/_types/User";

import { useAuth } from "@/app/_hooks/useAuth";

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

  const route = useRouter();
  const { token } = useAuth();

  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserNameError, setNewUserNameError] = useState<string>("");
  const [newUserImageURL, setNewUserImageURL] = useState<string>("");
  const [newUserImageURLError, setNewUserImageURLError] = useState<string>("");

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

  const isValidUserName = (name: string) => {
    if (name.length < 2 || name.length > 16) {
      return "ユーザー名は2文字以上16文字以下で入力してください";
    }
    return "";
  };

  const updateNewUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserNameError(isValidUserName(event.target.value));
    setNewUserName(event.target.value);
  };

  const isValidUserImageURL = (url: string): string => {
    if (url.length < 1 || url.length > 255) {
      return "画像URLは1文字以上255文字以下で入力してください";
    }
    return "";
  };

  const updateNewUserImageURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserImageURLError(isValidUserImageURL(e.target.value));
    setNewUserImageURL(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!token) {
        window.alert("予期せぬ動作：トークンが取得できません。");
        return;
      }
      const requestUrl = "/api/admin/users";
      const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // ◀ 追加
        },
        body: JSON.stringify({
          name: newUserName,
          userImageURL: newUserImageURL,
        }),
      });
      console.log(res);
      if (!res.ok) {
        const errorMsg = await res.text();
        setNewUserNameError(errorMsg);
        return;
      }

      setNewUserName("");
      setNewUserImageURL("");
      await fetchUsers();
      route.push("/admin/contentUser");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `"ユーザー作成に失敗しました": ${error.message}`
          : "予期せぬエラーが発生しました";
      console.error(errorMsg);
      setFetchError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-4xl text-gray-400"
        />
      </div>
    );
  }

  if (!users) {
    return (
      <div className="text-red-500">
        <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1" />
        {fetchError}
      </div>
    );
  }

  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツユーザー作成</div>
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
            value={newUserName}
            onChange={updateNewUserName}
            className={twMerge(
              "w-full rounded-md border px-2 py-1",
              newUserNameError ? "border-red-500" : "border-gray-300"
            )}
          />
          {newUserNameError && (
            <div className="flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-sm"
              />
              {newUserNameError}
            </div>
          )}
        </div>
        <div className="flex min-w-full justify-around space-y-1">
          <div
            className={twMerge(
              "flex size-36 items-center justify-center rounded-full border-2 border-gray-300",
              newUserImageURLError ? "border-red-500" : "border-gray-300"
            )}
          >
            <Image
              src={newUserImageURL}
              alt={newUserName}
              width={150}
              height={150}
              className="min-w-full rounded-full"
            />
          </div>
          <div className="m-1 ml-3 w-full max-w-md">
            <label htmlFor="newUserImageURL" className="block">
              画像URL
            </label>
            <input
              id="newUserImageURL"
              type="text"
              value={newUserImageURL}
              onChange={updateNewUserImageURL}
              className={twMerge(
                "w-full rounded-md border px-2 py-1",
                newUserImageURLError ? "border-red-500" : "border-gray-300"
              )}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            disabled={newUserNameError !== "" || newUserImageURLError !== ""}
          >
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
export default Page;
