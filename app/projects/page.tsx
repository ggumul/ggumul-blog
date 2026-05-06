import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '만드는 것들',
  description: '꼬물이 이어 가는 작은 게임과 생활 도구입니다.',
  path: '/projects',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);
  const gameWorklines = worklines.filter(({ project }) => project.slug !== 'ggumul-dinner-grocery');
  const outsideWorklines = worklines.filter(({ project }) => project.slug === 'ggumul-dinner-grocery');

  return (
    <div className="archive-surface space-y-8 md:space-y-16">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-5 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">만드는 것들</p>
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          작은 장면에서 시작한 것들.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          각 프로젝트는 큰 소개보다 먼저 보이는 장면이 있습니다. 카드는 한 장이 빠지고, 원반은 다음 자리를 열고, 저녁 재료는 오늘 살 것과 나중에 살 것으로 갈립니다.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">게임</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">한 장면씩 좁힌 게임들</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {gameWorklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} compact />
          ))}
        </div>
      </section>

      {outsideWorklines.length ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black tracking-[0.16em] text-point">생활 도구</p>
            <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">저녁을 고른 뒤에 남는 일</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {outsideWorklines.map(({ project, records }) => (
              <ProjectCard key={project.slug} project={project} records={records} compact />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">최근 글</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">각 프로젝트에서 나온 글</h2>
        </div>
        <div className="space-y-3 border-y border-line/70 py-2">
          {worklines.flatMap(({ project, records }) => records.slice(0, 2).map((post) => ({ project, post }))).map(({ project, post }) => (
            <Link key={`${project.slug}-${post.slug}`} href={`/writing/${post.slug}`} className="block rounded-xl px-0 py-3 transition hover:text-text md:px-3">
              <span className="text-sm font-black text-point">{project.title}</span>
              <span>
                <span className="mt-1 block text-lg font-black tracking-[-0.035em] text-text">{post.title}</span>
                <span className="mt-1 block text-sm leading-7 text-subtext">{post.summary}</span>
              </span>
              <time className="mt-2 block text-sm text-subtext" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
