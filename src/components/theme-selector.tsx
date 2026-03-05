"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[88px] h-6" />;
  }

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />

      <Switch
        checked={theme === "dark"}
        onCheckedChange={(isChecked) => {
          setTheme(isChecked ? "dark" : "light");
        }}
        aria-label="Alternar tema claro e escuro"
      />

      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
