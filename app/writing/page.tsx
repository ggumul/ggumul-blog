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
  wanderer: '카드를 고른 뒤 바로 결과가 보여야 하는데, 한 박자만 늦어도 전투 리듬이 흐려집니다.',
  hanoi: '규칙은 단순하지만, 폰 화면에서는 “방금 뭘 옮겼는지”가 생각보다 쉽게 묻힙니다.',
  trpg: '선택지를 눌렀을 때 다음 장면으로 넘어가는 감각이 짧은 서사 안에서 살아야 합니다.',
  'color-hanoi': '색 조건이 하나 들어가면 같은 퍼즐도 판단 순서가 달라져서 따로 기록해 두었습니다.',
};
const gameReadAngles: Record<string, string> = {
  wanderer: 'Wanderer는 한 판이 짧아야 살아나서, 선택과 결과 사이가 늘어지는 순간부터 봅니다.',
  hanoi: 'Hanoi는 조작 자체보다 화면 안에서 이동 결과가 바로 읽히는지가 더 자주 걸렸습니다.',
  trpg: 'TRPG는 아직 전용 글이 적어서, 카드·퍼즐과 나란히 놓고 서사 실험의 위치를 먼저 잡았습니다.',
  'color-hanoi': 'Color Hanoi는 색 조건 때문에 Hanoi와 다른 고민이 생겨서 프로젝트 상태부터 보는 편이 낫습니다.',
};
const gameEntryOverrides: Record<string, { href: string; title: string; summary: string; cta: string }> = {
  wanderer: {
    href: '/writing/wanderer-초기-설계-회고',
    title: '왜 Wanderer는 짧은 카드 게임으로 남았나',
    summary: '한 판이 짧아야 살아나는 카드 전투의 기준과, 선택 뒤 결과가 바로 보여야 하는 이유를 남긴 기록입니다.',
    cta: '한 판 흐름 보기 →',
  },
  hanoi: {
    href: '/writing/runtime-화면-확인-기록',
    title: '폰에서 돌려보니 게임 흐름이 생각보다 끊겼다',
    summary: '퍼즐 조작과 모바일 화면 흐름이 실제 화면에서 어디까지 바로 읽히는지 확인한 기록입니다.',
    cta: '퍼즐 흐름 보기 →',
  },
  trpg: {
    href: '/writing/4월-프로젝트-개발-현황',
    title: '카드 전투, 퍼즐, 서사 실험을 한 화면에 나눴다',
    summary: '선택형 서사 실험이 카드 전투와 퍼즐 사이에서 어디에 놓이는지, 현재 보여줄 수 있는 화면 기준으로 나눴습니다.',
    cta: '서사 실험 보기 →',
  },
  'color-hanoi': {
    href: '/projects/color-hanoi',
    title: 'Color Hanoi 프로젝트 상태',
    summary: '색 조건이 들어간 퍼즐 변형이 Hanoi와 어떤 판단 리듬을 다르게 만드는지 프로젝트 상태에서 먼저 확인합니다.',
    cta: '색 조건 보기 →',
  },
};
const gameEntryLabels: Record<string, string> = {
  wanderer: '전투 리듬부터',
  hanoi: '모바일 흐름부터',
  trpg: '서사 화면부터',
  'color-hanoi': '색 조건부터',
};
const topicLabelOverrides: Record<string, string> = {
  runtime: '모바일 흐름',
  hanoi: '퍼즐 이동',
  wanderer: '카드 선택',
  flutter: '실기기 화면',
  sync: '상태 동기화',
  ggumul: '생활 기록',
  dinner: '가격 기록',
  '게임 개발': '플레이 흐름',
  '프로젝트 소개': '게임별 현재 모습',
  회고: '짧게 남긴 판단',
  '작업 철학': '작업 기준',
  '개발 기록': '화면 흐름',
};

function recordLabel(count: number) {
  return `${count}개 기록`;
}

