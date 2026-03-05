"use client";
import * as React from "react";

export type NavbarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined,
);
