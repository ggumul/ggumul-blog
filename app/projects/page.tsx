import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '프로젝트',
  description: '꼬물이 만들고 있는 게임 프로젝트를 소개합니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);

  return (
    <div className="archive-surface space-y-14 md:space-y-18">
      <section className="panel-section grid gap-8 md:grid-cols-[120px_minmax(0,1fr)_240px] md:gap-12">
        <div className="text-[10px] uppercase tracking-[0.34em] text-point">프로젝트</div>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-[40px] font-semibold tracking-[-0.06em] leading-[0.97] text-text md:text-[74px]">
            지금 만들고 있는 게임들
          </h1>
          <p className="max-w-3xl text-[18px] leading-9 text-subtext md:text-[20px]">
            각 프로젝트의 현재 상태와 실제 화면, 관련 기록을 함께 볼 수 있습니다.
          </p>
        </div>
        <div className="aside-rail panel-aside text-[13px] leading-6 text-subtext md:self-start">
          완성된 소개보다 현재 만들고 있는 모습에 가깝게 보여줍니다.
        </div>
      </section>

      <section className="space-y-4">
        {worklines.map(({ project, records }) => (
          <ProjectCard key={project.slug} project={project} records={records} />
        ))}
      </section>
    </div>
  );
}
