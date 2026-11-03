import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Surf Experience CRM",
  description: "Atendente de WhatsApp e CRM de alunos da Surf Experience",
  appleWebApp: { capable: true, title: "Surf CRM", statusBarStyle: "black-translucent" },
  icons: { icon: "/icon-192.png", apple: "/apple-icon.png" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0E2A3A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:wght@400;500;700&display=swap" />
      </head>
      <body className="min-h-screen" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <Nav />
        <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-5 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
