import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getProjectRecordMap, getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '새 소식',
  description: '작은 게임을 만들며 실제 화면에서 달라진 점과 문제를 해결한 과정을 모았습니다.',
  path: '/writing',
});

const gameOrder = ['wanderer', 'hanoi', 'trpg', 'color-hanoi'];
const gameHooks: Record<string, string> = {
  wanderer: '턴 조건을 읽고 유효한 카드를 내야 하는데, 한 박자만 늦어도 전투 리듬이 흐려집니다.',
  hanoi: '규칙은 단순하지만, 폰 화면에서는 “방금 뭘 옮겼는지”가 생각보다 쉽게 묻힙니다.',
  trpg: '선택지를 눌렀을 때 이어지는 흐름이 짧은 서사 안에서 살아야 합니다.',
  'color-hanoi': '색 조건이 하나 들어가면 같은 퍼즐도 판단 순서가 달라져서 따로 기록해 두었습니다.',
};
const gameReadAngles: Record<string, string> = {
  wanderer: 'Wanderer는 한 판이 짧아야 살아나서, 선택과 결과 사이가 늘어지는 순간부터 봅니다.',
  hanoi: 'Hanoi는 조작 자체보다 화면 안에서 이동 결과가 바로 읽히는지가 더 자주 걸렸습니다.',
  trpg: 'TRPG는 아직 전용 글이 적어서, 카드·퍼즐과 나란히 놓고 서사 실험의 위치를 먼저 잡았습니다.',
  'color-hanoi': 'Color Hanoi는 색 조건 때문에 Hanoi와 다른 고민이 생겨서 규칙 쪽을 먼저 보는 편이 낫습니다.',
};
const gameEntryOverrides: Record<string, { slug?: string; href: string; title: string; summary: string; cta: string }> = {
  wanderer: {
    slug: 'wanderer-초기-설계-회고',
    href: '/writing/wanderer-초기-설계-회고',
    title: '왜 Wanderer는 짧은 카드 게임으로 남았나',
    summary: '조건을 읽고 카드를 낸 뒤 결과가 바로 떠야 Wanderer가 살아납니다.',
    cta: '한 턴 →',
  },
  hanoi: {
    slug: 'runtime-화면-확인-기록',
    href: '/writing/runtime-화면-확인-기록',
    title: '폰에서 돌려보니 게임 흐름이 생각보다 끊겼다',
    summary: '막대를 옮긴 뒤 다음 상태가 바로 보이는지 봤습니다.',
    cta: '퍼즐 →',
  },
  trpg: {
    slug: '4월-프로젝트-개발-현황',
    href: '/writing/4월-프로젝트-개발-현황',
    title: '카드 전투, 퍼즐, 서사 실험을 한 화면에 나눴다',
    summary: '선택지가 장면을 어떻게 바꾸는지 카드와 퍼즐 옆에 놓고 봤습니다.',
    cta: '서사 실험 →',
  },
  'color-hanoi': {
    href: '/projects/color-hanoi',
    title: 'Color Hanoi 색 조건',
    summary: '색 조건이 들어가면 같은 Hanoi도 옮기는 판단이 달라집니다.',
    cta: '색 조건 →',
  },
};
const gameEntryLabels: Record<string, string> = {
  wanderer: '전투 리듬',
  hanoi: '모바일 조작',
  trpg: '서사 선택',
  'color-hanoi': '색 조건부터',
};

export default async function WritingPage() {
  const [sections, projectRecordMap] = await Promise.all([getWritingArchiveSections(), getProjectRecordMap()]);
  const allPosts = [sections.latest, ...sections.timeline];
  const latestGamePost = allPosts.find((post) => post.relatedProjects.some((project) => project !== 'ggumul-dinner-grocery')) ?? sections.latest;
  const nextUpdates = allPosts.filter((post) => post.slug !== latestGamePost.slug);

  const gameLanes = gameOrder
    .map((slug) => projectRecordMap[slug])
    .filter(Boolean)
    .map(({ project, records }) => ({
      project,
      records,
      hook: gameHooks[project.slug] ?? project.summary,
      entryLabel: gameEntryLabels[project.slug] ?? '바로 읽기',
      readAngle: gameReadAngles[project.slug] ?? '게임마다 막힌 장면을 하나씩 남겼습니다.',
      entry: gameEntryOverrides[project.slug] ?? (records[0]
        ? {
            slug: records[0].slug,
            href: `/writing/${records[0].slug}`,
            title: records[0].title,
            summary: records[0].summary,
            cta: '글 열기 →',
          }
        : null),
    }));

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <section className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-5 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">새 소식</p>
            <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[72px]">
              카드 한 장, 막대 하나, 선택지 하나.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              Wanderer, Hanoi, TRPG를 켜 보고 플레이가 어디서 멈추는지 짧게 남겼습니다.
            </p>
          </div>
          <aside className="panel-aside space-y-3 text-sm text-subtext">
            <p className="text-[13px] leading-6">Wanderer는 카드 판단, Hanoi는 이동 결과, TRPG는 선택 뒤 이어지는 장면을 봅니다.</p>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">Wanderer</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">폰에서 버튼을 눌렀는데 결과가 늦었습니다</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-subtext">
              카드 게임은 버튼을 누른 뒤 결과가 늦으면 바로 힘이 빠집니다. 그래서 이 글을 맨 위에 뒀습니다.
            </p>
          </div>
          <Link href={`/writing/${latestGamePost.slug}`} className="text-sm font-bold text-point hover:text-text">끊긴 장면 →</Link>
        </div>
        <PostCard post={latestGamePost} featured />

      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">게임별</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">게임마다 다른 순간</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">카드 전투, 퍼즐 이동, 서사 선택은 서로 다른 곳에서 막힙니다.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {gameLanes.map(({ project, records, hook, entryLabel, readAngle, entry }) => (
            <section key={project.slug} className="rounded-[28px] border border-line/80 bg-white/[0.045] p-5 transition hover:border-point/40 hover:bg-white/[0.06]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.22em] text-point">{project.progressStatus}</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-text">{project.title}</h3>
                </div>
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
                  <p className="mt-2 text-sm text-subtext">아직 따로 뺀 글은 없습니다.</p>
                )}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex text-sm font-bold text-point hover:text-text">
                {entry?.cta ?? '글 열기 →'}
              </Link>
            </section>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">나머지</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">장보기와 소식</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtext">게임 밖에서 나온 가격 판단과 제작 리듬은 아래에만 모았습니다.</p>
        </div>
        <div className="grid gap-4">
          {nextUpdates.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
