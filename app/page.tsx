import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 짧게 만질 수 있는 작은 게임을 만드는 이름입니다.',
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
  const leadProject = gameProjects.find((project) => project.slug === 'wanderer') ?? gameProjects[0] ?? snapshot.worklines[0] ?? null;
  const otherProjects = gameProjects.filter((project) => project.slug !== leadProject?.slug).slice(0, 3);
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestGamePosts = allPosts.filter((entry) => entry.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery')).slice(0, 4);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="max-w-4xl space-y-6 py-6 md:py-12">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">GGUMUL</p>
        <h1 className="text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[70px] md:leading-[1.04]">
          짧게 만질 수 있는 작은 게임을 만듭니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          꼬물은 작은 게임을 만들고, 게임을 해본 뒤 읽을 글을 함께 보여 줍니다. 꼬물은 작은 게임을 오래 설명하지 않습니다. 먼저 눌러 볼 행동을 보이게 하고, 고른 뒤의 반응을 바로 읽히게 합니다. 첫 행동이 분명해야 작은 게임도 자기 리듬을 가집니다.
        </p>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext">
          글은 게임을 대신 설명하지 않고, 선택 뒤에 왜 그렇게 만들었는지 짧게 이어 줍니다.
        </p>
      </section>

      {leadProject ? (
        <section className="panel-section space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">바로 한 판</p>
              <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.035em] text-text md:text-[42px]">Wanderer</h2>
            </div>
            <Link href={`/projects/${leadProject.slug}#mini-play`} className="game-button-primary text-sm">카드 한 장 고르기</Link>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">카드 한 장을 고르면 바로 결과가 나옵니다. 한 장의 카드로 승부가 납니다.</p>
          <p className="max-w-3xl text-sm leading-7 text-subtext">홀수 카드만 유효한 판에서는 손패가 바로 갈립니다. 10은 빠지고, 5는 약하고, 15는 상대의 13을 넘습니다. 그래서 이 판은 규칙 설명이 아니라 선택으로 끝납니다.</p>
        </section>
      ) : null}

      {otherProjects.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">퍼즐과 서사</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">막대를 옮기고, 문장을 고릅니다</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">작은 게임들</Link>
          </div>
          <div className="article-list">
            {otherProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="grid gap-2 py-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center">
                <span className="text-sm font-black text-point">{project.title}</span>
                <span className="text-sm leading-7 text-subtext">{project.summary}</span>
                <span className="sr-only">자세히</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {latestGamePosts.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">게임 뒤에 읽는 글</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">게임 뒤에 남는 이유</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">이어 읽는 글</Link>
          </div>
          <div className="article-list">
            {latestGamePosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-2 py-4 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black tracking-[-0.035em] text-text">{post.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-subtext">{post.summary}</span>
                </span>
                <span className="sr-only">자세히</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
