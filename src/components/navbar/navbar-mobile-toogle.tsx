"use client";
import { useNavbar } from "./hooks/use-navbar";
import { X } from "lucide-react";
import { Menu } from "lucide-react";

export function NavbarMobileToggle() {
  const { isOpen, setIsOpen } = useNavbar();
  return (
    <button
      className="md:hidden p-2 text-foreground focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Alternar menu"
    >
      {isOpen ? (
        <X className="h-5 w-5 animate-in spin-in-90" />
      ) : (
        <Menu className="h-5 w-5 animate-in spin-in-[-90deg]" />
      )}
    </button>
  );
}
