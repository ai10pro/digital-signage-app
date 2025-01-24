"use client";
import { access } from "fs";
import { twMerge } from "tailwind-merge";

interface PadButtonProps {
  color: string;
  onClick: () => void;
  accessible: boolean;
  children?: React.ReactNode;
}

const PadButton: React.FC<PadButtonProps> = ({
  color,
  onClick,
  accessible,
  children,
}) => {
  return (
    <button
      className={twMerge(
        "w-40 h-32",
        "rounded-lg shadow-md",
        "text-white",
        accessible
          ? twMerge("cursor-pointer", color || "bg-blue-500")
          : twMerge("cursor-not-allowed", "bg-slate-500")
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PadButton;
