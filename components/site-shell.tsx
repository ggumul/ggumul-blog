import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteNav } from '@/components/site-nav';

const NAV_ITEMS = [
  { href: '/projects', label: '만드는 것들' },
  { href: '/writing', label: '글' },
  { href: '/about', label: '소개' },
  { href: '/links', label: '링크' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-30 border-b-2 border-line bg-background/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 md:flex-row md:items-center md:justify-between md:px-8 md:py-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <img
              src="/ggumul-night-snail-icon.png"
              alt=""
              className="h-10 w-10 rounded-full border-2 border-line object-cover shadow-[2px_2px_0_#2A2119] md:h-11 md:w-11"
            />
            <span className="leading-tight">
              <span className="block text-[20px] font-black tracking-[-0.055em] md:text-[25px]">ggumul / 꼬물</span>
              <span className="block text-[11px] font-extrabold text-subtext">작은 게임과 생활 도구</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <SiteNav items={NAV_ITEMS} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-12">{children}</main>

      <footer className="mt-10 border-t-2 border-line bg-surface/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-text">ggumul / 꼬물</div>
            <p className="mt-2 max-w-2xl leading-7">꼬물은 작은 게임과 생활 도구를 만들며 지나간 장면을 글로 남깁니다.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/projects" className="transition hover:text-point">만드는 것들</Link>
            <Link href="/writing" className="transition hover:text-point">글</Link>
            <Link href="/about" className="transition hover:text-point">소개</Link>
            <Link href="/links" className="transition hover:text-point">링크</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
