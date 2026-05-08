import Link from 'next/link';
import { getWorkTraces } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '글',
  description: '꼬물이 작은 게임과 생활 도구를 고치며 쓴 글입니다.',
  path: '/writing',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function WritingPage() {
  const traces = await getWorkTraces();

  return (
    <div className="archive-surface space-y-6 md:space-y-14">
      <section className="max-w-3xl space-y-3 py-0 md:space-y-8 md:py-10">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">글</p>
        <h1 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[68px] md:leading-[1.04]">
          날짜순으로 이어진 작업
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          프로젝트별 칸을 먼저 나누지 않고, 실제로 바뀐 날을 한 줄로 이어 둡니다. 글을 먼저 따라가면 어떤 프로젝트가 어디서 움직였는지 같이 보입니다.
        </p>
      </section>

      <section className="article-list" aria-label="날짜순 글 목록">
        {traces.map((trace) => (
          <Link
            key={trace.slug}
            href={trace.href}
            className="grid gap-3 py-5 transition hover:text-text md:grid-cols-[132px_minmax(0,1fr)] md:items-start"
          >
            <time className="text-sm text-subtext" dateTime={trace.publishedAt}>{formatDate(trace.publishedAt)}</time>
            <span className="space-y-2">
              <span className="flex flex-wrap items-center gap-2 text-[12px] font-black text-point">
                <span>{trace.projectTitle}</span>
                <span className="text-subtext/70">/</span>
                <span>{trace.type}</span>
                <span className="text-subtext/70">/</span>
                <span>{trace.status}</span>
              </span>
              <span className="block text-xl font-black leading-snug tracking-[-0.045em] text-text md:text-[28px]">
                {trace.title}
              </span>
              <span className="block max-w-3xl text-sm leading-7 text-subtext">{trace.summary}</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
