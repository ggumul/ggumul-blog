import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { PostCard } from '@/components/post-card';
import { MetricCard } from '@/components/brand-ui';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '프로젝트',
  description: '꼬물이 만들고 있는 게임 프로젝트의 화면과 개발 기록을 모았습니다.',
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
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">projects</p>
              <h1 className="max-w-4xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[70px]">
                게임별 현재 상태를<br />화면과 기록으로 봅니다.
              </h1>
              <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
                완성된 소개문보다 먼저 실제 화면, 진행 상태, 연결된 개발기록을 배치했습니다. 목록에서 바로 어떤 게임이 어디까지 확인됐는지 볼 수 있게 만들었습니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="프로젝트" value={worklines.length} description="현재 공개한 게임 작업 수" />
              <MetricCard label="개발기록" value={recordTotal} description="프로젝트와 연결된 기록" />
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
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">main workline</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">가장 먼저 볼 프로젝트</h2>
          </div>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">other worklines</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">함께 진행 중인 프로젝트</h2>
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
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">recent records by project</p>
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
