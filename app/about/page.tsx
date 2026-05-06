import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물은 느리게라도 손을 놓지 않고 작은 게임을 만드는 곳입니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '10이 버림 더미로 가고 15가 턴을 가져가는 짧은 카드 게임입니다.',
    href: '/projects/wanderer',
  },
  {
    title: 'Hanoi',
    text: '큰 막대를 피해서 다음에 옮길 막대를 찾는 퍼즐입니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '짧은 선택지가 다음 문장과 결말을 바꾸는 게임입니다.',
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
            느리게라도 계속 만듭니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            꼬물이라는 이름에는 꾸물거리더라도 손을 멈추지 않겠다는 뜻이 있습니다. 그래서 큰 말보다 작은 판을 먼저 올립니다. 10이 바로 빠지고, 막대 하나가 길을 막고, 선택지 하나가 다음 문장을 바꾸는 곳을 적습니다.
          </p>
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
