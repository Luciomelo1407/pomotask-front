import { ThemeProvider } from "@/src/components/theme-provider";
import "./globals.css";
import Navbar from "../components/navbar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const meumenu = [
  {
    title: "Soluções",
    items: [
      // Como tem 'items', o Navbar entende que é um Dropdown
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Veja suas métricas.",
      },
      {
        title: "Relatórios",
        href: "/relatorios",
        description: "Exporte em PDF e Excel.",
      },
    ],
  },
  {
    title: "Preços",
    href: "/precos", // Como tem 'href' direto, o Navbar entende que é um link simples
  },
  {
    title: "Contato",
    href: "/contato",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar
          brandName="SaaS Master"
          logo={<Sparkles className="h-4 w-4" />}
          items={meumenu}
          rightContent={
            // Área livre! Você pode colocar quantos botões quiser aqui
            <>
              <Button variant="ghost" size="sm" className="rounded-full">
                Entrar
              </Button>
              <Button size="sm" className="rounded-full">
                Teste Grátis
              </Button>
            </>
          }
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
