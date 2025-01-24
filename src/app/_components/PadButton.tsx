"use client";
import { twMerge } from "tailwind-merge";

const PadButton: React.FC = () => {
  return (
    <button
      className={twMerge(
        "px-4 py-2",
        "bg-blue-500 text-white",
        "rounded-lg shadow-md"
      )}
    >
      Button
    </button>
  );
};

export default PadButton;
