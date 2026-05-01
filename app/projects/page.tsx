import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { PostCard } from '@/components/post-card';
import { MetricCard } from '@/components/brand-ui';
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
  const recordTotal = worklines.reduce((sum, item) => sum + item.records.length, 0);
  const lead = worklines[0];
  const recentRecords = Array.from(
    new Map(worklines.flatMap(({ records }) => records.slice(0, 2)).map((post) => [post.slug, post])).values(),
  ).slice(0, 4);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-7 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <div className="space-y-4">
              <p className="text-[12px] font-black tracking-[0.08em] text-point">게임과 도구</p>
              <h1 className="max-w-4xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[70px]">
                게임과 도구를<br />먼저 해볼 일로 봅니다.
              </h1>
              <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
                Wanderer뿐 아니라 퍼즐, 서사 게임, 저녁 장보기 도구도 첫 화면에서 무엇을 해볼 수 있는지 보이게 정리했습니다. 작업 현황보다 먼저 손이 가는 흐름을 보여줍니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="공개 항목" value={worklines.length} description="게임과 생활 도구" />
              <MetricCard label="기록" value={recordTotal} description="각 항목의 실제 기록" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px]">
            <figure className="studio-shot min-h-[340px] rounded-[30px] border border-line/80 bg-white/10 md:min-h-[520px]">
              <img alt="Wanderer 대표 플레이 화면" className="h-full w-full object-cover" src="/media/runtime-checks/wanderer-mobile-current.png" />
              <figcaption className="studio-caption">
                <span>Wanderer · 대표 화면</span>
                <Link href="/projects/wanderer">상세 보기</Link>
              </figcaption>
            </figure>
            <div className="grid gap-3">
              {worklines.slice(1, 4).map(({ project }) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="studio-shot min-h-[160px] rounded-[26px] border border-line/80 bg-white/10">
                  <img alt={`${project.title} 대표 화면`} className="h-full w-full object-cover" src={project.coverImage ?? '/studio/wanderer-home.png'} />
                  <figcaption className="studio-caption"><span>{project.title}</span></figcaption>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black tracking-[0.08em] text-point">먼저 눌러볼 항목</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">제일 먼저 이해되는 항목</h2>
          </div>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black tracking-[0.08em] text-point">다른 게임과 도구</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">나머지도 해볼 일이 먼저 보이게</h2>
          </div>
          <Link href="/writing" className="text-sm font-bold text-point hover:text-text">개발기록 전체 보기 →</Link>
        </div>
        <div className="grid gap-5">
          {worklines.slice(1).map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} />
          ))}
        </div>
      </section>

      <section className="panel-section space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.08em] text-point">최근에 남긴 기록</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.05em] text-text md:text-[42px]">프로젝트별 최근 개발기록</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recentRecords.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
