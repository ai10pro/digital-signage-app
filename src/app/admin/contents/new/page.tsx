// [admin]
// コンテンツ作成ページ
// 機能: コンテンツの作成
// 画像アップロード機能{初期：横（16:9）画像のみ、拡張：縦（9:16）画像のアップロード}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/app/_hooks/useAuth";

// タグをフェッチしたときのレスポンスのデータ型
type RawApiTagResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// ユーザーをフェッチしたときのレスポンスのデータ型
type RawApiUserResponse = {
  id: string;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
};

type SelectableTag = {
  id: string;
  name: string;
  isSelected: boolean;
};

type SelectableUser = {
  id: string;
  name: string;
  isSelected: boolean;
};

const Page: React.FC = () => {
  const { token } = useAuth(); // tokenの取得

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newCoverImageURL, setNewCoverImageURL] = useState("");
  const [newTitleError, setNewTitleError] = useState<string | null>("");
  const [newTextError, setNewTextError] = useState<string | null>("");
  const [newCoverImageURLError, setNewCoverImageURLError] = useState<
    string | null
  >("");

  const [checkableTags, setCheckableTags] = useState<SelectableTag[] | null>(
    []
  );
  const [checkableUsers, setCheckableUsers] = useState<SelectableUser[] | null>(
    []
  );
  // タグとユーザーの選択肢をフェッチ
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const requestUrl = "/api/users";
        const res = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          setCheckableUsers(null);
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        const apiResBody = (await res.json()) as RawApiUserResponse[];
        setCheckableUsers(
          apiResBody.map((user) => ({
            id: user.id,
            name: user.name,
            imageURL: user.imageURL,
            isSelected: false,
          }))
        );
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? `ユーザーの取得に失敗しました: ${error.message}`
            : `予期せぬエラーが発生しました ${error}`;
        console.error(errorMsg);
        setFetchError(errorMsg);
      }
    };
    const fetchTags = async () => {
      try {
        const requestUrl = "/api/tags";
        const res = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          setCheckableTags(null);
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        const apiResBody = (await res.json()) as RawApiTagResponse[];
        setCheckableTags(
          apiResBody.map((tag) => ({
            id: tag.id,
            name: tag.name,
            isSelected: false,
          }))
        );
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? `タグの取得に失敗しました: ${error.message}`
            : `予期せぬエラーが発生しました ${error}`;
        console.error(errorMsg);
        setFetchError(errorMsg);
      }
    };
    fetchUsers();
    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!token) {
        window.alert("予期せぬ動作：トークンが取得できません");
        return;
      }
      const requestBody = {
        title: newTitle,
        text: newText,
        coverImageURL: newCoverImageURL,
        userIds: checkableUsers
          ? checkableUsers
              .filter((user) => user.isSelected)
              .map((user) => user.id)
          : [],
        tagIds: checkableTags
          ? checkableTags.filter((tag) => tag.isSelected).map((tag) => tag.id)
          : [],
      };
      const res = await fetch("/api/admin/contents", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // ◀ 追加
        },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      router.push("/admin/contents");
      setIsSubmitting(false);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `コンテンツの作成に失敗しました: ${error.message}`
          : `予期せぬエラーが発生しました ${error}`;
      console.error(errorMsg);
      setIsSubmitting(false);
    }
  };

  const updateNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // タイトルのバリデーション
    setNewTitle(e.target.value);
  };

  const updateNewText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 本文のバリデーション
    setNewText(e.target.value);
  };

  const updateNewCoverImageURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    // カバーイメージのバリデーション
    setNewCoverImageURL(e.target.value);
  };

  const switchTagState = (tagId: string) => {
    if (!checkableTags) return;
    setCheckableTags(
      checkableTags.map((tag) =>
        tag.id === tagId ? { ...tag, isSelected: !tag.isSelected } : tag
      )
    );
  };

  const switchUserState = (userId: string) => {
    if (!checkableUsers) return;
    setCheckableUsers(
      checkableUsers.map((user) =>
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };
  return (
    <main>
      <div className="text-2xl font-bold">Admin コンテンツ作成</div>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex items-center rounded-lg bg-white px-8 py-4 shadow-lg">
            <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />
            <div className="ml-4">送信中...</div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={twMerge("space-y-4", isSubmitting && "opacity-50")}
      >
        <div className="space-y-1">
          <label htmlFor="title" className="block font-bold">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full rounded-md border-2 px-2 py-1"
            value={newTitle}
            onChange={updateNewTitle}
            placeholder="タイトルを記入してください"
            required
          />
          {newTitleError && (
            <div className="flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span>{newTitleError}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="content" className="block font-bold">
            本文
          </label>
          <textarea
            id="content"
            name="content"
            className="h-48 w-full rounded-md border-2 px-2 py-1"
            value={newText}
            onChange={updateNewText}
            placeholder="本文を記入してください"
            required
          />
          {newTextError && (
            <div className="flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span>{newTextError}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="coverImageURL" className="block font-bold">
            カバーイメージ (URL)
          </label>
          <input
            type="url"
            id="coverImageURL"
            name="coverImageURL"
            className="w-full rounded-md border-2 px-2 py-1"
            value={newCoverImageURL}
            onChange={updateNewCoverImageURL}
            placeholder="カバーイメージのURLを記入してください"
            required
          />
          {newCoverImageURLError && (
            <div className="flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span>{newCoverImageURLError}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="font-bold">ユーザー</div>
          <div className="flex flex-wrap gap-x-3.5">
            {checkableUsers && checkableUsers.length > 0 ? (
              checkableUsers.map((chUser) => (
                <label key={chUser.id} className="flex space-x-1">
                  <input
                    type="checkbox"
                    name="users"
                    value={chUser.id}
                    className="rounded-md"
                    onChange={() => switchUserState(chUser.id)}
                    checked={chUser.isSelected}
                  />
                  <span className="cursor-pointer">{chUser.name}</span>
                </label>
              ))
            ) : (
              <div className="">選択可能なユーザーが存在しません</div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="font-bold">タグ</div>
          <div className="flex flex-wrap gap-x-3.5">
            {checkableTags ? (
              checkableTags.map((tag) => (
                <label key={tag.id} className="flex space-x-1">
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag.id}
                    className="rounded-md"
                    onChange={() => switchTagState(tag.id)}
                    checked={tag.isSelected}
                  />
                  <span className="cursor-pointer">{tag.name}</span>
                </label>
              ))
            ) : (
              <div className="">選択可能なタグが存在しません</div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className={twMerge(
              "rounded-md px-5 py-1 font-bold",
              "bg-indigo-500 text-white hover:bg-indigo-600",
              "disabled:cursor-not-allowed"
            )}
            disabled={
              newTitleError !== "" ||
              newTextError !== "" ||
              newCoverImageURLError !== ""
            }
          >
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
export default Page;
