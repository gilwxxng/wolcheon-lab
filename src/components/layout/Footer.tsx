import Link from "next/link";
import { siteConfig } from "@/config/site";
import { VisitorCounter } from "./VisitorCounter";

const FOOTER_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/guide", label: "사용법 가이드" },
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-4xl px-4 py-10 text-sm text-muted">
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="leading-relaxed">
          {siteConfig.name}은(는) 특정 금융상품 추천이나 투자 권유를 하지 않으며, 모든 계산 결과는
          일반적인 가정에 기반한 참고용 시뮬레이션입니다. 투자 판단과 그 책임은 투자자 본인에게
          있습니다.
        </p>
        <p className="mt-3 text-xs text-muted/70">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. · 문의:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:text-foreground">
            {siteConfig.contactEmail}
          </a>
        </p>
        <VisitorCounter />
      </div>
    </footer>
  );
}
