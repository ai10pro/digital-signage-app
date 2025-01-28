import { Content } from "@/app/_types/Content";

const dummyPosts: Content[] = [
  {
    id: "content-11111",
    title: "タイトル1",
    user: {
      id: "user-11111",
      name: "ユーザー1",
      img: {
        url: "https://placehold.jp/3d4070/ffffff/200x200.png?text=icon-img%0A200x200",
        width: 200,
        height: 200,
      },
    },
    image: {
      url: "https://placehold.jp/1280x720.png",
      width: 1280,
      height: 720,
    },
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
    user: {
      id: "user-22222",
      name: "ユーザー2",
      img: {
        url: "https://placehold.jp/2cba35/ffffff/200x200.png?text=icon-img%0A200x200",
        width: 200,
        height: 200,
      },
    },
    image: {
      url: "https://placehold.jp/1280x720.png",
      width: 1280,
      height: 720,
    },
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
