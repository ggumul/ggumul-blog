import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 작은 게임과 생활 도구를 어떤 속도로 다루는지 적어 둔 페이지입니다.',
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
            작게 줄인 뒤에 다시 봅니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            꼬물은 크게 발표할 만큼 완성된 것보다, 실제로 줄이고 고친 단위를 먼저 둡니다. Wanderer는 한 턴, Hanoi는 원반 하나, 저녁 장보기는 오늘 살 재료처럼 손에 잡히는 크기에서 이어 갑니다.
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
