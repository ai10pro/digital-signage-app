export type ContentUser = {
  id: string;
  contentId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    userImageURL: string;
  };
};
