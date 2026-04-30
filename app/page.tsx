import Link from 'next/link';
import { CommunityCTA } from '@/components/community-cta';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '작은 게임을 직접 만들고, 실제 화면과 바뀐 이유를 함께 남기는 개발 로그입니다. 처음 오면 1분 카드 게임 Wanderer부터 볼 수 있습니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const gameProjects = snapshot.worklines.filter((project) => project.slug !== 'ggumul-dinner-grocery');
  const sideProjects = snapshot.worklines.filter((project) => project.slug === 'ggumul-dinner-grocery');
  const leadProject = gameProjects.find((project) => project.slug === 'wanderer') ?? gameProjects[0] ?? snapshot.worklines[0] ?? null;
  const otherProjects = [...gameProjects.filter((project) => project.slug !== leadProject?.slug), ...sideProjects];
  const allPosts = [snapshot.latest, ...snapshot.moreEntries].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const latestGamePosts = allPosts
    .filter((entry) => entry.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery'))
    .slice(0, 4);
  const totalPostCount = allPosts.length;
  const latestGamePost = latestGamePosts[0] ?? snapshot.latest;
  const moreGamePosts = latestGamePosts.slice(1, 4);

  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="studio-hero overflow-hidden rounded-[28px] border-[3px] border-[#fff1b8]/60 bg-[#1f46a2]/45 p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(390px,1.08fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-6 rounded-[22px] border-[3px] border-[#fff1b8]/55 bg-[#172f82]/80 p-5 shadow-[0_5px_0_rgba(8,13,43,0.55)] md:p-6">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border-2 border-[#fff1b8]/60 bg-[#ff72a6]/90 px-3 py-1 text-[12px] font-black tracking-[-0.02em] text-[#15183a]">ggumul / 꼬물 게임 기록</p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-[34px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[62px]">
                  작은 게임을 켜 보고,<br />막힌 장면을 바로 남겨요.
                </h1>
                <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
                  Wanderer처럼 직접 돌린 화면을 먼저 보여주고, 버튼 뒤에서 흐름이 끊긴 지점과 다음에 고칠 일을 짧게 붙여둡니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/projects/wanderer" className="game-button-primary">1분 카드 게임 보기</Link>
                <Link href="/writing/runtime-화면-확인-기록" className="game-button-secondary">실행 화면 기록</Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[18px] border-2 border-[#fff1b8]/34 bg-[#213c93]/62 p-4">
                <p className="text-[12px] font-black text-point">게임</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">{gameProjects.length}</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">먼저 볼 게임</p>
              </div>
              <div className="rounded-[18px] border-2 border-[#fff1b8]/34 bg-[#213c93]/62 p-4">
                <p className="text-[12px] font-black text-point">기록</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">{totalPostCount}</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">읽을 수 있는 기록</p>
              </div>
              <div className="rounded-[18px] border-2 border-[#fff1b8]/34 bg-[#213c93]/62 p-4">
                <p className="text-[12px] font-black text-point">화면</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">영상</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">실행 화면 우선</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px]">
            <figure className="studio-shot relative min-h-[300px] overflow-hidden rounded-[22px] border-[3px] border-[#fff1b8]/60 bg-[#10183a] md:min-h-[455px]">
              <img alt="Wanderer 실제 게임 진행 화면" className="h-full w-full object-cover" src="/media/runtime-checks/wanderer-mobile-current.png" />
              <figcaption className="studio-caption">
                <span>Wanderer · 실제 진행 화면</span>
                <Link href="/writing/runtime-화면-확인-기록">전체 흐름 기록 보기</Link>
              </figcaption>
            </figure>
            <div className="grid gap-3">
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[18px] border-2 border-[#fff1b8]/38 bg-[#10183a]">
                <img alt="Hanoi 웹 퍼즐 실행 화면" className="h-full w-full object-cover" src="/project-covers/hanoi.png" />
                <figcaption className="studio-caption"><span>Hanoi</span></figcaption>
              </figure>
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[18px] border-2 border-[#fff1b8]/38 bg-[#10183a]">
                <img alt="TRPG 디바이스 메뉴 화면" className="h-full w-full object-cover object-top" src="/studio/trpg-device-menu.png" />
                <figcaption className="studio-caption"><span>TRPG</span></figcaption>
              </figure>
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[18px] border-2 border-[#fff1b8]/38 bg-[#10183a]">
                <img alt="Color Hanoi 퍼즐 화면" className="h-full w-full object-cover" src="/project-covers/color-hanoi.png" />
                <figcaption className="studio-caption"><span>Color Hanoi</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <CommunityCTA />

      {leadProject ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">대표 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">먼저 볼 게임</h2>
            </div>
            <Link href="/projects" className="game-button-secondary text-sm">프로젝트 전체 보기</Link>
          </div>
          <ProjectCard project={leadProject} records={leadProject.previewRecords} />
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {otherProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} records={project.previewRecords} compact />
        ))}
      </section>

      {latestGamePost ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">최근 게임 기록</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">최근에 게임에서 확인한 것</h2>
            </div>
            <Link href="/writing" className="game-button-secondary text-sm">개발기록 전체 보기</Link>
          </div>
          <PostCard post={latestGamePost} featured />
          <div className="grid gap-4 md:grid-cols-3">
            {moreGamePosts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
