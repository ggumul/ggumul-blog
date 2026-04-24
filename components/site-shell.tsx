import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/writing', label: '개발 기록' },
  { href: '/projects', label: '프로젝트' },
  { href: '/about', label: '소개' },
  { href: '/links', label: '링크' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-text">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-background/72 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-point/30 bg-point/15 text-lg shadow-glow">✦</span>
            <span className="leading-tight">
              <span className="block text-[20px] font-extrabold tracking-[-0.025em] md:text-[25px]">ggumul <span className="mx-1 text-point/70">/</span> 꼬물</span>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-subtext">작은 게임을 천천히 만듭니다</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <nav className="flex flex-wrap gap-x-1 gap-y-2 rounded-full border border-line/70 bg-white/[0.04] p-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[40px] items-center rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/projects"
              className="inline-flex min-h-[42px] items-center rounded-full border border-point/35 bg-point px-4 py-2 text-sm font-bold text-[#160d08] shadow-glow transition hover:border-point/60 hover:bg-[#ffc47f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
            >
              프로젝트
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="border-t border-line/70 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-6 text-sm text-subtext md:px-8">
          <span>© ggumul. 작은 게임을 만들고 기록합니다.</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/feed.xml" className="transition hover:text-text">RSS</Link>
            <Link href="/writing" className="transition hover:text-text">개발 기록</Link>
            <Link href="/projects" className="transition hover:text-text">프로젝트</Link>
            <Link href="/about" className="transition hover:text-text">소개</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
