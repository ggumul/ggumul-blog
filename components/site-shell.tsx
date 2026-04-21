import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '홈', note: '최근 글과 프로젝트' },
  { href: '/writing', label: '개발기록', note: '새 글과 작업 기록' },
  { href: '/projects', label: '프로젝트', note: '진행 중인 프로젝트' },
  { href: '/about', label: '소개', note: '꼬물 소개' },
  { href: '/links', label: '링크', note: '깃허브와 외부 채널' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-line/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-end md:justify-between md:px-8 md:py-6">
          <div className="space-y-1.5">
            <Link href="/" className="inline-block text-[22px] font-semibold tracking-[-0.04em] md:text-[28px]">
              ggumul / 꼬물
            </Link>
            <p className="text-sm leading-6 text-subtext">
              작은 게임과 인터랙티브 프로젝트를 만들고 있어요.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtext">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-text">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="border-t border-line/80">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-4 gap-y-2 px-4 py-5 text-sm text-subtext md:px-8">
          <Link href="/feed.xml" className="transition hover:text-text">rss</Link>
          <Link href="/writing" className="transition hover:text-text">개발기록</Link>
          <Link href="/projects" className="transition hover:text-text">프로젝트</Link>
          <Link href="/about" className="transition hover:text-text">소개</Link>
        </div>
      </footer>
    </div>
  );
}
