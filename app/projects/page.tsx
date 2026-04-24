import { ProjectCard } from '@/components/project-card';
import { MetricCard, PageHero, SectionHeader } from '@/components/brand-ui';
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

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="projects"
        title={<>작업 중인 게임을<br />상태와 화면으로 봅니다.</>}
        description="완성된 홍보 문구보다 실제로 돌아가는 화면, 현재 상태, 최근 개발 기록을 먼저 보여줍니다."
      >
        <div className="grid gap-3">
          <MetricCard label="projects" value={worklines.length} description="현재 공개한 게임 작업 수" />
          <MetricCard label="notes" value={recordTotal} description="프로젝트와 연결된 개발 기록" />
        </div>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="current projects"
          title="한 화면씩 실제로 확인할 수 있게"
          description="각 카드에는 대표 이미지, 진행 상태, 최근 개발 기록을 같이 묶었습니다. 목록에서 바로 현재 상태를 읽고 상세로 들어갈 수 있습니다."
        />
        <div className="space-y-5">
          {worklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} />
          ))}
        </div>
      </section>
    </div>
  );
}
