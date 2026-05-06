import Link from 'next/link';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물은 천천히 만들고 있는 것들을 적어 두는 곳입니다.',
  path: '/about',
});

const games = [
  {
    title: 'Wanderer',
    text: '카드 게임을 크게 벌리기보다 한 턴이 읽히는 크기까지 줄이고 있습니다.',
    href: '/projects/wanderer',
  },
  {
    title: 'Hanoi',
    text: '원반 하나를 옮겼을 때 다음 길이 어떻게 바뀌는지 보고 있습니다.',
    href: '/projects/hanoi',
  },
  {
    title: 'TRPG',
    text: '긴 이야기보다 첫 선택 뒤에 어떤 문장이 붙어야 하는지부터 만지고 있습니다.',
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
            느려도 손에서 놓지 않으려고 합니다.
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
            꼬물이라는 이름은 꾸물거리며 만든다는 뜻에 가깝습니다. 그래서 이곳에는 멋진 선언보다 작은 작업 흔적이 많습니다. 오늘은 카드 한 턴을 줄이고, 내일은 퍼즐 한 이동을 다시 보고, 또 다른 날에는 저녁 재료 목록을 고칩니다.
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
