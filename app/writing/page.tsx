import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { Pill } from '@/components/brand-ui';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '개발 기록',
  description: '작은 게임을 만들며 실제 화면에서 달라진 점과 문제를 해결한 과정을 모았습니다.',
  path: '/writing',
});

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();
  const allPosts = [sections.latest, ...sections.timeline];
  const latestGamePost = allPosts.find((post) => post.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery')) ?? sections.latest;
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
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">game devlog archive</p>
            <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              게임이 실제로 어떻게 바뀌었는지 따라갑니다.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              단순 작업일지가 아니라 직접 켜 본 화면, 꼬였던 문제, 바뀐 판단을 기록합니다. 처음 온 사람도 어떤 게임에서 무슨 일이 있었는지 제목만 보고 고를 수 있게 정리합니다.
            </p>
          </div>
          <aside className="panel-aside space-y-3 text-sm text-subtext">
            <div className="flex flex-wrap gap-2 text-[12px]">
              <Pill tone="point">글 {totalPostCount}개</Pill>
              <Pill>시리즈 {sections.index.seriesCount}개</Pill>
              <Pill>분류 {sections.index.categoryCount}개</Pill>
              <Link className="trace-chip border-point/35 bg-point/15 text-point transition hover:bg-point/25" href="/feed.xml">RSS</Link>
            </div>
            <p className="text-[13px] leading-6">게임별 변화와 최근에 고친 문제를 먼저 볼 수 있게 묶었습니다.</p>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">start here</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">처음이면 이 기록부터</h2>
          </div>
          <Link href={`/writing/${latestGamePost.slug}`} className="text-sm font-bold text-point hover:text-text">바로 읽기 →</Link>
        </div>
        <PostCard post={latestGamePost} featured />
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">by game</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">게임별로 읽기</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">Wanderer, Hanoi, TRPG처럼 게임마다 화면 확인과 문제 해결 흐름을 따로 볼 수 있게 묶었습니다.</p>
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
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">all updates</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">모든 업데이트</h2>
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
