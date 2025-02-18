type TagApiResponse = {
  id: string;
  name: string;
};

const fetchTags = async (
  setTags: Function,
  setFetchError: Function,
  setIsLoading: Function
) => {
  try {
    const requestUrl = `/api/tags`;
    const response = await fetch(requestUrl, {
      method: "GET",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("データの取得に失敗しました");
    }
    const tagsResponse: TagApiResponse[] = await response.json();
    setTags(
      tagsResponse.map((tag) => ({
        id: tag.id,
        name: tag.name,
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

export default fetchTags;
