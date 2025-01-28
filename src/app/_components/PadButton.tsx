"use client";
import { access } from "fs";
import { twMerge } from "tailwind-merge";

interface PadButtonProps {
  color: string;
  hoverColor: string;
  onClick: () => void;
  accessible: boolean;
  children?: React.ReactNode;
}

const PadButton: React.FC<PadButtonProps> = ({
  color,
  hoverColor,
  onClick,
  accessible,
  children,
}) => {
  return (
    <button
      className={twMerge(
        "m-1 h-20 w-28 p-2 sm:h-32 sm:w-40",
        "rounded-lg shadow-md",
        "text-white",
        accessible
          ? twMerge(
              "cursor-pointer",
              color || "bg-blue-500",
              hoverColor || "hover:bg-blue-600"
            )
          : twMerge("cursor-not-allowed", "bg-slate-500")
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PadButton;
