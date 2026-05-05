import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 작은 게임에서 선택이 틀어지는 순간을 먼저 꺼냅니다.',
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
  const toolProjects = snapshot.worklines.filter((project) => project.slug === 'ggumul-dinner-grocery');
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
          안전해 보이는 선택부터 버립니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          꼬물은 작은 게임에서 선택이 틀어지는 순간을 먼저 꺼냅니다.
        </p>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext">
          왜 10을 버리고 15를 남겼는지, 실패한 선택과 살아남은 선택을 같이 올립니다.
        </p>
      </section>

      {leadProject ? (
        <section className="panel-section space-y-4">
          <div>
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">처음 걸리는 선택</p>
              <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.035em] text-text md:text-[42px]">Wanderer</h2>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">Wanderer에서 10은 안전해 보이지만 이번 규칙에서는 바로 빠집니다.</p>
          <p className="max-w-3xl text-sm leading-7 text-subtext">좋은 카드가 아니라 죽지 않을 카드를 찾는 게임입니다. 5는 살아도 지고, 15는 살아남고 이깁니다.</p>
        </section>
      ) : null}

      {otherProjects.length || toolProjects.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">같이 만드는 것</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">카드, 퍼즐, 저녁 장보기</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">전체 목록</Link>
          </div>
          <div className="article-list">
            {[...otherProjects, ...toolProjects].map((project) => (
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
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">버린 선택들</h2>
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
