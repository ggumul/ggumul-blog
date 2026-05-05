import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '작은 게임들',
  description: '꼬물이 만들고 있는 작은 게임 목록입니다. Wanderer는 지금 바로 한 판을 해볼 수 있습니다.',
  path: '/projects',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);
  const lead = worklines.find(({ project }) => project.slug === 'wanderer') ?? worklines[0];
  const otherWorklines = worklines.filter(({ project }) => project.slug !== lead?.project.slug);

  return (
    <div className="archive-surface space-y-8 md:space-y-16">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-5 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">작은 게임 목록</p>
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          게임 목록
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          지금 바로 해볼 수 있는 게임과 준비 중인 게임을 함께 모았습니다. Wanderer는 홀수 카드만 유효한 짧은 판부터 시작합니다.
        </p>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">지금 해볼 게임</p>
              <h2 className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[46px]">{lead.project.title}</h2>
            </div>
            <Link href="/projects/wanderer#mini-play" className="text-sm font-bold text-point hover:text-text">카드 한 장 고르기 →</Link>
          </div>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section id="other-games" className="space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">준비 중인 게임</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">준비 중인 게임</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {otherWorklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">게임 기록</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">게임별 기록</h2>
        </div>
        <div className="article-list">
          {worklines.flatMap(({ project, records }) => records.slice(0, 2).map((post) => ({ project, post }))).map(({ project, post }) => (
            <Link key={`${project.slug}-${post.slug}`} href={`/writing/${post.slug}`} className="grid gap-2 py-4 md:grid-cols-[140px_minmax(0,1fr)_100px] md:items-center">
              <span className="text-sm font-black text-point">{project.title}</span>
              <span>
                <span className="block text-lg font-black tracking-[-0.035em] text-text">{post.title}</span>
                <span className="mt-1 block text-sm leading-7 text-subtext">{post.summary}</span>
              </span>
              <time className="text-sm text-subtext md:text-right" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
