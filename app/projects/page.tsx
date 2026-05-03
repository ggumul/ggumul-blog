import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { PostCard } from '@/components/post-card';
import { getProjectRecordMap } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '게임과 도구',
  description: '꼬물이 만들고 있는 게임과 생활 도구를, 무엇을 해볼 수 있는지 바로 보이게 모았습니다.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projectRecordMap = await getProjectRecordMap();
  const worklines = Object.values(projectRecordMap).sort((a, b) => a.project.order - b.project.order);
  const lead = worklines.find(({ project }) => project.slug === 'wanderer') ?? worklines[0];
  const otherWorklines = worklines.filter(({ project }) => project.slug !== lead?.project.slug);
  const recentRecords = Array.from(
    new Map(worklines.flatMap(({ records }) => records.slice(0, 1)).map((post) => [post.slug, post])).values(),
  ).slice(0, 3);

  return (
    <div className="archive-surface space-y-10 md:space-y-14">
      <section className="studio-hero overflow-hidden rounded-[30px] border-[3px] border-[#fff1b8]/50 bg-[#1f46a2]/45 p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,1.2fr)] lg:items-stretch">
          <div className="flex flex-col justify-center rounded-[24px] border-2 border-[#fff1b8]/42 bg-[#10183a]/42 p-5 md:p-7">
            <p className="text-[12px] font-black tracking-[0.08em] text-point">게임과 도구</p>
            <h1 className="mt-3 max-w-4xl text-[38px] font-black leading-[0.98] tracking-[-0.07em] text-text md:text-[68px]">
              Wanderer부터 바로 봅니다.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
              먼저 볼 건 규칙을 보고 카드 한 장을 내는 Wanderer입니다. 나머지 퍼즐과 도구는 아래에서 짧게 고를 수 있게 줄였습니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href="/projects/wanderer#mini-play" className="game-button-primary">한 턴 해보기</Link>
              <Link href="/writing/runtime-화면-확인-기록" className="game-button-secondary">게임 흐름 보기</Link>
            </div>
          </div>

          <figure className="studio-shot relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] border-[3px] border-[#fff1b8]/55 bg-[#10183a] p-4 md:min-h-[500px] md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,212,71,0.22),transparent_26%),radial-gradient(circle_at_78%_20%,rgba(255,114,166,0.18),transparent_26%),linear-gradient(135deg,rgba(31,70,162,0.95),rgba(16,24,58,0.98))]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="rounded-full border-2 border-[#fff1b8]/70 bg-[#ffd447] px-3 py-1 text-[12px] font-black text-[#15183a] shadow-[0_3px_0_rgba(8,13,43,0.45)]">
                Wanderer 한 턴
              </div>
              <div className="rounded-full border border-[#fff1b8]/35 bg-[#10183a]/58 px-3 py-1 text-[12px] font-black text-subtext">
                규칙: 홀수 카드만 유효
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-[620px] gap-4 py-6">
              <div className="rounded-[24px] border-[3px] border-[#fff1b8]/45 bg-[#172f82]/84 p-4 shadow-[0_6px_0_rgba(8,13,43,0.42)] md:p-6">
                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/35 bg-[#10183a]/55 p-4 text-center">
                    <p className="text-[12px] font-black text-subtext">상대 카드</p>
                    <p className="mt-2 text-6xl font-black tracking-[-0.08em] text-[#ffd447]">13</p>
                  </div>
                  <div className="text-center text-[13px] font-black text-point">VS</div>
                  <div className="rounded-[18px] border-2 border-[#fff1b8]/65 bg-[#ff72a6]/90 p-4 text-center shadow-[0_5px_0_rgba(8,13,43,0.35)]">
                    <p className="text-[12px] font-black text-[#15183a]">내 카드</p>
                    <p className="mt-2 text-6xl font-black tracking-[-0.08em] text-[#15183a]">15</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[18px] border-2 border-[#fff1b8]/35 bg-[#10183a]/58 p-4">
                  <p className="text-[12px] font-black text-point">결과</p>
                  <p className="mt-1 text-lg font-black leading-7 text-text">15는 홀수라 살아남고, 13보다 높아 턴을 가져갑니다.</p>
                </div>
              </div>
            </div>

            <figcaption className="studio-caption relative">
              <span>조건 확인 → 카드 선택 → 결과</span>
              <Link href="/projects/wanderer#mini-play">한 턴 해보기</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {lead ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black tracking-[0.08em] text-point">먼저 해볼 게임</p>
              <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">한 장을 골라 결과를 봅니다</h2>
            </div>
            <Link href="/projects/wanderer#mini-play" className="text-sm font-black text-point hover:text-text">한 턴 고르기 →</Link>
          </div>
          <ProjectCard project={lead.project} records={lead.records} />
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-black tracking-[0.08em] text-point">다른 게임과 도구</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[44px]">짧게 보고 고릅니다</h2>
          </div>
          <Link href="/writing" className="text-sm font-bold text-point hover:text-text">글 목록 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {otherWorklines.map(({ project, records }) => (
            <ProjectCard key={project.slug} project={project} records={records} compact />
          ))}
        </div>
      </section>

      <section className="panel-section space-y-5">
        <div>
          <p className="text-[12px] font-black tracking-[0.08em] text-point">새 소식</p>
          <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.05em] text-text md:text-[42px]">새로 좋아진 점</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recentRecords.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
