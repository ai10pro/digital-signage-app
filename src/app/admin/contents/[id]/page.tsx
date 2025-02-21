"use client";

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";

import fetchContents from "@/app/_components/FetchContents";
import fetchUsers from "@/app/_components/FetchUsers";
import fetchTags from "@/app/_components/FetchTags";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

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

// コンテンツのタグ選択用のデータ型
type SelectableTag = {
  id: string;
  name: string;
  isSelected: boolean;
};

// コンテンツのユーザー選択用のデータ型
type SelectableUser = {
  id: string;
  name: string;
  imageURL: string;
  isSelected: boolean;
};

type ContentApiResponse = {
  id: string;
  title: string;
  text: string;
  coverImageURL: string;
  createdAt: string;
  updatedAt: string;
  users: {
    user: {
      id: string;
      name: string;
      imageURL: string;
    };
  }[];
  tags: {
    tag: {
      id: string;
      name: string;
    };
  }[];
};

const Page: React.FC = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newCoverImageURL, setNewCoverImageURL] = useState<string>("");

  const [newTitleError, setNewTitleError] = useState<string | null>("");
  const [newTextError, setNewTextError] = useState<string | null>("");
  const [newCoverImageURLError, setNewCoverImageURLError] = useState<
    string | null
  >("");

  // const [content, setContent] = useState<RawApiContentResponse | null>(null);
  const [users, setUsers] = useState<RawApiUserResponse[] | null>(null);
  const [tags, setTags] = useState<SelectableTag[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // タグ配列（State）の更新処理
  const [checkableTags, setCheckableTags] = useState<SelectableTag[] | null>(
    []
  );
  // ユーザー配列（State）の更新処理
  const [checkableUsers, setCheckableUsers] = useState<SelectableUser[] | null>(
    []
  );
  // 編集前のコンテンツ情報
  const [content, setContent] = useState<ContentApiResponse | null>(null);

  // コンテンツの取得処理
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const requestUrl = `/api/contents/${id}`;
        const res = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          setContent(null);
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        const apiResBody = (await res.json()) as ContentApiResponse;
        setContent(apiResBody);
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? `投稿記事の取得に失敗しました: ${error.message}`
            : `予期せぬエラーが発生しました ${error}`;
        console.error(errorMsg);
        setFetchError(errorMsg);
      }
    };
    fetchContent();
  }, [id]);

  // ユーザー・タグの取得処理
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

  // コンテンツのデータ取得ができたら、各Stateに値をセット
  useEffect(() => {
    // 初期化済みなら戻る
    if (isInitialized) return;

    // コンテンツのデータが取得できていない場合は戻る
    if (!content || !checkableTags || !checkableUsers) return;

    // コンテンツのデータをStateにセット
    setNewTitle(content.title);
    setNewText(content.text);
    setNewCoverImageURL(content.coverImageURL);

    // タグの選択状態を更新
    const selectedTagIds = new Set(content.tags.map((tag) => tag.tag.id));
    setCheckableTags(
      checkableTags.map((tag) => ({
        ...tag,
        isSelected: selectedTagIds.has(tag.id),
      }))
    );

    // ユーザーの選択状態を更新
    if (content.users) {
      const selectedUserIds = new Set(
        content.users.map((user) => user.user.id)
      );
      setCheckableUsers(
        checkableUsers.map((user) => ({
          ...user,
          isSelected: selectedUserIds.has(user.id),
        }))
      );
    }

    setIsInitialized(true);
  }, [content, checkableTags, checkableUsers, isInitialized]);

  // checkBoxの選択状態を更新する関数
  const switchUserState = (userId: string) => {
    if (!checkableUsers) return;

    setCheckableUsers(
      checkableUsers.map((user) =>
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };
  const switchTagState = (tagId: string) => {
    if (!checkableTags) return;

    setCheckableTags(
      checkableTags.map((tag) =>
        tag.id === tagId ? { ...tag, isSelected: !tag.isSelected } : tag
      )
    );
  };

  const updateNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ☆ タイトルのバリテーション処理
    const title = e.target.value;
    setNewTitle(title);
    setNewTitleError(
      newTitle.length < 2 || newTitle.length > 32
        ? "2文字以上32文字以内で入力してください。"
        : ""
    );
  };

  const updateNewText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // ☆ 本文のバリテーション処理
    const text = e.target.value;
    setNewText(text);
    setNewTextError(newText.length < 2 ? "2文字以上入力してください。" : "");
  };

  const updateNewCoverImageURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ☆ カバーイメージURLのバリテーション処理
    const coverImageURL = e.target.value;
    setNewCoverImageURL(coverImageURL);
    setNewCoverImageURLError(
      !newCoverImageURL.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/)
        ? "有効なURLを入力してください。"
        : ""
    );
    console.log(newCoverImageURLError);
  };

  // 送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトの送信処理をキャンセル
    setIsSubmitting(true);

    try {
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
      const requestUrl = `/api/admin/contents/${id}`;
      console.log(`${requestUrl} => ${JSON.stringify(requestBody, null, 2)}`);
      const res = await fetch(requestUrl, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      setIsSubmitting(false);
      router.push("/admin/contents");
    } catch (error) {
      console.error(`エラーが発生しました: ${error}`);
      setIsSubmitting(false);
    }
  };

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!isInitialized || !checkableTags || !checkableUsers) {
    return <div>初期化中...</div>;
  }

  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      const requestUrl = `/api/admin/contents/${id}`;
      const res = await fetch(requestUrl, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      setIsSubmitting(false);
      router.push("/admin/contents");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `コンテンツの削除に失敗しました: ${error.message}`
          : `予期せぬエラーが発生しました ${error}`;
      console.error(errorMsg);
      window.alert(errorMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="mb-4 text-2xl font-bold">コンテンツの編集・削除</div>

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
            {checkableUsers.length > 0 ? (
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
            記事を更新
          </button>

          <button
            type="button"
            className={twMerge(
              "rounded-md px-5 py-1 font-bold",
              "bg-red-500 text-white hover:bg-red-600"
            )}
            onClick={handleDelete}
          >
            削除
          </button>
        </div>
      </form>
    </main>
  );
};
export default Page;
