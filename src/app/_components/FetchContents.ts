import type { ContentApiResponse } from "@/app/_types/ContentApiResponse";

const fetchContents = async (
  setContents: Function,
  setFetchError: Function,
  setIsLoading: Function
) => {
  try {
    const requestUrl = `/api/contents`;
    const response = await fetch(requestUrl, {
      method: "GET",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("データの取得に失敗しました");
    }
    const contentsResponse: ContentApiResponse[] = await response.json();
    setContents(
      contentsResponse.map((content) => ({
        id: content.id,
        title: content.title,
        text: content.text,
        coverImageURL: content.coverImageURL,
        users: content.users,
        tags: content.tags,
        createdAt: content.createdAt,
      }))
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `"コンテンツ一覧取得に失敗しました": ${error.message}`
        : "予期せぬエラーが発生しました";
    console.error(errorMsg);
    setFetchError(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

export default fetchContents;
