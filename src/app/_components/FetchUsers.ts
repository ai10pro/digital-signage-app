type UserApiResponse = {
  id: string;
  name: string;
  userImageURL: string;
};

const fetchUsers = async (
  setUsers: Function,
  setFetchError: Function,
  setIsLoading: Function
) => {
  try {
    const requestUrl = `/api/users`;
    const response = await fetch(requestUrl, {
      method: "GET",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("データの取得に失敗しました");
    }
    const usersResponse: UserApiResponse[] = await response.json();
    setUsers(
      usersResponse.map((user) => ({
        id: user.id,
        name: user.name,
        imageURL: user.userImageURL,
      }))
    );
    // console.log(usersResponse);
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `"ユーザー一覧取得に失敗しました": ${error.message}`
        : "予期せぬエラーが発生しました";
    console.error(errorMsg);
    setFetchError(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

export default fetchUsers;
