import Link from 'next/link';
import { getWorkTraces } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '글',
  description: '꼬물이 작은 게임과 생활 도구를 만들며 쓴 글입니다.',
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
          만들며 쓴 글
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
          작은 게임을 만들며 바꾼 것, 저녁 장보기를 줄이며 배운 것을 날짜순으로 둡니다.
        </p>
      </section>

      {traces.length ? (
        <section className="article-list" aria-label="날짜순 글 목록">
          {traces.map((trace) => (
            <Link
              key={trace.slug}
              href={trace.href}
              className="grid gap-3 py-5 transition hover:text-text md:grid-cols-[132px_minmax(0,1fr)] md:items-start"
            >
              <time className="text-sm text-subtext" dateTime={trace.publishedAt}>{formatDate(trace.publishedAt)}</time>
              <span className="space-y-2">
                <span className="block text-xl font-black leading-snug tracking-[-0.045em] text-text md:text-[28px]">
                  {trace.title}
                </span>
                <span className="block max-w-3xl text-sm leading-7 text-subtext">{trace.summary}</span>
              </span>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-[24px] border border-line/60 bg-white/[0.035] p-5 md:p-7">
          <p className="text-[12px] font-black tracking-[0.16em] text-point">첫 글을 준비하고 있습니다</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-subtext md:text-base md:leading-8">
            읽을 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.
          </p>
        </section>
      )}
    </div>
  );
}
