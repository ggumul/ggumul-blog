import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '만드는 것들',
  description: '꼬물이 만들고 고치는 작은 게임과 생활 도구입니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => b.project.lastUpdated.localeCompare(a.project.lastUpdated));

  return (
    <div className="archive-surface space-y-8 md:space-y-12">
      <section className="sticker-card max-w-4xl bg-surface p-5 md:p-8">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">만드는 것들</p>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-[-0.055em] text-text md:text-[62px] md:leading-[1.04]">
          책상 위 작은 것들
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
          카드 게임, 퍼즐, 저녁 장보기처럼 직접 만져 볼 수 있는 크기로 줄여 만듭니다.
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
