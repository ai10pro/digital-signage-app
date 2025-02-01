"use client";

import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Header from "@/app/_components/Header";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return (
    <html lang="ja">
      <body>
        <Header />
        <div
          className={twMerge(
            "",
            isPlayerPage ? "mx-auto w-full" : "mx-4 mt-2 max-w-2xl md:mx-auto"
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
