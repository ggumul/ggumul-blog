import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/projects', label: '게임' },
  { href: '/writing', label: '게임 글' },
  { href: '/about', label: '소개' },
  { href: '/links', label: '링크' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line/80 bg-surface text-base font-black text-point">
              ✦
            </span>
            <span className="leading-tight">
              <span className="block text-[21px] font-black tracking-[-0.045em] md:text-[24px]">ggumul / 꼬물</span>
              <span className="block text-[11px] font-semibold text-subtext">작은 게임, 그리고 게임 뒤에 읽는 글</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <nav className="flex flex-wrap gap-x-3 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[36px] items-center rounded-full px-2 py-1 font-semibold transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/40"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="mt-10 border-t border-line/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-text">ggumul / 꼬물</div>
            <p className="mt-2 max-w-2xl leading-7">꼬물은 고르면 바로 결과가 보이는 작은 게임을 만듭니다. 글은 게임을 해본 뒤 규칙과 선택을 다시 읽는 자리입니다.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/writing" className="transition hover:text-text">게임 글</Link>
            <Link href="/projects" className="transition hover:text-text">게임</Link>
            <Link href="/about" className="transition hover:text-text">소개</Link>
            <Link href="/links" className="transition hover:text-text">링크</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