function displayTopicTags(tags: string[]) {
  const labels = tags
    .filter((tag) => !gameOrder.includes(tag))
    .map((tag) => topicLabelOverrides[tag] ?? tag)
    .filter((tag, index, array) => array.indexOf(tag) === index);

  return labels.slice(0, 10);
}

export default async function WritingPage() {
  const [sections, projectRecordMap] = await Promise.all([getWritingArchiveSections(), getProjectRecordMap()]);
  const allPosts = [sections.latest, ...sections.timeline];
  const latestGamePost = allPosts.find((post) => post.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery')) ?? sections.latest;
  const nextUpdates = allPosts.filter((post) => post.slug !== latestGamePost.slug);
  const totalPostCount = allPosts.length;
  const topicTags = displayTopicTags(sections.taxonomy.tags);
  const gameLanes = gameOrder
    .map((slug) => projectRecordMap[slug])
    .filter(Boolean)
    .map(({ project, records }) => ({
      project,
      records,
      hook: gameHooks[project.slug] ?? project.summary,
      entryLabel: gameEntryLabels[project.slug] ?? '먼저 볼 지점',
      readAngle: gameReadAngles[project.slug] ?? '이 게임과 연결된 기록에서 다음에 볼 문제를 고릅니다.',
      entry: gameEntryOverrides[project.slug] ?? (records[0]
        ? {
            href: `/writing/${records[0].slug}`,
            title: records[0].title,
            summary: records[0].summary,
            cta: '게임 상태 보기 →',
          }
        : null),
    }));

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-5 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">게임 개발 기록</p>
            <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              게임을 만들다 막힌 지점을 화면으로 남겨둡니다.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              작은 카드 게임과 퍼즐을 직접 켜 보며 흐름이 끊긴 지점과 고친 이유를 남깁니다. 대부분 실제 화면을 보면서 쓴 기록입니다.
            </p>
          </div>
          <aside className="panel-aside space-y-3 text-sm text-subtext">
            <div className="flex flex-wrap gap-2 text-[12px]">
              <Pill tone="point">실제 화면 중심</Pill>
              <Pill>게임 {gameLanes.length}개</Pill>
              <Pill>기록 {totalPostCount}개</Pill>
              <Link className="trace-chip border-point/35 bg-point/15 text-point transition hover:bg-point/25" href="/feed.xml">RSS</Link>
            </div>
            <p className="text-[13px] leading-6">다시 켰을 때 바로 떠올리려고, 화면 흐름과 막힌 지점을 게임별로 갈라두었습니다.</p>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">먼저 읽기</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">처음 오셨다면 이 글부터</h2>
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
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">게임별 기록</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">게임마다 남긴 기록</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">한 게임 안에서도 막히는 지점이 달라서, 다시 찾기 쉽게 프로젝트별로 갈라두었습니다.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {gameLanes.map(({ project, records, hook, entryLabel, readAngle, entry }) => (
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
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-point">{entryLabel}</div>
                <p className="mt-2 text-[13px] leading-6 text-subtext">{readAngle}</p>
                {entry ? (
                  <Link href={entry.href} className="mt-3 block text-[17px] font-black leading-snug tracking-[-0.035em] text-text hover:text-point">
                    {entry.title}
                    <span className="mt-2 block text-[13px] font-normal leading-6 text-subtext">{entry.summary}</span>
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-subtext">연결된 기록을 준비 중입니다.</p>
                )}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex text-sm font-bold text-point hover:text-text">
                {entry?.cta ?? '게임 상태 보기 →'}
              </Link>
            </section>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">최근 기록</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">다른 개발 기록</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">게임 화면에서 시작한 기록이지만, 장보기 앱이나 작업 리듬처럼 같은 제작 과정에서 나온 기록도 함께 이어집니다.</p>
          </div>
          <div className="grid gap-4">
            {nextUpdates.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">기록 종류</div>
            <div className="space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-text/90">{category}</div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">자주 나온 문제</div>
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
