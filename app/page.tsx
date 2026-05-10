import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 작은 게임과 생활 도구를 만들며 남기는 글입니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
});

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const latestTrace = snapshot.latestTrace;
  const traceFlow = snapshot.traces.slice(0, 4);
  const projectLinks = snapshot.worklines.slice(0, 4);

  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="max-w-4xl space-y-4 py-3 md:py-6">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">꼬물</p>
        <h1 className="text-[32px] font-black leading-tight tracking-[-0.04em] text-text md:text-[56px] md:leading-[1.08]">
          작게 만들고, 써 보며 고칩니다.
        </h1>
        <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">
          게임을 만들다가 막힌 점, 생활 도구를 쓰며 바꾼 점을 천천히 적습니다.
        </p>
      </section>

      {latestTrace ? (
        <section className="rounded-[24px] border border-line/60 bg-white/[0.035] p-5 md:p-7">
          <p className="text-[12px] font-black tracking-[0.16em] text-point">최근 글</p>
          <Link href={latestTrace.href} className="mt-4 block space-y-3 hover:text-text">
            <div className="flex flex-wrap items-center gap-2 text-sm text-subtext">
              <time dateTime={latestTrace.publishedAt}>{formatDate(latestTrace.publishedAt)}</time>
              <span>·</span>
              <span>{latestTrace.projectTitle}</span>
            </div>
            <h2 className="text-[28px] font-black leading-tight tracking-[-0.045em] text-text md:text-[44px]">
              {latestTrace.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-subtext md:text-base md:leading-8">{latestTrace.summary}</p>
          </Link>
        </section>
      ) : (
        <section className="rounded-[24px] border border-line/60 bg-white/[0.035] p-5 md:p-7">
          <p className="text-[12px] font-black tracking-[0.16em] text-point">첫 글을 준비하고 있습니다</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-subtext md:text-base md:leading-8">
            보여줄 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.
          </p>
        </section>
      )}

      {traceFlow.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">다음 흐름</p>
              <h2 className="mt-2 text-[26px] font-black tracking-[-0.035em] text-text md:text-[38px]">날짜가 이어지는 글</h2>
            </div>
            <Link href="/writing" className="text-sm font-bold text-point hover:text-text">글 목록</Link>
          </div>
          <div className="article-list">
            {traceFlow.map((trace) => (
              <Link key={trace.slug} href={trace.href} className="grid gap-2 py-4 md:grid-cols-[120px_minmax(0,1fr)] md:items-center">
                <time className="text-sm text-subtext" dateTime={trace.publishedAt}>{formatDate(trace.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black tracking-[-0.035em] text-text">{trace.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-subtext">{trace.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {projectLinks.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">만드는 것들</p>
              <h2 className="mt-2 text-[24px] font-black tracking-[-0.035em] text-text md:text-[34px]">지금 손대는 것</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-point hover:text-text">모두 보기</Link>
          </div>
          <div className="article-list">
            {projectLinks.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="grid gap-2 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                <span className="text-sm font-black text-point">{project.title}</span>
                <span className="text-sm leading-7 text-subtext">{project.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
