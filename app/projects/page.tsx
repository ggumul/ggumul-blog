import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '작은 게임들',
  description: '꼬물이 작은 게임에서 버린 선택과 남긴 선택을 모았습니다.',
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
          좋아 보이는 선택도 판이 바뀌면 버립니다.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          Wanderer에서는 10이 괜찮아 보여도 홀수 규칙 때문에 빠집니다. Hanoi는 방금 옮긴 막대가 다음 길을 막고, 저녁 장보기는 가격 때문에 살 재료가 바뀝니다.
        </p>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div>
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">Wanderer</p>
              <h2 className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[46px]">{lead.project.title}</h2>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-subtext">10은 안전해 보이지만 빠지고, 5는 살아도 약합니다. Wanderer는 좋은 카드가 아니라 죽지 않을 카드를 고르는 짧은 게임입니다.</p>
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
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-text md:text-[42px]">틀어진 선택들</h2>
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
