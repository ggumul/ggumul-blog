import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '작업 중인 프로젝트',
  description: '꼬물이 붙들고 있는 프로젝트를 연결된 기록과 함께 보는 작업선 아카이브.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);

  return (
    <div className="archive-surface space-y-14 md:space-y-18">
      <section className="grid gap-8 border-b border-line/80 pb-12 md:grid-cols-[120px_minmax(0,1fr)_220px] md:gap-10 md:pb-16">
        <div className="text-[10px] uppercase tracking-[0.34em] text-point">work<br />archive</div>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-[40px] font-semibold tracking-[-0.06em] leading-[0.97] text-text md:text-[74px]">
            지금 붙들고 있는 작업선.
          </h1>
          <p className="max-w-3xl text-[18px] leading-9 text-subtext md:text-[20px]">
            출시 여부보다 아직 어떤 감각을 놓지 못하고 있는지가 먼저 보였으면 한다. 그래서 작업마다 연결된 기록을 옆에 붙여 같은 선으로 읽히게 둔다.
          </p>
        </div>
        <div className="border-l border-line/60 pl-0 text-[13px] leading-6 text-subtext md:pl-5">
          번호, 제목, 상태, 관련 기록을 한 그리드 위에 올려서 쇼케이스보다 작업실의 정리 노트처럼 보이게 한다.
        </div>
      </section>

      <section>
        {worklines.map(({ project, records }) => (
          <ProjectCard key={project.slug} project={project} records={records} />
        ))}
      </section>
    </div>
  );
}
