"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import type { User } from "@/app/_types/User";
import Image from "next/image";

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

  const { id } = useParams();
  const router = useRouter();

  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserNameError, setNewUserNameError] = useState<string>("");
  const [newUserImageURL, setNewUserImageURL] = useState<string>("");
  const [newUserImageURLError, setNewUserImageURLError] = useState<string>("");

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
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

  useEffect(() => {
    const currentUser = users?.find((c) => c.id === id);
    if (currentUser !== undefined) {
      setCurrentUser(currentUser);
      setNewUserName(currentUser.name);
      setNewUserImageURL(currentUser.imageURL);
      setNewUserNameError("");
      setNewUserImageURLError("");
    }
  }, [users, id]);

  const isValidUserName = (name: string): string => {
    if (name.length < 2 || name.length > 16) {
      return "ユーザー名は2文字以上16文字以下で入力してください";
    }
    if (users && users.some((c) => c.name === name)) {
      return "既に存在するユーザー名です";
    }
    return "";
  };

  const updateNewUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserNameError(isValidUserName(e.target.value));
    setNewUserName(e.target.value);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestUrl = `/api/admin/users/${id}`;
      const res = await fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUserName,
          userImageURL: newUserImageURL,
        }),
      });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      setNewUserNameError("");
      setNewUserImageURLError("");
      await fetchUsers();
      router.push("/admin/contentUser");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `ユーザーの更新に失敗しました: ${error.message}`
          : `予期せぬエラーが発生しました ${error}`;
      console.log(errorMsg);
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
          className={twMerge("animate-spin text-4xl text-blue-500")}
        />
      </div>
    );
  }

  if (!users) {
    return <div className="text-red-500">{fetchError}</div>;
  }

  if (!users.some((c) => c.id === id)) {
    return <div className="text-red-500">指定されたカテゴリが存在しません</div>;
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

  return (
    <main>
      <div className="mb-4 text-2xl font-bold">ユーザーの編集・削除</div>

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
            ユーザー名
            {currentUser != undefined && (
              <span className="text-sm text-gray-500">
                {" "}
                (現在の名前: {currentUser.name})
              </span>
            )}
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
        </div>
        <div className="flex min-w-full justify-around space-y-1">
          <div>
            <Image
              src={newUserImageURL}
              alt={newUserName}
              width={150}
              height={150}
              className="min-w-full rounded-full"
            />
          </div>
          <div className="m-1 ml-3 max-w-md">
            <label htmlFor="newUserImageURL" className="block">
              画像URL
              {currentUser != undefined && (
                <span className="text-sm text-gray-500">
                  {" "}
                  (現在のURL: {currentUser.imageURL})
                </span>
              )}
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
        <div className="flex space-x-4">
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            disabled={newUserNameError !== "" || newUserImageURLError !== ""}
          >
            更新
          </button>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={() => currentUser?.id && handleDeleteUser(currentUser.id)}
          >
            削除
          </button>
        </div>
      </form>
    </main>
  );
};

export default Page;
