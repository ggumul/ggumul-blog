import Link from 'next/link';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '게임 기록',
  description: 'Wanderer와 작은 게임들의 장면, 선택, 리듬을 모아 둔 게임 기록입니다.',
  path: '/writing',
});

const projectLabels: Record<string, string> = {
  hanoi: 'Hanoi',
  wanderer: 'Wanderer',
  trpg: 'TRPG',
  'color-hanoi': 'Color Hanoi',
  'ggumul-dinner-grocery': 'Dinner Grocery',
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();
  const allPosts = [sections.latest, ...sections.timeline];
  const gamePosts = allPosts.filter((post) => post.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery'));
  const outsidePosts = allPosts.filter((post) => post.relatedProjects.every((project) => project === 'ggumul-dinner-grocery'));

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="max-w-4xl space-y-5 py-4 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">게임 기록</p>
        <h1 className="text-[38px] font-black leading-[1.04] tracking-[-0.045em] text-text md:text-[68px]">
          글은 목록처럼 읽히게 둡니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          카드 승부, 퍼즐 이동, 서사 선택에서 남은 장면을 시간순으로 모았습니다. 큰 카드보다 제목과 요약을 먼저 읽을 수 있게 정리했습니다.
        </p>
      </section>

      <section aria-label="게임 기록 목록" className="space-y-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">게임 안에서 나온 기록</p>
            <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em] text-text md:text-[42px]">선택과 결과가 남은 글</h2>
          </div>
          <Link href="/projects/wanderer#mini-play" className="text-sm font-bold text-point hover:text-text">Wanderer 한 턴 →</Link>
        </div>
        <div className="article-list">
          {gamePosts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-2 py-5 md:grid-cols-[120px_minmax(0,1fr)_140px] md:items-start">
              <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>
                <span className="block text-xl font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                <span className="mt-2 block text-sm leading-7 text-subtext">{post.summary}</span>
              </span>
              <span className="text-sm font-bold text-point md:text-right">{projectLabels[post.relatedProjects[0]] ?? post.category}</span>
            </Link>
          ))}
        </div>
      </section>

      {outsidePosts.length ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">게임 밖의 기록</p>
            <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em] text-text md:text-[42px]">도구와 제작 리듬</h2>
          </div>
          <div className="article-list">
            {outsidePosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-2 py-5 md:grid-cols-[120px_minmax(0,1fr)_140px] md:items-start">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-xl font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                  <span className="mt-2 block text-sm leading-7 text-subtext">{post.summary}</span>
                </span>
                <span className="text-sm font-bold text-point md:text-right">{post.category}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
