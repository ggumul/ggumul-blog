import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '글과 기록',
  description: '꼬물이 만들면서 적어 둔 글과 메모를 시간순으로 모아 둔 곳.',
  path: '/writing',
});

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();

  return (
    <div className="archive-surface space-y-14 md:space-y-18">
      <section className="grid gap-8 border-b border-line/80 pb-12 md:grid-cols-[120px_minmax(0,1fr)_240px] md:gap-10 md:pb-16">
        <div className="text-[10px] uppercase tracking-[0.34em] text-point">글과 기록</div>

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

        <aside className="space-y-4 border-l border-line/60 pl-0 md:pl-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-point">기록 밀도</div>
          <div className="space-y-3 text-[13px] leading-6 text-subtext">
            <p>시리즈 {sections.index.seriesCount}개</p>
            <p>카테고리 {sections.index.categoryCount}개</p>
            <p>태그 {sections.index.tagCount}개</p>
          </div>
          <p className="text-[13px] leading-6 text-subtext">
            새 글 하나만 튀게 세우기보다, 어떤 흐름으로 글이 쌓였는지 한 번에 읽히게 두고 싶었다.
          </p>
        </aside>
      </section>

      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
        <div>
          {sections.timeline.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <aside className="space-y-7 border-l border-line/60 pl-0 text-sm text-subtext md:sticky md:top-24 md:pl-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">시리즈</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.series.map((series) => (
                <div key={series}>{series}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">카테고리</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category}>{category}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-point">태그</div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[12px] leading-6">
              {sections.taxonomy.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
