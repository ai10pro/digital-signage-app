"use client";

import PadButton from "@/app/_components/PadButton";
import { useRouter } from "next/navigation";

const buttonStyles: {
  [key: string]: {
    color: string;
    hoverColor: string;
    page: string;
    accessible: boolean;
  };
} = {
  ["サイネージ一覧"]: {
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    page: "/admin/contents",
    accessible: true,
  },
  ["サイネージ新規追加"]: {
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    page: "/admin/contents/new",
    accessible: true,
  },
  ["コンテンツユーザー一覧"]: {
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    page: "/admin/contentUser",
    accessible: true,
  },
  ["コンテンツユーザー新規追加"]: {
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
    page: "/admin/contentUser/new",
    accessible: true,
  },
  ["タグ新規追加"]: {
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    page: "/admin/tags/new",
    accessible: true,
  },
  ["タグ一覧"]: {
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
    page: "/admin/tags",
    accessible: true,
  },
};

const Page: React.FC = () => {
  const router = useRouter();

  const onClick = (name: string) => {
    if (buttonStyles[name].accessible) {
      router.push(buttonStyles[name].page);
    } else {
      return;
    }
  };

  return (
    <main>
      <div className="text-2xl font-bold">Main</div>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(buttonStyles).map(
          ([name, { color, hoverColor, accessible }]) => (
            <PadButton
              key={name}
              color={color}
              hoverColor={hoverColor}
              onClick={() => onClick(name)}
              accessible={accessible}
            >
              {name}
            </PadButton>
          )
        )}
      </div>
    </main>
  );
};

export default Page;
