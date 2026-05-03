import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '규칙을 보고 한 장을 고르는 Wanderer 한 턴과 작은 게임들을 모았습니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

const heroLoop = [
  { label: '01', title: '조건을 봅니다', description: '이번 턴에 유효한 카드가 홀수인지, 짝수인지, 기준보다 높은지 먼저 읽습니다.' },
  { label: '02', title: '한 장을 냅니다', description: '내 손패에서 조건을 통과하면서 상대보다 높을 카드를 고릅니다.' },
  { label: '03', title: '유효·무효를 확인합니다', description: '조건에 맞지 않으면 무효, 유효 카드끼리는 높은 숫자가 턴을 가져갑니다.' },
];

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const gameProjects = snapshot.worklines.filter((project) => project.slug !== 'ggumul-dinner-grocery');
  const leadProject = gameProjects.find((project) => project.slug === 'wanderer') ?? gameProjects[0] ?? snapshot.worklines[0] ?? null;
  const otherProjects = snapshot.worklines.filter((project) => project.slug !== leadProject?.slug).slice(0, 4);
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestGamePosts = allPosts
    .filter((entry) => entry.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery'))
    .slice(0, 3);
  const latestGamePost = latestGamePosts[0] ?? snapshot.latest;
  const moreGamePosts = latestGamePosts.slice(1, 2);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="studio-hero overflow-hidden rounded-[28px] border-[3px] border-[#fff1b8]/60 bg-[#1f46a2]/45 p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(390px,1.14fr)] lg:items-stretch">
          <div className="flex flex-col justify-center gap-6 rounded-[22px] border-[3px] border-[#fff1b8]/55 bg-[#172f82]/80 p-5 shadow-[0_5px_0_rgba(8,13,43,0.55)] md:p-7">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border-2 border-[#fff1b8]/60 bg-[#ff72a6]/90 px-3 py-1 text-[12px] font-black tracking-[-0.02em] text-[#15183a]">Wanderer 한 턴</p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-[34px] font-black leading-[0.96] tracking-[-0.075em] text-text md:text-[66px]">
                  조건을 읽고,<br />한 장으로 턴을 가져갑니다.
                </h1>
                <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
                  홀수만 살아남습니다. 상대는 13을 냈고, 당신 손에는 15가 있습니다. 지금 고르면 이번 턴을 가져갑니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/projects/wanderer#mini-play" className="game-button-primary">30초 카드 골라보기</Link>
                <Link href="/projects/wanderer#play-video" className="game-button-secondary opacity-90">플레이 영상</Link>
              </div>
            </div>

            <div className="grid gap-2.5 text-sm md:grid-cols-3">
              {heroLoop.map((beat) => (
                <div key={beat.label} className="rounded-[16px] border border-[#fff1b8]/28 bg-[#10183a]/28 p-3">
                  <p className="text-[11px] font-black text-point">{beat.label}</p>
                  <p className="mt-1 font-black leading-5 text-text">{beat.title}</p>
                  <p className="mt-1 text-[12px] leading-5 text-subtext">{beat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="studio-shot relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] border-[3px] border-[#fff1b8]/60 bg-[#10183a] p-4 shadow-[0_7px_0_rgba(8,13,43,0.5)] md:min-h-[500px] md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,212,71,0.22),transparent_28%),radial-gradient(circle_at_76%_24%,rgba(255,114,166,0.18),transparent_26%),linear-gradient(135deg,rgba(31,70,162,0.94),rgba(16,24,58,0.98))]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="rounded-full border-2 border-[#fff1b8]/70 bg-[#ffd447] px-3 py-1 text-[12px] font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.45)]">
                Wanderer 한 턴 샘플
              </div>
              <div className="rounded-full border border-[#fff1b8]/35 bg-[#10183a]/58 px-3 py-1 text-[12px] font-black text-subtext">
                홀수만 살아남음
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-[620px] gap-4 py-6">
              <div className="rounded-[24px] border-[3px] border-[#fff1b8]/45 bg-[#172f82]/84 p-4 shadow-[0_6px_0_rgba(8,13,43,0.42)] md:p-6">
                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/35 bg-[#10183a]/55 p-4 text-center">
                    <p className="text-[12px] font-black text-subtext">상대 카드</p>
                    <p className="mt-2 text-6xl font-black tracking-[-0.08em] text-[#ffd447]">13</p>
                  </div>
                  <div className="text-center text-[13px] font-black text-point">VS</div>
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/65 bg-[#ff72a6]/90 p-4 text-center shadow-[0_5px_0_rgba(8,13,43,0.35)]">
                    <p className="text-[12px] font-black text-[#15183a]">내 카드</p>
                    <p className="mt-2 text-6xl font-black tracking-[-0.08em] text-[#15183a]">15</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[18px] border-2 border-[#fff1b8]/35 bg-[#10183a]/58 p-4">
                  <p className="text-[12px] font-black text-point">결과</p>
                  <p className="mt-1 text-lg font-black leading-7 text-text">15는 홀수라 살아남고, 13보다 높아 턴을 가져갑니다.</p>
                </div>
              </div>
            </div>

            <figcaption className="studio-caption relative">
              <span>조건 → 카드 선택 → 결과</span>
              <Link href="/projects/wanderer#mini-play">직접 골라보기</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {leadProject ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">대표 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">Wanderer를 먼저 봅니다</h2>
            </div>
            <Link href="/projects" className="text-sm font-black text-point transition hover:text-text">전체 게임 보기 →</Link>
          </div>
          <ProjectCard project={leadProject} records={leadProject.previewRecords} />
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] font-black text-point">다른 게임과 도구</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[44px]">Wanderer 말고도 바로 해볼 일이 있어요</h2>
          </div>
          <Link href="/projects" className="text-sm font-black text-point transition hover:text-text">다른 게임 모두 보기 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} records={project.previewRecords} compact />
          ))}
        </div>
      </section>

      {latestGamePost ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">Wanderer 이야기</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">버튼 뒤 장면이 늦었던 날</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-subtext">
                카드 버튼을 눌렀는데 결과가 바로 읽히지 않았습니다. 그 순간부터 다시 봤습니다.
              </p>
            </div>
            <Link href="/writing" className="text-sm font-black text-point transition hover:text-text">글 목록 →</Link>
          </div>
          <PostCard post={latestGamePost} featured />
          <div className="grid gap-4 md:grid-cols-2">
            {moreGamePosts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
