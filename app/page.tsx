import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '오래 쌓아가는 작업실',
  description: '꼬물이 최근에 남긴 기록과 지금 붙들고 있는 작업선을 먼저 보여주는 작업실 아카이브 메인.',
  path: '/',
});

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className="archive-surface space-y-18 md:space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {snapshot.latest ? (
        <section className="grid gap-8 border-b border-line/80 pb-12 md:grid-cols-[120px_minmax(0,1fr)_240px] md:gap-10 md:pb-16">
          <div className="text-[10px] uppercase tracking-[0.34em] text-point">가장 최근<br />발자국</div>

          <div className="space-y-5">
            <div className="space-y-3">
              <h1 className="max-w-4xl text-[42px] font-semibold tracking-[-0.06em] leading-[0.96] text-text md:text-[78px]">
                <Link href={`/writing/${snapshot.latest.slug}`} className="transition hover:text-point">
                  {snapshot.latest.title}
                </Link>
              </h1>
              <p className="max-w-3xl text-[18px] leading-9 text-subtext md:text-[20px]">
                {snapshot.latest.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-subtext">
              <span className="trace-chip">{snapshot.latest.publishedAt}</span>
              <span className="trace-chip">{snapshot.latest.category}</span>
              {snapshot.latest.series ? <span className="trace-chip">{snapshot.latest.series}</span> : null}
            </div>
          </div>

          <aside className="space-y-4 border-l border-line/60 pl-0 md:pl-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">이어진 작업</div>
            <p className="text-[13px] leading-6 text-subtext">
              브랜드 소개보다 먼저, 지금 이 발자국이 어떤 작업선과 이어져 있는지 바로 보이게 둔다.
            </p>
            <div className="space-y-3">
              {snapshot.latestProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block border-t border-line/60 pt-3 transition hover:border-point/60">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-subtext">작업선</div>
                  <div className="mt-2 font-medium text-text">{project.title}</div>
                  <p className="mt-1 text-[13px] leading-6 text-subtext">{project.summary}</p>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      ) : null}

      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-8">
          <div className="text-[10px] uppercase tracking-[0.34em] text-point">붙들고 있는<br />작업</div>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
            <h2 className="max-w-3xl text-[32px] font-semibold tracking-[-0.05em] leading-[1.02] text-text md:text-[54px]">
              지금 붙들고 있는 작업은 결과물이 아니라,
              <br className="hidden md:block" /> 감각의 선에 가깝다.
            </h2>
            <p className="text-[14px] leading-7 text-subtext md:text-[15px]">
              번호, 제목, 연결 기록이 같은 그리드 위에 보이도록 정리해서 작업선의 흐름 자체가 먼저 읽히게 한다.
            </p>
          </div>
        </div>

        <div>
          {snapshot.worklines.map((project) => (
            <ProjectCard key={project.slug} project={project} records={project.previewRecords} />
          ))}
        </div>
      </section>

      <section className="space-y-6 border-t border-line/80 pt-10 md:pt-14">
        <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-8">
          <div className="text-[10px] uppercase tracking-[0.34em] text-point">이어진 기록</div>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
            <h2 className="max-w-3xl text-[32px] font-semibold tracking-[-0.05em] leading-[1.02] text-text md:text-[54px]">
              최근에 이어진 메모와 질문들.
            </h2>
            <p className="text-[14px] leading-7 text-subtext md:text-[15px]">
              설명을 길게 늘어놓기보다, 이어지는 기록을 같은 화면 안에 붙여서 축적감이 먼저 드러나게 한다.
            </p>
          </div>
        </div>

        <div>
          {snapshot.moreEntries.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="pt-1 text-sm text-subtext">
          <Link href="/writing" className="transition hover:text-text">
            기록 전체 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
