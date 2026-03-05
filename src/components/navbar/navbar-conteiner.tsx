import { cn } from "@/lib/utils";

export function NavbarContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-background/70 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center justify-between shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
