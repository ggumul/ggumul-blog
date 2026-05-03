import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

const projectKinds: Record<string, string> = {
  'ggumul-dinner-grocery': '저녁 장보기 도구',
  wanderer: '카드 게임',
  trpg: '분기형 서사',
  hanoi: '퍼즐 게임',
  'color-hanoi': '색 조건 하노이',
};

const progressTone: Record<ProjectEntry['progressStatus'], string> = {
  '플레이 확인': 'border-[#fff1b8]/65 bg-[#7ee6c6] text-[#10183a]',
  '개발 중': 'border-[#fff1b8]/65 bg-[#ffd447] text-[#10183a]',
  '계약 점검 중': 'border-[#fff1b8]/65 bg-[#8fd2ff] text-[#10183a]',
  보류: 'border-[#fff1b8]/45 bg-[#1f46a2] text-subtext',
};

const projectHooks: Record<string, string> = {
  'ggumul-dinner-grocery': '식단을 정하면 장보기와 가격 판단까지 이어집니다.',
  wanderer: '턴 조건을 보고 유효한 카드를 내서 상대보다 높게 겨루는 짧은 한 판입니다.',
  trpg: '선택한 문장이 이어지는 흐름과 결말로 돌아옵니다.',
  hanoi: '막대를 옮기는 순서 하나가 퍼즐의 길을 만듭니다.',
  'color-hanoi': '색 조건 하나가 익숙한 퍼즐을 다른 문제로 바꿉니다.',
};

const projectCtas: Record<string, string> = {
  'ggumul-dinner-grocery': '장보기 흐름',
  wanderer: '30초 카드 골라보기',
  trpg: '첫 장면',
  hanoi: '퍼즐 흐름',
  'color-hanoi': '변형 규칙',
};

const statusLabel: Record<ProjectEntry['progressStatus'], string> = {
  '플레이 확인': '화면 있음',
  '개발 중': '미리보기',
  '계약 점검 중': '가격 연결 중',
  보류: '보관',
};

function EvidenceFallback({ project }: { project: ProjectEntry }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col justify-between bg-[radial-gradient(circle_at_18%_12%,rgba(255,212,71,0.34),transparent_17rem),linear-gradient(135deg,rgba(31,70,162,0.98),rgba(16,24,58,0.98))] p-5">
      <span className="inline-flex w-fit rounded-full border-2 border-[#fff1b8]/55 bg-[#ffd447] px-3 py-1 text-[11px] font-black text-[#15183a]">
        새 장면
      </span>
      <div>
        <p className="text-[13px] font-bold text-point">{project.evidenceLabel}</p>
        <p className="mt-2 max-w-[14rem] text-[30px] font-black leading-none tracking-[-0.06em] text-text">{project.title}</p>
      </div>
    </div>
  );
}

function getProjectHref(project: ProjectEntry) {
  return project.slug === 'wanderer' ? `/projects/${project.slug}#mini-play` : `/projects/${project.slug}`;
}

export function ProjectCard({ project, records, compact = false }: { project: ProjectEntry; records: WritingEntry[]; compact?: boolean }) {
  const latestRecord = records[0];
  const cover = project.coverImage;
  const projectHref = getProjectHref(project);

  if (compact) {
    return (
      <Link href={projectHref} className="group grid gap-3 rounded-[20px] border-2 border-[#fff1b8]/34 bg-[#1b3d96]/58 p-4 transition hover:-translate-y-0.5 hover:border-point hover:bg-[#244aa8]/80">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-black text-point">{projectKinds[project.slug] ?? '게임'}</p>
            <h3 className="mt-1 text-xl font-black tracking-[-0.045em] text-text group-hover:text-point">{project.title}</h3>
          </div>
          <span className={`shrink-0 rounded-full border-2 px-3 py-1 text-[12px] font-black ${progressTone[project.progressStatus]}`}>
            {statusLabel[project.progressStatus] ?? project.progressStatus}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-subtext">{projectHooks[project.slug] ?? project.summary}</p>
        <span className="inline-flex text-[13px] font-black text-point">{projectCtas[project.slug] ?? '프로젝트'} →</span>
      </Link>
    );
  }

  return (
    <article className="game-card-glow overflow-hidden rounded-[26px] border-[3px] border-[#fff1b8]/45 bg-[#1b3d96]/68">
      <div className="grid gap-0 md:grid-cols-[minmax(260px,0.82fr)_minmax(0,1.18fr)]">
        <Link href={projectHref} className="group relative min-h-[240px] overflow-hidden bg-[#10183a] md:min-h-full">
          {cover ? (
            <img src={cover} alt={`${project.title} 대표 화면`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
          ) : (
            <EvidenceFallback project={project} />
          )}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="rounded-full border-2 border-[#fff1b8]/60 bg-[#10183a]/65 px-3 py-1 text-[11px] font-bold text-text backdrop-blur">{projectKinds[project.slug] ?? '게임'}</span>
            <span className={`rounded-full border-2 px-3 py-1 text-[11px] font-black backdrop-blur ${progressTone[project.progressStatus]}`}>{statusLabel[project.progressStatus] ?? project.progressStatus}</span>
          </div>
        </Link>

        <div className="flex flex-col justify-between p-5 md:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
              <span className="font-bold text-point">{projectKinds[project.slug] ?? '게임 프로젝트'}</span>
              {latestRecord ? <span>· {project.evidenceLabel}</span> : null}
            </div>
            <Link href={projectHref} className="group/title">
              <h3 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.055em] text-text group-hover/title:text-point md:text-[40px]">{project.title}</h3>
            </Link>
            <p className="mt-3 rounded-[20px] border-2 border-[#fff1b8]/30 bg-[#10183a]/32 p-4 text-[18px] font-black leading-7 tracking-[-0.04em] text-text md:text-[22px] md:leading-8">
              {projectHooks[project.slug] ?? project.summary}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={projectHref} className="game-button-primary px-4 py-2.5 text-sm">{projectCtas[project.slug] ?? '프로젝트'}</Link>
              <Link href={project.evidenceHref} className="game-button-secondary px-4 py-2.5 text-sm">새 소식</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
