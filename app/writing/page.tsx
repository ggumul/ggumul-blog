import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { MetricCard, PageHero, Pill, SectionHeader } from '@/components/brand-ui';
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
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="development notes"
        title={<>무엇을 고쳤는지<br />글로 남깁니다.</>}
        description="버그를 고친 이유, 방향을 바꾼 순간, 지금 만들고 있는 장면을 실제 작업 단위로 기록합니다."
      >
        <div className="grid gap-3">
          <MetricCard label="series" value={sections.index.seriesCount} description="묶어서 읽을 수 있는 글 흐름" />
          <MetricCard label="category" value={sections.index.categoryCount} description="기록을 구분하는 분류" />
          <Link className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-point/35 bg-point px-4 py-2 text-sm font-black text-[#160d08] shadow-glow transition hover:bg-[#ffc47f]" href="/feed.xml">
            RSS 구독
          </Link>
        </div>
      </PageHero>

      <section className="panel-section grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
        <div className="space-y-5">
          <SectionHeader eyebrow="latest note" title={sections.latest.title} description={sections.latest.summary} />
          <div className="flex flex-wrap gap-2 text-[12px]">
            <Pill>{sections.latest.publishedAt}</Pill>
            <Pill tone="point">{sections.latest.category}</Pill>
            {sections.latest.series ? <Pill>{sections.latest.series}</Pill> : null}
          </div>
          <Link href={`/writing/${sections.latest.slug}`} className="inline-flex min-h-[46px] items-center rounded-full border border-point/35 bg-point px-5 py-3 text-sm font-black text-[#160d08] transition hover:bg-[#ffc47f]">
            최신 글 읽기
          </Link>
        </div>

        <aside className="aside-rail panel-aside space-y-4">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">writing index</div>
          <p className="text-sm leading-7 text-subtext">태그와 묶음을 남겨 시간이 지나도 어떤 문제를 왜 고쳤는지 다시 찾을 수 있게 했습니다.</p>
          <div className="flex flex-wrap gap-2 text-[12px]">
            {sections.taxonomy.tags.slice(0, 12).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-subtext">#{tag}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:items-start md:gap-12">
        <div className="space-y-5">
          <SectionHeader eyebrow="timeline" title="최근 기록부터 이어서 보기" description="날짜, 분류, 태그를 함께 보여줘서 어떤 프로젝트의 어떤 수정인지 바로 확인할 수 있게 했습니다." />
          <div className="grid gap-4">
            {sections.timeline.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext md:sticky md:top-24">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">묶음</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.series.map((series) => (
                <div key={series} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text/90">
                  {series}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">분류</div>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category} className="rounded-full border border-point/25 bg-point/10 px-3 py-1 text-point">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
