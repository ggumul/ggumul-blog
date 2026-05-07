import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 작은 게임과 생활 도구를 만들며 남기는 블로그입니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestPosts = allPosts.slice(0, 5);
  const projectLinks = snapshot.worklines.slice(0, 5);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="max-w-4xl space-y-5 py-4 md:py-8">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">최근에 쓴 글</p>
        <h1 className="text-[32px] font-black leading-tight tracking-[-0.04em] text-text md:text-[56px] md:leading-[1.08]">
          카드 하나, 원반 하나, 저녁 재료 하나.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
          꼬물은 작은 게임과 생활 도구를 만들며 남기는 블로그입니다. 카드 규칙을 바꾼 날, 원반을 옮겨 본 날, 저녁 재료를 나눠 적은 날을 짧게 씁니다.
        </p>
      </section>

      {latestPosts.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">글</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">최근에 쓴 글</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">글 모음</Link>
          </div>
          <div className="article-list">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-2 py-4 md:grid-cols-[120px_minmax(0,1fr)] md:items-center">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black tracking-[-0.035em] text-text">{post.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-subtext">{post.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {projectLinks.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">만드는 것</p>
              <h2 className="mt-2 text-[24px] font-black tracking-[-0.035em] text-text md:text-[34px]">만들고 있는 것</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">목록</Link>
          </div>
          <div className="article-list">
            {projectLinks.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="grid gap-2 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                <span className="text-sm font-black text-point">{project.title}</span>
                <span className="text-sm leading-7 text-subtext">{project.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
