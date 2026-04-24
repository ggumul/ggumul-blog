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

      <header className="sticky top-0 z-30 border-b border-line/70 bg-background/72 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center rounded-[18px] border border-point/35 bg-point/15 text-lg shadow-glow">
              <span className="absolute inset-1 rounded-[14px] border border-white/10" />
              ✦
            </span>
            <span className="leading-tight">
              <span className="block text-[21px] font-black tracking-[-0.045em] md:text-[26px]">ggumul <span className="mx-1 text-point/70">/</span> 꼬물</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-subtext">playable tiny game archive</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
            <nav className="flex flex-wrap gap-x-1 gap-y-2 rounded-full border border-line/70 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[40px] items-center rounded-full px-3.5 py-2 font-semibold transition hover:bg-white/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/projects/wanderer"
              className="inline-flex min-h-[42px] items-center rounded-full border border-point/35 bg-point px-4 py-2 text-sm font-black text-[#160d08] shadow-glow transition hover:border-point/60 hover:bg-[#ffc47f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
            >
              Wanderer 보기
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">{children}</main>

      <footer className="mt-10 border-t border-line/70 bg-black/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-subtext md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-text">ggumul / 꼬물</div>
            <p className="mt-2 max-w-2xl leading-7">작은 게임을 실제 화면과 개발 기록으로 남기는 작업실입니다. 완성본만이 아니라 수정 과정과 판단의 흔적까지 같이 보관합니다.</p>
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
