import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 짧게 끝나는 작은 게임을 만듭니다. 지금은 Wanderer의 카드 한 판을 바로 해볼 수 있습니다.',
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
  const latestGamePosts = allPosts
    .filter((entry) => entry.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery'))
    .slice(0, 4);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="max-w-4xl space-y-6 py-6 md:py-12">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">GGUMUL</p>
        <h1 className="text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[70px] md:leading-[1.04]">
          짧게 끝나는 작은 게임을 만듭니다.
        </h1>
        <p className="max-w-2xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
          꼬물의 게임은 오래 설명하기보다 첫 선택을 빨리 건네는 쪽에 가깝습니다. 지금은 Wanderer를 앞에 두었습니다. 카드 한 장을 고르면 바로 결과가 나옵니다. 그래서 짧은 판 안에서도 선택의 이유와 승부가 한 문장으로 남습니다.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/projects/wanderer#mini-play" className="game-button-primary">카드 한 장 고르기</Link>
          <Link href="/projects" className="inline-flex items-center font-bold text-point hover:text-text">게임 목록 보기 →</Link>
        </div>
      </section>

      {leadProject ? (
        <section className="panel-section space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">대표 게임</p>
              <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.035em] text-text md:text-[42px]">{leadProject.title}</h2>
            </div>
            <Link href={`/projects/${leadProject.slug}`} className="text-sm font-bold text-point hover:text-text">Wanderer 보기 →</Link>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">{leadProject.summary}</p>
          <p className="max-w-3xl text-sm leading-7 text-subtext">홀수 카드만 유효한 판에서는 모든 카드가 같은 무게를 갖지 않습니다. 5는 살아남지만 약하고, 10은 조건에서 빠지고, 15는 살아남은 뒤 상대의 13을 넘습니다. 그래서 이 한 턴은 규칙을 읽는 일에서 시작해 한 장의 선택으로 좁아지고, 마지막에는 한 장의 카드로 승부가 납니다.</p>
        </section>
      ) : null}

      {otherProjects.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">퍼즐과 서사</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">다음에 이어질 게임</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">게임 더 읽기 →</Link>
          </div>
          <div className="article-list">
            {otherProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="grid gap-2 py-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center">
                <span className="text-sm font-black text-point">{project.title}</span>
                <span className="text-sm leading-7 text-subtext">{project.summary}</span>
                <span className="text-sm font-bold text-point">보기 →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {latestGamePosts.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">게임 기록</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">왜 이렇게 만들었는지</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">기록으로 가기 →</Link>
          </div>
          <div className="article-list">
            {latestGamePosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid gap-2 py-4 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center">
                <time className="text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black tracking-[-0.035em] text-text">{post.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-subtext">{post.summary}</span>
                </span>
                <span className="text-sm font-bold text-point">읽기 →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
