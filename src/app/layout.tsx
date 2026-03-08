import { ThemeProvider } from "@/src/components/theme-provider";
import "./globals.css";
import { SiteHeader } from "../components/site-headder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="pt-24 px-4 pb-8 max-w-7xl mx-auto">
            {children}
          </main>{" "}
          {/*Caso eu queira um fazer variável a largura, colocar aqui max-w-7xl */}
        </ThemeProvider>
      </body>
    </html>
  );
}
