import { Tag } from "./Tag";
import { ContentUser } from "./ContentUser";

export type ContentApiResponse = {
  id: string;
  title: string;
  text: string;
  coverImageURL: string;
  users: ContentUser[];
  tags: Tag[];
  createdAt: string;
};
