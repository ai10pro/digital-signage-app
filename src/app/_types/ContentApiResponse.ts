export type ContentApiResponse = {
  id: string;
  title: string;
  image: string;
  text: string;
  users: {
    user: {
      id: string;
      name: string;
      userImageURL: string;
    };
  }[];
  tags: {
    tag: {
      id: string;
      name: string;
    };
  }[];
  createdAt: string;
};
