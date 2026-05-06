import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물은 작은 게임과 생활 도구를 천천히 이어 가는 곳입니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '카드 게임을 크게 벌리기보다, 카드 한 장이 빠지는 턴부터 세웁니다.',
    href: '/projects/wanderer',
  },
  {
    title: 'Hanoi',
    text: '원반 하나를 옮긴 뒤 다음 길이 어떻게 바뀌는지 따라갑니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '긴 이야기보다 첫 선택 뒤에 붙는 한 문장을 먼저 고릅니다.',
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
            느리지만 장면을 놓치지 않으려고 합니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            꼬물이라는 이름은 꾸물거리며 만든다는 뜻에 가깝습니다. 이곳의 글도 그 속도를 닮았습니다. 카드 한 턴, 퍼즐 한 이동, 저녁 재료 한 줄처럼 작지만 실제로 지나간 장면을 붙잡습니다.
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
