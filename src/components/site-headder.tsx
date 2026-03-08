"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Navbar } from "./navbar/navbar";
import { NavbarContainer } from "./navbar/navbar-conteiner";
import { NavbarBrand } from "./navbar/navbar-brand";
import { NavbarContent } from "./navbar/navbar-content";
import { NavbarActions } from "./navbar/navbar-actions";
import { NavbarMobileMenu } from "./navbar/navbar-mobile-menu";
import { ThemeSelector } from "./theme-selector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IMenuItem {
  title: string;
  href: string;
  description: string | null;
}

interface IDropObj {
  name: string;
  items: IMenuItem[];
}

const navLinks: IMenuItem[] = [
  { title: "Recursos", href: "/features", description: null },
  { title: "Preços", href: "/pricing", description: null },
  { title: "Sobre", href: "/sobre", description: null },
];

const navDropItems: IDropObj[] = [
  {
    name: "Soluções",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Métricas detalhadas e visão geral dos seus projetos.",
      },
      {
        title: "Autenticação",
        href: "/auth",
        description: "Sistemas de login rápidos com suporte a OAuth.",
      },
      {
        title: "Segurança",
        href: "/security",
        description: "Proteção contra ataques e criptografia de ponta a ponta.",
      },
    ],
  },
];

export function SiteHeader() {
  return (
    <Navbar>
      <NavbarContainer>
        <NavbarBrand>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm ml-2">PomoTask</span>
        </NavbarBrand>

        <NavbarContent>
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {navDropItems.map((item) => {
                if (item.items) {
                  return (
                    <NavigationMenuItem key={item.name} value={item.name}>
                      <NavigationMenuTrigger className="bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.items.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              href={subItem.href}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
              <NavigationMenuItem>
                <ThemeSelector />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </NavbarContent>

        <NavbarActions>
          <Button variant="ghost" size="sm" className="rounded-full">
            Entrar
          </Button>
          <Button size="sm" className="rounded-full">
            Testar Grátis
          </Button>
        </NavbarActions>
      </NavbarContainer>

      <NavbarMobileMenu>
        <ThemeSelector />
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-sm font-medium hover:text-primary px-2"
          >
            {link.title}
          </Link>
        ))}
        <Accordion
          type="single"
          collapsible
          defaultValue="shipping"
          className="text-sm font-medium hover:text-primary px-2"
        >
          <AccordionItem value="shipping">
            <AccordionTrigger className="py-0">
              {navDropItems[0].name}
            </AccordionTrigger>
            {navDropItems[0].items.map((item) => (
              <AccordionContent key={item.title} className="pl-2 pt-0">
                {item.title}
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>

        <div className="h-px bg-border w-full my-1" />

        <Button variant="outline" className="w-full rounded-full">
          Entrar
        </Button>
        <Button className="w-full rounded-full">Testar Grátis</Button>
      </NavbarMobileMenu>
    </Navbar>
  );
}

interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
  title: string;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* O Link do Next 16 já é uma tag <a> por baixo dos panos, então passamos o ref direto pra ele! */}
          <Link
            ref={ref}
            href={href}
            className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground ${className || ""}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center transition-transform group-hover:translate-x-1 duration-200">
              {title}
              <ChevronRight className="ml-1 h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-transform group-hover:translate-x-1 duration-200 mt-1">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
