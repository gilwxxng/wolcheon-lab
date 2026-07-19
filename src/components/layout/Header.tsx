import Link from "next/link";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { href: "/calculators/monthly-dividend", label: "월배당 계산기" },
  { href: "/calculators/dividend-portfolio", label: "포트폴리오" },
  { href: "/guide", label: "사용법" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "소개" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className="text-lg">🏦</span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/calculators/monthly-dividend"
          className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-white sm:hidden"
        >
          계산기
        </Link>
      </div>
    </header>
  );
}
