import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { Pill } from '@/components/brand-ui';
import { getProjectRecordMap, getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '개발 기록',
  description: '작은 게임을 만들며 실제 화면에서 달라진 점과 문제를 해결한 과정을 모았습니다.',
  path: '/writing',
});

const gameOrder = ['wanderer', 'hanoi', 'trpg', 'color-hanoi'];
const gameHooks: Record<string, string> = {
  wanderer: '한 장을 고르고 결과를 바로 보는 카드 전투가 어디서 끊기는지 따라갑니다.',
  hanoi: '단순한 퍼즐 조작이 화면 안에서 충분히 읽히는지 봅니다.',
  trpg: '선택 하나가 다음 장면으로 이어지는 감각을 짧은 서사로 확인합니다.',
  'color-hanoi': '색 조건이 들어갔을 때 퍼즐 판단 리듬이 어떻게 바뀌는지 봅니다.',
};

function recordLabel(count: number) {
  return `${count}개 기록`;
}

export default async function WritingPage() {
  const [sections, projectRecordMap] = await Promise.all([getWritingArchiveSections(), getProjectRecordMap()]);
  const allPosts = [sections.latest, ...sections.timeline];
  const latestGamePost = allPosts.find((post) => post.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery')) ?? sections.latest;
  const nextUpdates = allPosts.filter((post) => post.slug !== latestGamePost.slug);
  const totalPostCount = allPosts.length;
  const topicTags = sections.taxonomy.tags.filter((tag) => !gameOrder.includes(tag)).slice(0, 10);
  const gameLanes = gameOrder
    .map((slug) => projectRecordMap[slug])
    .filter(Boolean)
    .map(({ project, records }) => ({
      project,
      records,
      hook: gameHooks[project.slug] ?? project.summary,
      leadRecord: records[0] ?? null,
    }));

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-5 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">game devlog archive</p>
            <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              플레이하다 막힌 순간을 실제 화면으로 남깁니다.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              작은 카드 게임과 퍼즐을 직접 켜 보며 어디서 흐름이 끊겼는지, 고치고 나서 무엇이 달라져야 하는지 기록합니다. 처음 온 사람도 제목만 보고 문제와 변화를 고를 수 있게 정리했습니다.
            </p>
          </div>
          <aside className="panel-aside space-y-3 text-sm text-subtext">
            <div className="flex flex-wrap gap-2 text-[12px]">
              <Pill tone="point">글 {totalPostCount}개</Pill>
              <Pill>게임 {gameLanes.length}개</Pill>
              <Pill>분류 {sections.index.categoryCount}개</Pill>
              <Link className="trace-chip border-point/35 bg-point/15 text-point transition hover:bg-point/25" href="/feed.xml">RSS</Link>
            </div>
            <p className="text-[13px] leading-6">읽는 순서를 줄였습니다. 먼저 대표 기록을 보고, 그다음 게임별 문제를 따라가면 됩니다.</p>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">start here</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">처음이면 이 문제부터</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-subtext">
              PC에서는 괜찮아 보였던 흐름이 실제 폰에서는 어떻게 끊기는지 먼저 보면, 이 개발기록이 무엇을 보는지 바로 잡힙니다.
            </p>
          </div>
          <Link href={`/writing/${latestGamePost.slug}`} className="text-sm font-bold text-point hover:text-text">문제부터 읽기 →</Link>
        </div>
        <PostCard post={latestGamePost} featured />
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">by game</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">게임별로 고른 입구</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">같은 글 카드를 반복하기보다, 각 게임에서 지금 무엇을 보고 있는지 먼저 보여줍니다. 필요한 기록만 바로 이어서 읽을 수 있습니다.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {gameLanes.map(({ project, records, hook, leadRecord }) => (
            <section key={project.slug} className="rounded-[28px] border border-line/80 bg-white/[0.045] p-5 transition hover:border-point/40 hover:bg-white/[0.06]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.22em] text-point">{project.progressStatus}</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-text">{project.title}</h3>
                </div>
                <span className="rounded-full border border-line/70 px-3 py-1 text-[12px] text-subtext">{recordLabel(records.length)}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-subtext">{hook}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/18 p-4">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-point">next read</div>
                {leadRecord ? (
                  <Link href={`/writing/${leadRecord.slug}`} className="mt-2 block text-[17px] font-black leading-snug tracking-[-0.035em] text-text hover:text-point">
                    {leadRecord.title}
                    <span className="mt-2 block text-[13px] font-normal leading-6 text-subtext">{leadRecord.summary}</span>
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-subtext">연결된 기록을 준비 중입니다.</p>
                )}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex text-sm font-bold text-point hover:text-text">
                게임 상태 보기 →
              </Link>
            </section>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">more updates</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">다음으로 읽을 기록</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">대표 글에서 이미 본 기록은 빼고, 문제와 판단이 다른 기록만 이어서 보여줍니다.</p>
          </div>
          <div className="grid gap-4">
            {nextUpdates.map((post) => (
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
