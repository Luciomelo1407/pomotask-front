"use client";

import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background">
      <button
        onClick={() => {
          console.log("foi");
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        teeste
      </button>
    </div>
  );
}
