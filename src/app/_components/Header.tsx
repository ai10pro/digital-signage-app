"use client";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return (
    <header>
      <div className="bg-slate-800 py-2">
        <div
          className={twMerge(
            isPlayerPage ? "mx-auto w-full" : "mx-4 max-w-2xl md:mx-auto",
            "flex items-center justify-between",
            "text-lg font-bold text-white"
          )}
        >
          <div>
            <FontAwesomeIcon icon={faDesktop} className="mr-1" />
            Header
          </div>
          {!isPlayerPage && <div className="text-sm text-gray-300">About</div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
