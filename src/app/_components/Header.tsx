"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return (
    <header className="">
      <div className="flex h-[4vh] items-center bg-slate-800 py-2">
        <div
          className={twMerge(
            isPlayerPage ? "mx-auto w-full" : "mx-4 max-w-2xl md:mx-auto",
            "flex w-full items-center justify-between px-4",
            "text-lg font-bold text-white"
          )}
        >
          <div>
            <Link href="/">
              <FontAwesomeIcon icon={faDesktop} className="mr-1" />
              Header
            </Link>
          </div>
          {!isPlayerPage && <div className="text-sm text-gray-300">About</div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
