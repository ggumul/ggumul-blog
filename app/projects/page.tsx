import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { PostCard } from '@/components/post-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '게임과 도구',
  description: '꼬물이 만들고 있는 게임과 생활 도구를, 무엇을 해볼 수 있는지 바로 보이게 모았습니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);
  const lead = worklines.find(({ project }) => project.slug === 'wanderer') ?? worklines[0];
  const otherWorklines = worklines.filter(({ project }) => project.slug !== lead?.project.slug);
  const recentRecords = Array.from(
    new Map(worklines.flatMap(({ records }) => records.slice(0, 1)).map((post) => [post.slug, post])).values(),
  ).slice(0, 3);

  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <section className="studio-hero overflow-hidden rounded-[30px] border-[3px] border-[#fff1b8]/50 bg-[#1f46a2]/45 p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,1.2fr)] lg:items-stretch">
          <div className="flex flex-col justify-center rounded-[24px] border-2 border-[#fff1b8]/42 bg-[#10183a]/42 p-5 md:p-7">
            <p className="text-[12px] font-black tracking-[0.08em] text-point">게임과 도구</p>
            <h1 className="mt-3 max-w-4xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[68px]">
              Wanderer부터 바로 봅니다.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
              먼저 볼 건 조건을 읽고 카드 한 장을 내는 Wanderer입니다. 나머지 퍼즐과 도구는 아래에서 짧게 고를 수 있게 줄였습니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href="/projects/wanderer#mini-play" className="game-button-primary">30초 카드 골라보기</Link>
              <Link href="/writing/runtime-화면-확인-기록" className="game-button-secondary">폰에서 본 장면</Link>
            </div>
          </div>

          <figure className="studio-shot min-h-[320px] rounded-[24px] border-[3px] border-[#fff1b8]/55 bg-[#10183a] md:min-h-[500px]">
            <img alt="Wanderer 대표 플레이 화면" className="h-full w-full object-cover object-center" src="/media/runtime-checks/wanderer-mobile-current.png" />
            <figcaption className="studio-caption">
              <span>Wanderer · 규칙 확인 → 카드 선택 → 결과</span>
              <Link href="/projects/wanderer#mini-play">한 턴 보기</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.08em] text-point">먼저 해볼 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">한 장을 골라 결과를 봅니다</h2>
            </div>
            <Link href="/projects/wanderer#mini-play" className="text-sm font-black text-point hover:text-text">바로 고르기 →</Link>
          </div>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black tracking-[0.08em] text-point">다른 항목</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[44px]">짧게 보고 고릅니다</h2>
          </div>
          <Link href="/writing" className="text-sm font-bold text-point hover:text-text">글 보기 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {otherWorklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} compact />
          ))}
        </div>
      </section>

      <section className="panel-section space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.08em] text-point">최근 기록</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.05em] text-text md:text-[42px]">화면에서 막힌 지점</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recentRecords.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
