import { Content } from "@/app/_types/Content";

const dummyPosts: Content[] = [
  {
    id: "content-11111",
    title: "タイトル1",
    users: [
      {
        id: "user-11111",
        name: "ユーザー1",
        imageURL: "https://placehold.jp/150x150.png",
      },
    ],
    image: {
      url: "https://placehold.jp/1280x720.png",
      width: 1280,
      height: 720,
    },
    text: "本文1",
    tags: [
      {
        id: "tag-11111",
        name: "タグ1",
      },
      {
        id: "tag-22222",
        name: "タグ2",
      },
    ],
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "content-22222",
    title: "タイトル2",
    users: [
      {
        id: "user-22222",
        name: "ユーザー2",
        imageURL: "https://placehold.jp/150x150.png",
      },
    ],
    image: {
      url: "https://placehold.jp/1280x720.png",
      width: 1280,
      height: 720,
    },
    text: "本文2",
    tags: [
      {
        id: "tag-33333",
        name: "タグ3",
      },
      {
        id: "tag-44444",
        name: "タグ4",
      },
    ],
    createdAt: "2025-01-02T00:00:00.000Z",
  },
];

export default dummyPosts;
