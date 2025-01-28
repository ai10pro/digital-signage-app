import { ContentUser } from "./ContentUser";
import { ContentImage } from "./ContentImage";
import { Tag } from "./Tag";

export type Content = {
  id: string;
  title: string;
  user: ContentUser;
  image: ContentImage;
  text: string;
  tags: Tag[];
  createdAt: string;
};
