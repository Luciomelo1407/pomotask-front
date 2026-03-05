import { cn } from "@/lib/utils";
import { NavbarMobileToggle } from "./navbar-mobile-toogle";
export function NavbarActions({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {/* Botões do desktop ficam visíveis apenas a partir de 'md' */}
      <div className="hidden md:flex items-center gap-2">{children}</div>
      {/* O Toggle Mobile sempre aparece ao lado das ações em telas pequenas */}
      <NavbarMobileToggle />
    </div>
  );
}
