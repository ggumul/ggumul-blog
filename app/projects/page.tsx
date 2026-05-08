import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '만드는 것들',
  description: '작은 게임과 생활 도구가 마지막으로 바뀐 순서입니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => b.project.lastUpdated.localeCompare(a.project.lastUpdated));

  return (
    <div className="archive-surface space-y-8 md:space-y-16">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-5 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">만드는 것들</p>
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          마지막으로 바뀐 순서
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          카드 게임, 퍼즐, 저녁 장보기 도구를 한 줄로 세웁니다. 각 카드에는 최근 날짜와 실제로 이어진 글을 같이 붙였습니다.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2" aria-label="프로젝트 목록">
        {worklines.map(({ project, records }) => (
          <ProjectCard
            key={project.slug}
            project={project}
            records={records.filter((record) => project.relatedPosts.includes(record.slug))}
          />
        ))}
      </section>
    </div>
  );
}
