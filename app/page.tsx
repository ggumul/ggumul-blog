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
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(390px,1.2fr)] lg:items-stretch">
          <div className="flex flex-col justify-center gap-5 rounded-[22px] bg-[#172f82]/72 p-5 md:p-7">
            <p className="inline-flex w-fit rounded-full border-2 border-[#fff1b8]/60 bg-[#ff72a6]/90 px-3 py-1 text-[12px] font-black tracking-[-0.02em] text-[#15183a]">Wanderer 한 턴</p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-[34px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[64px]">
                이번 턴, 어떤 카드를 내야 이길까요?
              </h1>
              <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
                이번 턴에는 홀수 카드만 낼 수 있어요. 상대의 13보다 큰 카드를 골라보세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/projects/wanderer#mini-play" className="game-button-primary">바로 한 턴 해보기</Link>
              <Link href="/projects/wanderer" className="game-button-secondary opacity-90">규칙 보기</Link>
            </div>
          </div>

          <figure className="studio-shot relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] border-[3px] border-[#fff1b8]/60 bg-[#10183a] p-4 shadow-[0_7px_0_rgba(8,13,43,0.5)] md:min-h-[480px] md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,212,71,0.22),transparent_28%),radial-gradient(circle_at_76%_24%,rgba(255,114,166,0.18),transparent_26%),linear-gradient(135deg,rgba(31,70,162,0.94),rgba(16,24,58,0.98))]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="rounded-full border-2 border-[#fff1b8]/70 bg-[#ffd447] px-3 py-1 text-[12px] font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.45)]">
                상대 카드: 13
              </div>
              <div className="rounded-full border border-[#fff1b8]/35 bg-[#10183a]/58 px-3 py-1 text-[12px] font-black text-subtext">
                홀수 카드만 유효
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-[620px] gap-4 py-6">
              <div className="rounded-[24px] border-[3px] border-[#fff1b8]/45 bg-[#172f82]/84 p-4 shadow-[0_6px_0_rgba(8,13,43,0.42)] md:p-6">
                <p className="text-[13px] font-black text-subtext">내 손패</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/30 bg-[#10183a]/55 p-4 text-center opacity-70">
                    <p className="text-[12px] font-black text-subtext">짝수</p>
                    <p className="mt-2 text-5xl font-black tracking-[-0.08em] text-[#ffd447]">12</p>
                  </div>
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/70 bg-[#ff72a6]/90 p-4 text-center shadow-[0_5px_0_rgba(8,13,43,0.35)]">
                    <p className="text-[12px] font-black text-[#15183a]">정답</p>
                    <p className="mt-2 text-5xl font-black tracking-[-0.08em] text-[#15183a]">15</p>
                  </div>
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/30 bg-[#10183a]/55 p-4 text-center opacity-70">
                    <p className="text-[12px] font-black text-subtext">짝수</p>
                    <p className="mt-2 text-5xl font-black tracking-[-0.08em] text-[#ffd447]">18</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[18px] border-2 border-[#fff1b8]/35 bg-[#10183a]/58 p-4">
                  <p className="text-[12px] font-black text-point">결과</p>
                  <p className="mt-1 text-lg font-black leading-7 text-text">15는 홀수이고 13보다 큽니다. 승리!</p>
                </div>
              </div>
            </div>

            <figcaption className="studio-caption relative">
              <span>13보다 크고 홀수인 카드를 고르면 됩니다.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {leadProject ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">대표 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">대표 게임: Wanderer</h2>
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
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[44px]">다른 작은 게임들</h2>
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
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">한 장을 고르는 순간, 승부가 갈립니다</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-subtext">
                Wanderer는 어떤 카드를 낼지 고르고, 바로 결과를 확인하는 짧은 승부에 집중합니다.
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
