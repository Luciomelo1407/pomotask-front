import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export type DropdownItem = {
  title: string;
  href: string;
  description: string;
};

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

// 1. A MÁGICA AQUI: forwardRef no NavDropdown para não quebrar o Radix UI
export const NavDropdown = React.forwardRef<HTMLLIElement, NavDropdownProps>(
  ({ title, items }, ref) => {
    return (
      <NavigationMenuItem ref={ref}>
        <NavigationMenuTrigger className="bg-transparent">
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-popover text-popover-foreground rounded-md border border-border shadow-md">
            {items.map((item) => (
              <ListItem key={item.title} title={item.title} href={item.href}>
                {item.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  },
);
NavDropdown.displayName = "NavDropdown";

// 2. LINTER FELIZ: Trocamos o ElementRef depreciado pela tipagem nativa moderna
interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href as string}
            // Adicionei explicitamente a cor de texto (text-foreground) por garantia
            className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground ${className}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center transition-transform group-hover:translate-x-1 duration-200">
              {title}
              <ChevronRight className="ml-1 h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-transform group-hover:translate-x-1 duration-200 mt-1">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
