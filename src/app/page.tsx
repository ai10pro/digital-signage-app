"use client";

import PadButton from "@/app/_components/PadButton";
import { useRouter } from "next/navigation";

const buttonStyles: {
  [key: string]: { color: string; page: string; accessible: boolean };
} = {
  ["サイネージ新規追加"]: {
    color: "bg-red-500",
    page: "/page1",
    accessible: true,
  },
  ["サイネージ一覧"]: {
    color: "bg-green-500",
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
        {Object.entries(buttonStyles).map(([name, { color, accessible }]) => (
          <PadButton
            key={name}
            color={color}
            onClick={() => onClick(name)}
            accessible={accessible}
          >
            {name}
          </PadButton>
        ))}
      </div>
    </main>
  );
};

export default Page;
