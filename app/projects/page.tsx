import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '만드는 것들',
  description: '꼬물이 이어 가는 작은 게임과 생활 도구입니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);
  const gameWorklines = worklines.filter(({ project }) => project.slug !== 'ggumul-dinner-grocery');
  const outsideWorklines = worklines.filter(({ project }) => project.slug === 'ggumul-dinner-grocery');

  return (
    <div className="archive-surface space-y-8 md:space-y-16">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-5 md:py-10">
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          만드는 것들.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          작은 게임과 생활 도구를 모아 둔 페이지입니다. 지금 만들고 있는 것만 짧게 적어 둡니다.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">게임</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">작은 게임들</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {gameWorklines.map(({ project, records }) => (
            <ProjectCard
              key={project.slug}
              project={project}
              records={records.filter((record) => project.relatedPosts.includes(record.slug))}
              compact
            />
          ))}
        </div>
      </section>

      {outsideWorklines.length ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">생활 도구</p>
            <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">저녁 장보기</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {outsideWorklines.map(({ project, records }) => (
              <ProjectCard
                key={project.slug}
                project={project}
                records={records.filter((record) => project.relatedPosts.includes(record.slug))}
                compact
              />
            ))}
          </div>
        </section>
      ) : null}

    </div>
  );
}
