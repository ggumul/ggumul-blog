import Link from 'next/link';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '글',
  description: '꼬물이 작은 게임과 생활 도구를 만들며 쓴 글입니다.',
  path: '/writing',
});

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
          날짜순으로 모았습니다.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          게임 규칙을 바꾼 날과 저녁 재료를 나눠 적은 날을 날짜순으로 모았습니다. 글마다 그날 실제로 손본 장면 하나만 남깁니다.
        </p>
      </section>

      <section aria-label="게임" className="space-y-3">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">게임</p>
          <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">카드와 퍼즐</h2>
        </div>
        <div className="article-list">
          {gamePosts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-1 py-3 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
              <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>
                <span className="block text-lg font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                <span className="mt-1 block text-[13px] leading-6 text-subtext">{post.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {outsidePosts.length ? (
        <section className="space-y-3">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">생활 도구</p>
            <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">저녁을 고른 뒤</h2>
          </div>
          <div className="article-list">
            {outsidePosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-1 py-3 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black leading-snug tracking-[-0.04em] text-text">{post.title}</span>
                  <span className="mt-1 block text-[13px] leading-6 text-subtext">{post.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
