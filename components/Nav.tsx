"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Quadro" },
  { href: "/agenda", label: "Agenda" }
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 bg-head text-head-ink" style={{ top: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sea" aria-hidden>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M2 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2" /><path d="M2 19c3 0 3-2 6-2s3 2 6 2 3-2 6-2" /></svg>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">Surf Experience <span className="font-sans text-sm font-medium opacity-70">CRM</span></span>
        </Link>
        <nav className="flex gap-1 text-sm">
          {links.map((l) => {
            const on = l.href === "/" ? path === "/" || path.startsWith("/lead") : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 font-medium ${on ? "bg-white/15" : "opacity-75 hover:opacity-100"}`}>{l.label}</Link>
            );
          })}
          <a href="/atendente/" className="rounded-full px-3 py-1.5 font-medium opacity-75 hover:opacity-100">Atendente (protótipo)</a>
        </nav>
        <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Dados de exemplo</span>
      </div>
    </header>
  );
}
