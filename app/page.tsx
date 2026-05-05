import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 느리게라도 손을 놓지 않고 작은 게임을 만드는 곳입니다.',
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
          느려도 손은 놓지 않습니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          꼬물은 작은 게임을 만들고, 만들다 고친 이유를 짧은 글로 남기는 곳입니다.
        </p>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext">
          완성품처럼 포장하기보다 손댈 수 있는 판과 그 옆의 메모를 그대로 올립니다.
        </p>
      </section>

      {leadProject ? (
        <section className="panel-section space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">먼저 올린 게임</p>
              <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.035em] text-text md:text-[42px]">Wanderer</h2>
            </div>
            <Link href={`/projects/${leadProject.slug}#mini-play`} className="game-button-primary text-sm">Wanderer 한 턴</Link>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">Wanderer는 오래 붙드는 카드 게임이 아닙니다. 이번 턴의 규칙을 읽고, 손에 든 카드 하나를 냅니다.</p>
          <p className="max-w-3xl text-sm leading-7 text-subtext">지금은 홀수 카드만 살아남는 짧은 판이 열려 있습니다. 5, 10, 15 중 무엇을 낼지 고르면 바로 승부가 갈립니다.</p>
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
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">만든 이유</h2>
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
