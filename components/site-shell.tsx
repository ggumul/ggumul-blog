import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '첫 장면', note: '가장 최근 기록' },
  { href: '/writing', label: '기록', note: '작업 노트와 시리즈' },
  { href: '/projects', label: '프로젝트', note: '지금 만들고 있는 것들' },
  { href: '/about', label: '작업실', note: '꼬물이 붙드는 태도' },
  { href: '/links', label: '바깥 링크', note: '깃허브와 외부 연결' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-line/80 bg-background/92 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] md:items-start">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.34em] text-point">꼬물 작업실 입구</p>
              <div className="space-y-3 border-l border-line/70 pl-4 md:pl-5">
                <Link href="/" className="inline-block text-[30px] font-semibold tracking-[-0.05em] leading-none md:text-[42px]">
                  ggumul / 꼬물
                </Link>
                <p className="max-w-xl text-[15px] leading-7 text-subtext md:text-base md:leading-8">
                  완성본을 정리하기 전에 먼저 흔적을 꺼내 두고, 그 흔적이 어떻게 이어지는지 천천히 쌓아두는 작은 작업실 아카이브.
                </p>
              </div>
            </div>

            <nav className="grid gap-x-8 gap-y-4 border-t border-line/70 pt-4 text-sm text-subtext md:grid-cols-2 md:pt-0">
              {NAV_ITEMS.map((item, index) => (
                <Link key={item.href} href={item.href} className="group grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-line/50 pb-3 transition hover:border-point/60 md:border-b-0 md:pb-0">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-point">{String(index + 1).padStart(2, '0')}</span>
                  <span className="space-y-1">
                    <span className="block font-medium text-text transition group-hover:text-point">{item.label}</span>
                    <span className="block text-xs leading-6 text-subtext transition group-hover:text-text/80">{item.note}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-16">{children}</main>

      <footer className="border-t border-line/80 bg-white/20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8 md:items-end">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-point">끝맺는 메모</p>
            <p className="max-w-2xl leading-7">
              꼬물은 느린 팀처럼 보일 수 있어도, 실제로는 오래 쌓이는 쪽을 고른다. 그래서 결과보다 작업 노트와 기록을 먼저 남긴다.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-subtext">
            <Link href="/feed.xml" className="transition hover:text-text">rss</Link>
            <Link href="/writing" className="transition hover:text-text">기록</Link>
            <Link href="/projects" className="transition hover:text-text">프로젝트</Link>
            <Link href="/about" className="transition hover:text-text">작업실</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
