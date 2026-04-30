import Link from 'next/link';
import { CommunityCTA } from '@/components/community-cta';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '카드 한 장으로 한 판이 갈리는 1분 카드 게임 Wanderer와, 실제 화면을 보며 고친 개발기록을 모았습니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

const playBeats = [
  { label: '01', title: '한 장을 고릅니다', description: '길게 설명하기보다 먼저 카드를 잡고 한 판의 방향을 정합니다.' },
  { label: '02', title: '바로 결과를 봅니다', description: '선택 뒤 화면이 어떻게 넘어가는지 실제 플레이 영상으로 확인합니다.' },
  { label: '03', title: '막힌 장면을 고칩니다', description: '폰에서 흐름이 끊긴 지점은 개발기록으로 이어 남깁니다.' },
];

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const gameProjects = snapshot.worklines.filter((project) => project.slug !== 'ggumul-dinner-grocery');
  const leadProject = gameProjects.find((project) => project.slug === 'wanderer') ?? gameProjects[0] ?? snapshot.worklines[0] ?? null;
  const otherProjects = gameProjects.filter((project) => project.slug !== leadProject?.slug).slice(0, 3);
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestGamePosts = allPosts
    .filter((entry) => entry.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery'))
    .slice(0, 3);
  const latestGamePost = latestGamePosts[0] ?? snapshot.latest;
  const moreGamePosts = latestGamePosts.slice(1, 3);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="studio-hero overflow-hidden rounded-[28px] border-[3px] border-[#fff1b8]/60 bg-[#1f46a2]/45 p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(390px,1.14fr)] lg:items-stretch">
          <div className="flex flex-col justify-center gap-6 rounded-[22px] border-[3px] border-[#fff1b8]/55 bg-[#172f82]/80 p-5 shadow-[0_5px_0_rgba(8,13,43,0.55)] md:p-7">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border-2 border-[#fff1b8]/60 bg-[#ff72a6]/90 px-3 py-1 text-[12px] font-black tracking-[-0.02em] text-[#15183a]">대표 게임 보기</p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-[34px] font-black leading-[0.96] tracking-[-0.075em] text-text md:text-[66px]">
                  카드 한 장으로,<br />한 판이 갈립니다.
                </h1>
                <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
                  지금 꼬물에서 가장 먼저 볼 건 Wanderer입니다. 1분 안에 고르고, 겨루고, 결과를 보는 짧은 카드 게임을 실제 영상과 기록으로 남기고 있어요.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/projects/wanderer#play-video" className="game-button-primary">1분 플레이 보기</Link>
                <Link href="/writing/runtime-화면-확인-기록" className="game-button-secondary opacity-90">막힌 장면 읽기</Link>
              </div>
            </div>

            <div className="grid gap-2.5 text-sm md:grid-cols-3">
              {playBeats.map((beat) => (
                <div key={beat.label} className="rounded-[16px] border border-[#fff1b8]/28 bg-[#10183a]/28 p-3">
                  <p className="text-[11px] font-black text-point">{beat.label}</p>
                  <p className="mt-1 font-black leading-5 text-text">{beat.title}</p>
                  <p className="mt-1 text-[12px] leading-5 text-subtext">{beat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <figure id="play-video" className="studio-shot relative min-h-[340px] overflow-hidden rounded-[22px] border-[3px] border-[#fff1b8]/60 bg-[#10183a] md:min-h-[500px]">
            <video
              aria-label="Wanderer 카드 선택 플레이 흐름 영상"
              className="h-full w-full object-cover object-center"
              src="/media/runtime-checks/wanderer-mobile-demo.mp4"
              poster="/project-covers/wanderer.png"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full border-2 border-[#fff1b8]/65 bg-[#ffd447] px-3 py-1 text-[12px] font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.45)]">
              실제 플레이 영상 · 1분
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#fff1b8]/70 bg-[#10183a]/62 text-2xl font-black text-point shadow-[0_5px_0_rgba(8,13,43,0.48)] backdrop-blur-sm">
              ▶
            </div>
            <figcaption className="studio-caption">
              <span>실제 플레이 흐름 · 선택 → 결과</span>
              <Link href="/projects/wanderer">Wanderer 자세히 보기</Link>
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
            <Link href="/projects" className="text-sm font-black text-point transition hover:text-text">게임 더 보기 →</Link>
          </div>
          <ProjectCard project={leadProject} records={leadProject.previewRecords} />
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {otherProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} records={project.previewRecords} compact />
        ))}
      </section>

      {latestGamePost ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">최근 게임 기록</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">화면에서 걸린 지점</h2>
            </div>
            <Link href="/writing" className="text-sm font-black text-point transition hover:text-text">개발기록 전체 보기 →</Link>
          </div>
          <PostCard post={latestGamePost} featured />
          <div className="grid gap-4 md:grid-cols-2">
            {moreGamePosts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      ) : null}

      <CommunityCTA compact />
    </div>
  );
}
