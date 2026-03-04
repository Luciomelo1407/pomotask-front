"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Command, ChevronRight } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// --- 1. DEFINIÇÃO DE TIPOS ---
// Isso garante que você sempre passe os dados no formato correto
export type SubMenuItem = {
  title: string
  href: string
  description: string
}

export type NavItem = {
  title: string
  href?: string // Opcional: Se tiver href, é um link simples.
  items?: SubMenuItem[] // Opcional: Se tiver items, vira um dropdown.
}

interface NavbarProps {
  brandName?: string
  logo?: React.ReactNode
  items: NavItem[]
  rightContent?: React.ReactNode // Área livre para você injetar botões, avatar, etc.
}

// --- 2. COMPONENTE PRINCIPAL ---
export default function Navbar({ 
  brandName = "MeuApp", 
  logo = <Command className="h-4 w-4" />, 
  items, 
  rightContent 
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed top-4 inset-x-0 mx-auto w-full max-w-[700px] z-50 px-4">
      <div className="bg-background/70 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center justify-between shadow-sm">
        
        {/* Esquerda: Logo dinâmico */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {logo}
          </div>
          <span className="font-semibold text-sm">{brandName}</span>
        </Link>

        {/* Centro: Navegação Desktop Dinâmica */}
        <div className="hidden md:block">
          <DesktopNav items={items} />
        </div>

        {/* Direita: Conteúdo Injetado (Botões) & Toggle Mobile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {rightContent}
          </div>
          
          <button 
            className="md:hidden p-2 text-foreground focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5 animate-in spin-in-90" /> : <Menu className="h-5 w-5 animate-in spin-in-[-90deg]" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dinâmico */}
      {isOpen && (
        <MobileNav 
          items={items} 
          rightContent={rightContent} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </div>
  )
}

// --- 3. SUBCOMPONENTES ---

// Navegação Desktop
function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item, index) => {
          // Se o item tem sub-itens, renderiza um Dropdown
          if (item.items && item.items.length > 0) {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className="bg-transparent">{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {item.items.map((subItem) => (
                      <ListItem key={subItem.title} title={subItem.title} href={subItem.href}>
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // Se é apenas um link simples
          if (item.href) {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// Navegação Mobile
function MobileNav({ items, rightContent, onClose }: { items: NavItem[], rightContent?: React.ReactNode, onClose: () => void }) {
  return (
    <div className="md:hidden mt-2 bg-background/95 backdrop-blur-md border border-border rounded-3xl p-4 shadow-lg animate-in fade-in slide-in-from-top-4">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            {item.href ? (
              <Link href={item.href} className="text-sm font-medium hover:text-primary px-2 transition-colors" onClick={onClose}>
                {item.title}
              </Link>
            ) : (
              <span className="text-sm font-bold px-2 text-muted-foreground">{item.title}</span>
            )}
            
            {/* Renderiza sub-itens no mobile levemente indentados */}
            {item.items?.map((subItem) => (
              <Link key={subItem.title} href={subItem.href} className="text-sm hover:text-primary pl-4 border-l-2 border-muted ml-2 transition-colors" onClick={onClose}>
                {subItem.title}
              </Link>
            ))}
          </div>
        ))}
        
        {rightContent && (
          <>
            <div className="h-px bg-border w-full my-1" />
            <div className="flex flex-col gap-2" onClick={onClose}>
              {rightContent}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Item com animação para o Dropdown (Manteve-se igual)
const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href as string}
            className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
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
    )
  }
)
ListItem.displayName = "ListItem"
