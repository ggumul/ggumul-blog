import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물은 짧게 끝나는 작은 게임을 만듭니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '홀수 카드만 유효한 턴에서 카드 15를 내면 이깁니다.',
    href: '/projects/wanderer#mini-play',
  },
  {
    title: 'Hanoi',
    text: '막대를 옮겨 하노이 탑을 푸는 퍼즐입니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '선택한 문장에 따라 결말이 달라지는 이야기 게임입니다.',
    href: '/projects/trpg',
  },
];

export default function AboutPage() {
  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <section className="rounded-2xl border border-line/70 bg-surface/70 p-5 md:p-8">
        <div className="max-w-4xl space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">꼬물</p>
          <h1 className="text-[34px] font-black leading-tight tracking-[-0.05em] text-text md:text-[68px] md:leading-[1.04]">
            짧게 끝나는 작은 게임을 만듭니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            Wanderer는 지금 바로 해볼 수 있는 카드 게임입니다. Hanoi와 TRPG는 준비 중입니다.
          </p>
          <Link href="/projects/wanderer#mini-play" className="inline-flex min-h-[42px] items-center rounded-full border border-point/35 px-4 py-2 text-sm font-bold text-point transition hover:border-point/70 hover:text-text">
            Wanderer 한 턴 보기 →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {games.map((game) => (
          <Link key={game.title} href={game.href} className="block border-t border-line/70 py-5 transition hover:border-point/50">
            <h2 className="text-2xl font-black tracking-[-0.05em] text-text">{game.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">{game.text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
