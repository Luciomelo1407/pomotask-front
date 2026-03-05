import { cn } from "@/lib/utils";
export function NavbarBrand({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
