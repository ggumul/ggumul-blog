import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/links', label: 'Links' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              ggumul / 꼬물
            </Link>
            <p className="mt-2 text-sm text-subtext">
              작게 시작해도 계속 만들고 쌓아가는 게임 기록
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-subtext">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-text">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-subtext">
          빠르진 않지만, 계속 만들고 있습니다.
        </div>
      </footer>
    </div>
  );
}
