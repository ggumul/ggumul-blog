import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

type ProjectCardProps = {
  project: ProjectEntry;
  records?: WritingEntry[];
  compact?: boolean;
};

const projectCtas: Record<string, string> = {
  wanderer: 'Wanderer 보기',
  hanoi: 'Hanoi 보기',
  trpg: 'TRPG 보기',
  'color-hanoi': 'Color Hanoi 보기',
  'ggumul-dinner-grocery': '장보기 도구 보기',
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

function EvidenceFallback({ project }: { project: ProjectEntry }) {
  return (
    <div aria-label="프로젝트-폴백" className="border-t border-line/30 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
      <p className="text-[12px] font-black tracking-[0.14em] text-point">{project.evidenceLabel}</p>
      <p className="mt-3 text-[20px] font-black leading-tight tracking-[-0.04em] text-text">{project.title}</p>
      <p className="mt-2 text-sm leading-6 text-subtext">{project.summary}</p>
    </div>
  );
}

function WandererCardPreview() {
  return (
    <div className="wanderer-card-preview border-t border-line/30 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
      <p className="text-[12px] font-black tracking-[0.14em] text-point">Wanderer 한 턴</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-subtext">
        <p><strong className="text-text">규칙</strong> 홀수 카드만 살아남습니다.</p>
        <p><strong className="text-text">선택</strong> 손에 든 카드 중 하나를 고릅니다.</p>
        <p><strong className="text-text">결과</strong> 선택 직후 생존 여부가 드러납니다.</p>
      </div>
    </div>
  );
}

export function ProjectCard({ project, records = [], compact = false }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const previewRecords = records.slice(0, compact ? 1 : 2);

  return (
    <article className="grid gap-4 rounded-[20px] border border-line/45 bg-white/[0.035] p-4 md:grid-cols-[minmax(0,0.85fr)_minmax(220px,0.45fr)] md:p-5">
      <div className="space-y-4">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">{project.progressStatus}</p>
          <h3 className="mt-2 text-[24px] font-black leading-tight tracking-[-0.045em] text-text md:text-[32px]">
            <Link href={projectHref} className="hover:text-point">{project.title}</Link>
          </h3>
          <p className="mt-3 text-sm leading-7 text-subtext">{project.summary}</p>
        </div>

        {previewRecords.length ? (
          <div className="space-y-2 border-t border-line/30 pt-3">
            {previewRecords.map((record) => (
              <Link key={record.slug} href={`/writing/${record.slug}`} className="grid gap-1 text-sm leading-6 md:grid-cols-[88px_minmax(0,1fr)]">
                <time className="text-subtext" dateTime={record.publishedAt}>{formatDate(record.publishedAt)}</time>
                <span className="font-bold text-text hover:text-point">{record.title}</span>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href={projectHref} className="font-black text-point hover:text-text">{projectCtas[project.slug] ?? '프로젝트 보기'} →</Link>
        </div>
      </div>

      {project.slug === 'wanderer' ? <WandererCardPreview /> : <EvidenceFallback project={project} />}
    </article>
  );
}
