import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

const projectKinds: Record<string, string> = {
  'ggumul-dinner-grocery': '생활 도구',
  wanderer: '카드 게임',
  trpg: '분기형 서사',
  hanoi: '퍼즐 게임',
  'color-hanoi': '퍼즐 변형작',
};

const progressTone: Record<ProjectEntry['progressStatus'], string> = {
  '플레이 확인': 'border-emerald-300/35 bg-emerald-300/12 text-emerald-100',
  '개발 중': 'border-point/30 bg-point/12 text-point',
  '계약 점검 중': 'border-sky-300/35 bg-sky-300/12 text-sky-100',
  보류: 'border-line/80 bg-white/[0.045] text-subtext',
};

function EvidenceFallback({ project }: { project: ProjectEntry }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col justify-between bg-[radial-gradient(circle_at_18%_12%,rgba(255,180,95,0.24),transparent_17rem),linear-gradient(135deg,rgba(28,18,22,0.98),rgba(10,8,12,0.98))] p-5">
      <span className="inline-flex w-fit rounded-full border border-point/25 bg-point/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-point">
        기록 기반 카드
      </span>
      <div>
        <p className="text-[13px] font-bold text-point">{project.evidenceLabel}</p>
        <p className="mt-2 max-w-[14rem] text-[30px] font-black leading-none tracking-[-0.06em] text-text">{project.title}</p>
      </div>
    </div>
  );
}

function StatusFacts({ project }: { project: ProjectEntry }) {
  return (
    <dl className="grid gap-2 text-[13px] leading-6 text-subtext">
      <div className="rounded-2xl border border-line/70 bg-black/15 p-3">
        <dt className="font-bold text-text">확인한 것</dt>
        <dd className="mt-1">{project.verificationNote}</dd>
      </div>
      <div className="rounded-2xl border border-line/70 bg-black/15 p-3">
        <dt className="font-bold text-text">다음에 볼 것</dt>
        <dd className="mt-1">{project.nextStep}</dd>
      </div>
    </dl>
  );
}

export function ProjectCard({ project, records, compact = false }: { project: ProjectEntry; records: WritingEntry[]; compact?: boolean }) {
  const latestRecord = records[0];
  const cover = project.coverImage;

  if (compact) {
    return (
      <Link href={`/projects/${project.slug}`} className="group grid gap-3 rounded-[22px] border border-line/75 bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:border-point/55 hover:bg-white/[0.07]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">{projectKinds[project.slug] ?? '게임'}</p>
            <h3 className="mt-1 text-xl font-black tracking-[-0.045em] text-text group-hover:text-point">{project.title}</h3>
          </div>
          <span className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-bold ${progressTone[project.progressStatus]}`}>
            {project.progressStatus}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-subtext">{project.summary}</p>
        <div className="grid gap-2 text-[12px] leading-5 text-subtext">
          <p><span className="font-bold text-text">확인</span> · {project.verificationNote}</p>
          <p><span className="font-bold text-text">다음</span> · {project.nextStep}</p>
        </div>
        <p className="text-[12px] text-subtext">개발기록 {records.length}개{latestRecord ? ` · 최근 ${latestRecord.title}` : ''}</p>
      </Link>
    );
  }

  return (
    <article className="game-card-glow overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.05]">
      <div className="grid gap-0 md:grid-cols-[minmax(260px,0.82fr)_minmax(0,1.18fr)]">
        <Link href={`/projects/${project.slug}`} className="group relative min-h-[240px] overflow-hidden bg-white/[0.04] md:min-h-full">
          {cover ? (
            <img src={cover} alt={`${project.title} 대표 화면`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
          ) : (
            <EvidenceFallback project={project} />
          )}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur">{projectKinds[project.slug] ?? '게임'}</span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-black backdrop-blur ${progressTone[project.progressStatus]}`}>{project.progressStatus}</span>
          </div>
        </Link>

        <div className="flex flex-col justify-between p-5 md:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
              <span className="font-bold text-point">{projectKinds[project.slug] ?? '게임 프로젝트'}</span>
              <span>·</span>
              <span>개발기록 {records.length}개</span>
              <span>·</span>
              <span>{project.evidenceLabel}</span>
            </div>
            <Link href={`/projects/${project.slug}`} className="group/title">
              <h3 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.055em] text-text group-hover/title:text-point md:text-[40px]">{project.title}</h3>
            </Link>
            <p className="mt-3 text-base leading-8 text-subtext">{project.summary}</p>
          </div>

          <div className="mt-5 space-y-3">
            <StatusFacts project={project} />
            {latestRecord ? (
              <Link href={project.evidenceHref} className="block rounded-[20px] border border-line/75 bg-black/15 p-4 transition hover:border-point/55 hover:bg-white/[0.055]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">근거 기록</p>
                <p className="mt-2 text-sm font-bold leading-6 text-text">{project.evidenceLabel}</p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-subtext">{latestRecord.summary}</p>
              </Link>
            ) : (
              <div className="rounded-[20px] border border-line/75 bg-black/15 p-4 text-sm leading-6 text-subtext">아직 연결된 개발기록이 없습니다.</div>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={`/projects/${project.slug}`} className="inline-flex rounded-full border border-point/30 bg-point px-4 py-2.5 font-semibold text-[#160d08] transition hover:bg-[#ffc47f]">자세히 보기</Link>
              <Link href={project.evidenceHref} className="inline-flex rounded-full border border-line/90 bg-white/10 px-4 py-2.5 font-semibold text-text transition hover:border-point/60">확인 기록 보기</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
