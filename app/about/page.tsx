import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 만들고 있는 작은 게임들을 소개합니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '홀수 카드만 유효한 턴에서 15를 내면 상대의 13을 넘깁니다.',
    href: '/projects/wanderer#mini-play',
  },
  {
    title: 'Hanoi',
    text: '막대를 옮기고 바로 다음 상태를 읽는 퍼즐입니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '선택한 문장에 따라 이어지는 장면이 달라집니다.',
    href: '/projects/trpg',
  },
];

export default function AboutPage() {
  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">꼬물</p>
            <h1 className="max-w-5xl text-[40px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              작은 게임을 하나씩 만듭니다.
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              지금은 Wanderer 한 턴을 먼저 보여줍니다. 카드 한 장, 퍼즐 이동 하나, 선택지 하나처럼 짧게 만질 수 있는 장면을 남깁니다.
            </p>
          </div>
          <div className="rounded-[28px] border border-point/25 bg-point/10 p-5 text-sm leading-7 text-subtext">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">먼저 볼 것</p>
            <p className="mt-2 text-lg font-black leading-7 text-text">Wanderer · 홀수 턴</p>
            <p className="mt-2">상대의 13보다 높은 15를 내면 이번 턴을 가져갑니다.</p>
            <Link href="/projects/wanderer#mini-play" className="mt-4 inline-flex font-black text-point hover:text-text">
              바로 한 턴 해보기 →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {games.map((game) => (
          <Link key={game.title} href={game.href} className="story-card rounded-[26px] border border-line/80 bg-white/[0.055] p-5 transition hover:border-point/60 hover:bg-white/[0.08]">
            <h2 className="text-2xl font-black tracking-[-0.05em] text-text">{game.title}</h2>
            <p className="mt-3 text-sm leading-7 text-subtext">{game.text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
