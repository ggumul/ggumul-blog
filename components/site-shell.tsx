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
      <header className="border-b border-line/80 bg-background/92 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 md:px-8 md:py-8">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] md:items-start md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-point">ggumul / 꼬물</p>
              <div className="space-y-2.5 border-l border-line/70 pl-3 md:space-y-3 md:pl-5">
                <Link href="/" className="inline-block text-[24px] font-semibold tracking-[-0.05em] leading-none md:text-[42px]">
                  ggumul / 꼬물
                </Link>
                <p className="max-w-xl text-[14px] leading-6 text-subtext md:text-base md:leading-8">
                  작은 게임과 인터랙티브 프로젝트를 만들고 있어요. 그리고 그 과정을 개발기록으로 남기고 있어요.
                </p>
              </div>
            </div>

            <nav className="-mx-1 flex gap-2 overflow-x-auto border-t border-line/70 px-1 pt-3 text-sm text-subtext [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:justify-end md:gap-x-6 md:gap-y-3 md:overflow-visible md:px-0 md:pt-0">
              {NAV_ITEMS.map((item, index) => (
                <Link key={item.href} href={item.href} className="group shrink-0 rounded-full border border-line/60 bg-white/45 px-3 py-1.5 transition hover:border-point/60 md:border-0 md:bg-transparent md:px-0 md:py-0">
                  <span className="block font-medium text-text transition group-hover:text-point">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-16">{children}</main>

      <footer className="border-t border-line/80 bg-white/20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8 md:items-end md:gap-6 md:py-8">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-point">마지막으로</p>
            <p className="max-w-2xl leading-7">
              꼬물은 빠르게 많이 만들기보다, 천천히 오래 이어 가는 쪽을 선택하고 있어요. 그래서 결과보다 만드는 과정의 기록을 먼저 남기고 있어요.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-subtext">
            <Link href="/feed.xml" className="transition hover:text-text">rss</Link>
            <Link href="/writing" className="transition hover:text-text">개발기록</Link>
            <Link href="/projects" className="transition hover:text-text">프로젝트</Link>
            <Link href="/about" className="transition hover:text-text">소개</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
