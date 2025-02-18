import { ContentImage } from "./ContentImage";
import { Tag } from "./Tag";
import { User } from "./User";

export type Content = {
  id: string;
  title: string;
  image: ContentImage;
  text: string;
  users: User[];
  tags: Tag[];
  createdAt: string;
};
