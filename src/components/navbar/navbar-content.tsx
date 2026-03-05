import { cn } from "@/lib/utils";
export function NavbarContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("hidden md:block", className)} {...props}>
      {children}
    </div>
  );
}
