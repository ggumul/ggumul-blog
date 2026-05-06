import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 작은 게임에서 카드가 빠지고 원반이 막히는 순간을 먼저 꺼냅니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const gameProjects = snapshot.worklines.filter((project) => project.slug !== 'ggumul-dinner-grocery');
  const groceryProjects = snapshot.worklines.filter((project) => project.slug === 'ggumul-dinner-grocery');
  const leadProject = gameProjects.find((project) => project.slug === 'wanderer') ?? gameProjects[0] ?? snapshot.worklines[0] ?? null;
  const otherProjects = gameProjects.filter((project) => project.slug !== leadProject?.slug).slice(0, 3);
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestPosts = allPosts.slice(0, 4);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="max-w-4xl space-y-6 py-6 md:py-12">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">GGUMUL</p>
        <h1 className="text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[70px] md:leading-[1.04]">
          10을 냈는데, 바로 버려졌습니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          꼬물은 작은 게임에서 카드가 빠지고 원반이 막히는 순간을 먼저 꺼냅니다.
        </p>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext">
          10이 버림 더미로 가고 15가 턴을 가져가는 순서를 실제 한 턴 순서대로 올립니다.
        </p>
      </section>

      {leadProject ? (
        <section className="panel-section space-y-4">
          <div>
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">지금 고친 것</p>
              <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.035em] text-text md:text-[42px]">Wanderer</h2>
            </div>
          </div>
          <div className="grid gap-3 text-sm leading-7 text-subtext md:grid-cols-3">
            <p><strong className="block text-text">01 처음엔</strong>한 턴에서 왜 10이 빠지는지 늦게 읽혔습니다.</p>
            <p><strong className="block text-text">02 바꾼 뒤</strong>버림 더미를 먼저 가르고, 그 뒤에 승부 후보만 비교하게 바꿨습니다.</p>
            <p><strong className="block text-text">03 그래서</strong>10은 먼저 빠지고, 5와 15 중 15가 턴을 가져갑니다.</p>
          </div>
        </section>
      ) : null}

      {otherProjects.length || groceryProjects.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">같이 만드는 것</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">카드, 퍼즐, 저녁 장보기</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">전체 목록</Link>
          </div>
          <div className="article-list">
            {[...otherProjects, ...groceryProjects].map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="grid gap-2 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                <span className="text-sm font-black text-point">{project.title}</span>
                <span className="text-sm leading-7 text-subtext">{project.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {latestPosts.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">글</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">만드는 동안 바꾼 것들</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">전체 글</Link>
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
    </div>
  );
}
