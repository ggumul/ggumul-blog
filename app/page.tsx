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
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1.1fr)] lg:items-stretch">
          <div className="flex flex-col justify-center gap-6 rounded-[22px] border-[3px] border-[#fff1b8]/55 bg-[#172f82]/80 p-5 shadow-[0_5px_0_rgba(8,13,43,0.55)] md:p-7">
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
                <Link href="/writing/runtime-화면-확인-기록" className="game-button-secondary opacity-90">실행 화면 기록</Link>
              </div>
            </div>
          </div>

          <figure className="studio-shot relative min-h-[320px] overflow-hidden rounded-[22px] border-[3px] border-[#fff1b8]/60 bg-[#10183a] md:min-h-[455px]">
            <img alt="Wanderer 카드 선택과 결과 화면" className="h-full w-full object-cover object-center" src="/project-covers/wanderer.png" />
            <figcaption className="studio-caption">
              <span>Wanderer · 카드 선택 화면</span>
              <Link href="/projects/wanderer">1분 카드 게임 보기</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {leadProject ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black text-point">대표 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">먼저 볼 게임</h2>
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
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">최근에 게임에서 확인한 것</h2>
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
