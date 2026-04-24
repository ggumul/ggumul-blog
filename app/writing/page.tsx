import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '개발 기록',
  description: '꼬물이 게임을 만들며 남긴 개발 기록을 모았습니다.',
  path: '/writing',
});

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();

  return (
    <div className="archive-surface space-y-14 md:space-y-18">
      <section className="panel-section grid gap-8 md:grid-cols-[120px_minmax(0,1fr)_260px] md:gap-12">
        <div className="text-[10px] uppercase tracking-[0.34em] text-point">개발 기록</div>

        <div className="space-y-5">
          <div className="space-y-3">
            <h1 className="max-w-4xl text-[40px] font-semibold tracking-[-0.06em] leading-[0.97] text-text md:text-[74px]">
              {sections.latest.title}
            </h1>
            <p className="max-w-3xl text-[18px] leading-9 text-subtext md:text-[20px]">{sections.latest.summary}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-subtext">
            <span className="trace-chip">{sections.latest.publishedAt}</span>
            <span className="trace-chip">{sections.latest.category}</span>
            {sections.latest.series ? <span className="trace-chip">{sections.latest.series}</span> : null}
            <Link className="trace-chip hover:text-text" href="/feed.xml">
              RSS
            </Link>
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-4 md:self-start">
          <div className="text-[10px] uppercase tracking-[0.3em] text-point">글 모아보기</div>
          <div className="space-y-3 text-[13px] leading-6 text-subtext">
            <p>묶음 {sections.index.seriesCount}개</p>
            <p>분류 {sections.index.categoryCount}개</p>
            <p>태그 {sections.index.tagCount}개</p>
          </div>
          <p className="text-[13px] leading-6 text-subtext">
            개발 중에 했던 결정, 실패, 수정 이유를 글마다 구분해 두었습니다.
          </p>
        </aside>
      </section>

      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:items-start md:gap-12">
        <div>
          <div className="space-y-4">
            {sections.timeline.map((post) => (
            <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext md:sticky md:top-24">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">묶음</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.series.map((series) => (
                <div key={series} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text/90">
                  {series}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">분류</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category} className="rounded-full border border-point/25 bg-point/10 px-3 py-1 text-point">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">태그</div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[12px] leading-6">
              {sections.taxonomy.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-subtext">#{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
