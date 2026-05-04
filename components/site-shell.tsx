import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/projects', label: '게임' },
  { href: '/writing', label: '게임 기록' },
  { href: '/about', label: '소개' },
  { href: '/links', label: '링크' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-text">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-point/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-[8rem] h-[30rem] w-[30rem] rounded-full bg-[#8d62ff]/14 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-[#ff6f59]/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b-2 border-[#fff1b8]/30 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-[14px] border-2 border-[#fff1b8]/55 bg-[#ffd447] text-base font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.56)]">
              ✦
            </span>
            <span className="leading-tight">
              <span className="block text-[21px] font-black tracking-[-0.045em] md:text-[25px]">ggumul <span className="mx-1 text-point/80">/</span> 꼬물</span>
              <span className="block text-[11px] font-black tracking-[-0.01em] text-subtext">작은 게임과 게임 기록</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <nav className="flex flex-wrap gap-x-1 gap-y-2 rounded-[16px] border border-[#fff1b8]/24 bg-[#1b3d96]/40 p-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[36px] items-center rounded-[12px] px-3 py-2 font-bold transition hover:bg-[#ffd447] hover:text-[#15183a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/40"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/projects/wanderer#mini-play"
              className="game-button-primary hidden min-h-[40px] px-4 py-2 text-sm md:inline-flex"
            >
              카드 한 장 고르기
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="mt-10 border-t border-line/70 bg-black/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-text">ggumul / 꼬물</div>
            <p className="mt-2 max-w-2xl leading-7">꼬물은 짧게 만질 수 있는 작은 게임을 만듭니다. Wanderer의 카드 한 턴부터 만날 수 있습니다.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/writing" className="transition hover:text-text">게임 기록</Link>
            <Link href="/projects" className="transition hover:text-text">게임</Link>
            <Link href="/about" className="transition hover:text-text">소개</Link>
            <Link href="/links" className="transition hover:text-text">링크</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
