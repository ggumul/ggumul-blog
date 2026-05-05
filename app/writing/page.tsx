import Link from 'next/link';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '게임 글',
  description: '꼬물이 게임을 만들며 남긴 짧은 글입니다.',
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
    <div className="archive-surface space-y-6 md:space-y-16">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-5 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">글</p>
        <h1 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          만들다가 걸린 것들
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          카드를 왜 한 장만 내게 했는지, 퍼즐은 왜 다음 수부터 보여야 하는지, 장보기 도구는 왜 가격부터 봐야 하는지 적습니다.
        </p>
      </section>

      <section aria-label="게임 글" className="space-y-3">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">게임</p>
          <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">카드와 퍼즐 이야기</h2>
        </div>
        <div className="article-list">
          {gamePosts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-1 py-3 md:grid-cols-[120px_minmax(0,1fr)_140px] md:items-start">
              <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>
                <span className="block text-lg font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                <span className="mt-1 block text-[13px] leading-6 text-subtext">{post.summary}</span>
              </span>
              <span className="rounded-full border border-line/60 px-2.5 py-1 text-[12px] font-semibold text-subtext md:justify-self-end">{projectLabels[post.relatedProjects[0]] ?? post.category}</span>
            </Link>
          ))}
        </div>
      </section>

      {outsidePosts.length ? (
        <section className="space-y-3">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">도구</p>
            <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">저녁 장보기 이야기</h2>
          </div>
          <div className="article-list">
            {outsidePosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-1 py-3 md:grid-cols-[120px_minmax(0,1fr)_140px] md:items-start">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                  <span className="mt-1 block text-[13px] leading-6 text-subtext">{post.summary}</span>
                </span>
                <span className="rounded-full border border-line/60 px-2.5 py-1 text-[12px] font-semibold text-subtext md:justify-self-end">{post.category}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
