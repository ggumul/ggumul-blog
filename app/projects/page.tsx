import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '작은 게임들',
  description: '꼬물이 지금 손댈 수 있게 올린 게임과 작은 도구입니다.',
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
        <p className="text-[12px] font-black tracking-[0.18em] text-point">게임</p>
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          손이 가는 것부터 시작합니다.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          카드 한 장을 내고, 막대 하나를 옮기고, 저녁 장볼 재료를 고릅니다. 긴 소개보다 손으로 해볼 일을 먼저 올립니다.
        </p>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">Wanderer</p>
              <h2 className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[46px]">{lead.project.title}</h2>
            </div>
            <Link href="/projects/wanderer#mini-play" className="text-sm font-bold text-point hover:text-text">카드 한 장 고르기</Link>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">홀수 카드만 살아남는 짧은 턴입니다. 10은 빠지고, 15는 상대의 13을 넘습니다.</p>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section id="other-games" className="space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">다른 판</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">막대, 색, 선택지</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {otherWorklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">글</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">만들며 고친 이유</h2>
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
