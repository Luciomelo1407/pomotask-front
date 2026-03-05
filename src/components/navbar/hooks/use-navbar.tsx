"use client";
import { NavbarContext } from "../context/navbar-context";
import * as React from "react";

export function useNavbar() {
  const context = React.useContext(NavbarContext);
  if (!context) {
    throw new Error(
      "Os subcomponentes do Navbar devem ser usados dentro de <Navbar>",
    );
  }
  return context;
}
