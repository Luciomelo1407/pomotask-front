import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Navbar } from "./navbar/navbar";
import { NavbarContainer } from "./navbar/navbar-conteiner";
import { NavbarBrand } from "./navbar/navbar-brand";
import { NavbarContent } from "./navbar/navbar-content";
import { NavbarActions } from "./navbar/navbar-actions";
import { NavbarMobileMenu } from "./navbar/navbar-mobile-menu";
import { ThemeSelector } from "./theme-selector";

// Este é o componente que vai gerenciar toda a "bagunça" visual
export function SiteHeader() {
  return (
    <Navbar>
      <NavbarContainer>
        {/* 1. Logo */}
        <NavbarBrand>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm">PomoTask</span>
          <div className="md:hidden ml-auto">
            <ThemeSelector />
          </div>
        </NavbarBrand>

        {/* 2. Menu Desktop */}
        <NavbarContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent`}
                >
                  <Link href="/features">Recursos</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent`}
                >
                  <Link href="/pricing">Preços</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </NavbarContent>

        {/* 3. Ações/Botões */}
        <NavbarActions>
          <ThemeSelector />
          <Button variant="ghost" size="sm" className="rounded-full">
            Entrar
          </Button>
          <Button size="sm" className="rounded-full">
            Testar Grátis
          </Button>
        </NavbarActions>
      </NavbarContainer>

      {/* 4. Menu Mobile */}
      <NavbarMobileMenu>
        <Link
          href="/features"
          className="text-sm font-medium hover:text-primary px-2"
        >
          Recursos
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium hover:text-primary px-2"
        >
          Preços
        </Link>
        {/* <ThemeSelector /> */}
        <div className="h-px bg-border w-full my-1" />
        <Button variant="outline" className="w-full rounded-full">
          Entrar
        </Button>
        <Button className="w-full rounded-full">Testar Grátis</Button>
      </NavbarMobileMenu>
    </Navbar>
  );
}
