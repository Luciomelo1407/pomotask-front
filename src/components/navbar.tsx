"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Command, ChevronRight } from "lucide-react";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // Container fixo no topo, centralizado com largura máxima de 700px
    <div className="fixed top-4 inset-x-0 mx-auto w-full max-w-[700px] z-50 px-4">
      {/* Barra de Navegação Principal (Glassmorphism) */}
      <div className="bg-background/70 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center justify-between shadow-sm">
        {/* Esquerda: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Command className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm">ShadcnBlocks</span>
        </div>

        {/* Centro: Navegação Desktop */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Solução moderna do Next.js: NavigationMenuLink com asChild */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent`}
                >
                  <Link href="#docs">Documentation</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent`}
                >
                  <Link href="#pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>{" "}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Direita: Botão Login & Menu Hambúrguer (Mobile) */}
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            className="hidden md:flex rounded-full px-6"
          >
            Log in
          </Button>

          <button
            className="md:hidden p-2 text-foreground focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {/* Animação simples de troca de ícone */}
            {isOpen ? (
              <X className="h-5 w-5 animate-in spin-in-90" />
            ) : (
              <Menu className="h-5 w-5 animate-in spin-in-[-90deg]" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Dropdown Inferior) */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-background/95 backdrop-blur-md border border-border rounded-3xl p-4 shadow-lg animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary px-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium hover:text-primary px-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary px-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <div className="h-px bg-border w-full my-1" /> {/* Separador */}
            <Button variant="default" className="w-full rounded-full">
              Log in
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Dados de exemplo para o Dropdown Menu
const components = [
  {
    title: "Dashboard",
    href: "#",
    description: "Métricas detalhadas e visão geral dos seus projetos.",
  },
  {
    title: "Autenticação",
    href: "#",
    description: "Sistemas de login rápidos com suporte a OAuth.",
  },
  {
    title: "Segurança",
    href: "#",
    description: "Proteção contra ataques e criptografia de ponta a ponta.",
  },
  {
    title: "Integrações",
    href: "#",
    description: "Conecte com suas ferramentas favoritas como Slack e Jira.",
  },
];

// Componente customizado para os itens do Dropdown (com animação de deslize)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          {/* O segredo da animação está no 'group-hover:translate-x-1' */}
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
});
ListItem.displayName = "ListItem";
