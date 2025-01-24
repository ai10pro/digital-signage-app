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
  ["サイネージ新規追加"]: {
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    page: "/page1",
    accessible: true,
  },
  ["サイネージ一覧"]: {
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    page: "/page2",
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
      <div className="justify-space-around space-x-5">
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
