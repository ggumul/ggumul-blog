import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물이 만들고 있는 작은 게임과 개발 기록을 모았습니다.',
  path: '/',
});

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const leadProject = snapshot.worklines[0] ?? null;
  const latestPosts = [snapshot.latest, ...snapshot.moreEntries]
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, 4);
  const totalPostCount = (snapshot.latest ? 1 : 0) + snapshot.moreEntries.length;

  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="studio-hero overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.035] p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(390px,1.08fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-line/70 bg-black/20 p-5 md:p-6">
            <div className="space-y-4">
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">ggumul / game studio log</p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-[34px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[62px]">
                  작은 게임을 만들고,<br />그 과정을 개발기록으로 남겨요.
                </h1>
                <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
                  Wanderer, TRPG, Hanoi처럼 짧게 플레이해도 구조가 분명한 게임을 만들고 있어요. 홈에서는 먼저 실제 화면과 프로젝트를 보여주고, 개발기록에서는 무엇을 확인했고 무엇이 남았는지 이어서 볼 수 있게 정리했습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/projects" className="inline-flex rounded-full border border-point/30 bg-point px-5 py-3 font-bold text-[#160d08] transition hover:bg-[#ffc47f]">프로젝트 보기</Link>
                <Link href="/writing" className="inline-flex rounded-full border border-line/90 bg-white/10 px-5 py-3 font-bold text-text transition hover:border-point/60">개발기록 읽기</Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">projects</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">{snapshot.worklines.length}</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">공개한 게임 작업</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">devlogs</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">{totalPostCount}</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">읽을 수 있는 기록</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">runtime</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">영상</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">실행 화면 우선</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px]">
            <figure className="studio-shot relative min-h-[300px] overflow-hidden rounded-[26px] border border-line/80 bg-white/10 md:min-h-[455px]">
              <img alt="Wanderer 실제 게임 진행 화면" className="h-full w-full object-cover" src="/media/runtime-checks/wanderer-mobile-current.png" />
              <figcaption className="studio-caption">
                <span>Wanderer · 실제 진행 화면</span>
                <Link href="/writing/runtime-화면-확인-기록">전체 흐름 기록 보기</Link>
              </figcaption>
            </figure>
            <div className="grid gap-3">
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[22px] border border-line/80 bg-white/10">
                <img alt="Hanoi 웹 퍼즐 실행 화면" className="h-full w-full object-cover" src="/project-covers/hanoi.png" />
                <figcaption className="studio-caption"><span>Hanoi</span></figcaption>
              </figure>
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[22px] border border-line/80 bg-white/10">
                <img alt="TRPG 디바이스 메뉴 화면" className="h-full w-full object-cover object-top" src="/studio/trpg-device-menu.png" />
                <figcaption className="studio-caption"><span>TRPG</span></figcaption>
              </figure>
              <figure className="studio-shot relative min-h-[140px] overflow-hidden rounded-[22px] border border-line/80 bg-white/10">
                <img alt="Color Hanoi 퍼즐 화면" className="h-full w-full object-cover" src="/project-covers/color-hanoi.png" />
                <figcaption className="studio-caption"><span>Color Hanoi</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {leadProject ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">representative project</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">대표 프로젝트</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">모든 프로젝트 보기 →</Link>
          </div>
          <ProjectCard project={leadProject} records={leadProject.previewRecords} />
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.worklines.slice(1).map((project) => (
          <ProjectCard key={project.slug} project={project} records={project.previewRecords} compact />
        ))}
      </section>

      {snapshot.latest ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">latest devlog</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">최근 개발기록</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">개발기록 전체 보기 →</Link>
          </div>
          <PostCard post={snapshot.latest} featured />
          <div className="grid gap-4 md:grid-cols-3">
            {snapshot.moreEntries.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
