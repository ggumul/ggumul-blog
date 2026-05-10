import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 작은 게임과 생활 도구를 작게 나눠 만들고 고치는 방식입니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '조건 하나가 손패를 어떻게 바꾸는지 보는 모바일 카드 게임입니다.',
    href: '/projects/wanderer',
  },
  {
    title: 'Hanoi',
    text: '원반 하나를 옮긴 뒤 다음 선택지가 어떻게 달라지는지 보는 퍼즐입니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '잔해일지처럼 테마를 고른 뒤 생존 상황을 선택지로 넘기는 텍스트 RPG입니다.',
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
            작게 만들고, 써 보며 고칩니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            꼬물은 큰 계획보다 먼저 만져 볼 수 있는 작은 단위에서 시작합니다. Wanderer는 한 턴에서 낼 수 있는 카드를 보고, Hanoi는 원반 하나가 다음 자리를 어떻게 바꾸는지 봅니다. 저녁 장보기는 오늘 살 재료만 따로 떼어 봅니다.
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
