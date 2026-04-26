import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

const projectKinds: Record<string, string> = {
  wanderer: '카드 게임',
  trpg: '분기형 서사',
  hanoi: '퍼즐 게임',
  'color-hanoi': '퍼즐 변형작',
};

export function ProjectCard({ project, records, compact = false }: { project: ProjectEntry; records: WritingEntry[]; compact?: boolean }) {
  const latestRecord = records[0];
  const cover = project.coverImage ?? '/studio/wanderer-home.png';

  if (compact) {
    return (
      <Link href={`/projects/${project.slug}`} className="group grid gap-3 rounded-[22px] border border-line/75 bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:border-point/55 hover:bg-white/[0.07]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">{projectKinds[project.slug] ?? '게임'}</p>
            <h3 className="mt-1 text-xl font-black tracking-[-0.045em] text-text group-hover:text-point">{project.title}</h3>
          </div>
          <span className="rounded-full border border-line/70 px-3 py-1 text-[12px] text-subtext">{project.status}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-subtext">{project.summary}</p>
        <p className="text-[12px] text-subtext">개발기록 {records.length}개{latestRecord ? ` · 최근 ${latestRecord.title}` : ''}</p>
      </Link>
    );
  }

  return (
    <article className="game-card-glow overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.05]">
      <div className="grid gap-0 md:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
        <Link href={`/projects/${project.slug}`} className="group relative min-h-[260px] overflow-hidden bg-white/[0.04]">
          <img src={cover} alt={`${project.title} 대표 화면`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur">{projectKinds[project.slug] ?? '게임'}</span>
            <span className="rounded-full border border-point/25 bg-point/90 px-3 py-1 text-[11px] font-black text-[#160d08]">{project.status}</span>
          </div>
        </Link>

        <div className="flex flex-col justify-between p-5 md:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
              <span className="font-bold text-point">{projectKinds[project.slug] ?? '게임 프로젝트'}</span>
              <span>·</span>
              <span>개발기록 {records.length}개</span>
            </div>
            <Link href={`/projects/${project.slug}`} className="group/title">
              <h3 className="mt-3 text-[30px] font-black leading-tight tracking-[-0.055em] text-text group-hover/title:text-point md:text-[42px]">{project.title}</h3>
            </Link>
            <p className="mt-3 text-base leading-8 text-subtext">{project.summary}</p>
          </div>

          <div className="mt-6 space-y-3">
            {latestRecord ? (
              <Link href={`/writing/${latestRecord.slug}`} className="block rounded-[20px] border border-line/75 bg-black/15 p-4 transition hover:border-point/55 hover:bg-white/[0.055]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">최근 개발기록</p>
                <p className="mt-2 text-sm font-bold leading-6 text-text">{latestRecord.title}</p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-subtext">{latestRecord.summary}</p>
              </Link>
            ) : (
              <div className="rounded-[20px] border border-line/75 bg-black/15 p-4 text-sm leading-6 text-subtext">아직 연결된 개발기록이 없습니다.</div>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={`/projects/${project.slug}`} className="inline-flex rounded-full border border-point/30 bg-point px-4 py-2.5 font-semibold text-[#160d08] transition hover:bg-[#ffc47f]">프로젝트 보기</Link>
              {latestRecord ? <Link href={`/writing/${latestRecord.slug}`} className="inline-flex rounded-full border border-line/90 bg-white/10 px-4 py-2.5 font-semibold text-text transition hover:border-point/60">기록 읽기</Link> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
