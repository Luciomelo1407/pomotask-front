"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavbarContext } from "./context/navbar-context";

export function Navbar({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <header
        className={cn(
          "fixed top-4 inset-x-0 mx-auto w-full max-w-4xl z-50 px-4",
          className,
        )}
        {...props}
      >
        {children}
      </header>
    </NavbarContext.Provider>
  );
}
