import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/writing', label: '기록' },
  { href: '/projects', label: '프로젝트' },
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

      <header className="sticky top-0 z-30 border-b-[3px] border-[#fff1b8]/45 bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center rounded-[15px] border-[3px] border-[#fff1b8]/60 bg-[#ffd447] text-lg font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.6)]">
              ✦
            </span>
            <span className="leading-tight">
              <span className="block text-[21px] font-black tracking-[-0.045em] md:text-[26px]">ggumul <span className="mx-1 text-point/80">/</span> 꼬물</span>
              <span className="block text-[11px] font-black tracking-[-0.01em] text-subtext">작은 게임과 개발 기록</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <nav className="flex flex-wrap gap-x-1 gap-y-2 rounded-[18px] border-2 border-[#fff1b8]/30 bg-[#1b3d96]/58 p-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[38px] items-center rounded-[13px] px-3.5 py-2 font-bold transition hover:bg-[#ffd447] hover:text-[#15183a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/40"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/links#follow"
              className="game-button-secondary min-h-[42px] px-4 py-2 text-sm"
            >
              소식 받기
            </Link>
            <Link
              href="/projects/wanderer"
              className="game-button-primary min-h-[42px] px-4 py-2 text-sm"
            >
              1분 카드 게임
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="mt-10 border-t border-line/70 bg-black/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-text">ggumul / 꼬물</div>
            <p className="mt-2 max-w-2xl leading-7">꼬물은 만들고 있는 게임의 화면, 변경 이유, 남은 문제를 같이 남깁니다. 완성 소개보다 실제로 어떻게 바뀌었는지를 먼저 보여줍니다.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/feed.xml" className="transition hover:text-text">RSS</Link>
            <Link href="/writing" className="transition hover:text-text">개발 기록</Link>
            <Link href="/projects" className="transition hover:text-text">프로젝트</Link>
            <Link href="/about" className="transition hover:text-text">소개</Link>
            <Link href="/links" className="transition hover:text-text">링크</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
