"use client";
import { useNavbar } from "./hooks/use-navbar";
import { cn } from "@/lib/utils";

export function NavbarMobileMenu({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isOpen } = useNavbar();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "md:hidden mt-2 bg-background/95 backdrop-blur-md border border-border rounded-3xl p-4 shadow-lg animate-in fade-in slide-in-from-top-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
