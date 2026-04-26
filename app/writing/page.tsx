import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { Pill } from '@/components/brand-ui';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '개발 기록',
  description: 'Wanderer, Hanoi, TRPG를 만들며 확인한 버그, 화면, 설계 결정을 모았습니다.',
  path: '/writing',
});

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();
  const allPosts = [sections.latest, ...sections.timeline];
  const totalPostCount = allPosts.length;
  const projectTags = sections.taxonomy.tags.filter((tag) => ['wanderer', 'hanoi', 'trpg', 'color-hanoi'].includes(tag));
  const topicTags = sections.taxonomy.tags.filter((tag) => !projectTags.includes(tag)).slice(0, 12);
  const lanes = projectTags.map((project) => ({
    project,
    posts: allPosts.filter((post) => post.relatedProjects.includes(project)).slice(0, 3),
  })).filter((lane) => lane.posts.length > 0);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-5 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">devlog archive</p>
            <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              화면 확인, 버그 원인, 설계 판단을 프로젝트별로 남깁니다.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              단순 소식 모음이 아니라 게임을 만들면서 무엇을 실제로 확인했고, 어떤 문제가 남았는지 추적하는 개발기록입니다. 최신 기록을 먼저 보여주고 아래에서 프로젝트별 흐름으로 다시 묶었습니다.
            </p>
          </div>
          <aside className="panel-aside space-y-3 text-sm text-subtext">
            <div className="flex flex-wrap gap-2 text-[12px]">
              <Pill tone="point">글 {totalPostCount}개</Pill>
              <Pill>시리즈 {sections.index.seriesCount}개</Pill>
              <Pill>분류 {sections.index.categoryCount}개</Pill>
              <Link className="trace-chip border-point/35 bg-point/15 text-point transition hover:bg-point/25" href="/feed.xml">RSS</Link>
            </div>
            <p className="text-[13px] leading-6">목록은 최신순, 프로젝트 lane, 전체 archive 순서로 읽히게 재구성했습니다.</p>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">latest</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">가장 최근 확인한 작업</h2>
          </div>
          <Link href={`/writing/${sections.latest.slug}`} className="text-sm font-bold text-point hover:text-text">최신 글 바로 읽기 →</Link>
        </div>
        <PostCard post={sections.latest} featured />
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">project lanes</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">프로젝트별 흐름</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">같은 글이라도 여러 프로젝트에 걸쳐 있으면 각 lane에 다시 나타납니다. 어떤 게임에서 문제가 이어졌는지 빠르게 찾기 위한 구조입니다.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {lanes.map((lane) => (
            <section key={lane.project} className="rounded-[28px] border border-line/80 bg-white/[0.045] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black tracking-[-0.05em] text-text">#{lane.project}</h3>
                <span className="rounded-full border border-line/70 px-3 py-1 text-[12px] text-subtext">{lane.posts.length}개 표시</span>
              </div>
              <div className="grid gap-3">
                {lane.posts.map((post) => (
                  <PostCard key={`${lane.project}-${post.slug}`} post={post} compact />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">archive</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">전체 기록</h2>
          </div>
          <div className="grid gap-4">
            {sections.timeline.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">글 유형</div>
            <div className="space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-text/90">{category}</div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">주제 태그</div>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {topicTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-subtext">#{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
