import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

type ProjectCardProps = {
  project: ProjectEntry;
  records?: WritingEntry[];
  compact?: boolean;
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

function EvidenceFallback({ project }: { project: ProjectEntry }) {
  return (
    <div aria-label="처음 부딪히는 선택" className="border-t border-line/30 pt-4">
      <p className="text-[12px] font-black tracking-[0.14em] text-point">{project.evidenceLabel}</p>
      <p className="mt-3 text-sm leading-6 text-subtext">안전해 보이는 선택이 어디서 틀어지는지부터 꺼냅니다.</p>
    </div>
  );
}

export function ProjectCard({ project, records = [], compact = false }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const previewRecords = records.slice(0, compact ? 1 : 2);
  const publicLabel = project.slug === 'ggumul-dinner-grocery' ? '곁가지 도구' : '작은 게임';

  return (
    <article className="space-y-4 rounded-[20px] border border-line/45 bg-white/[0.035] p-4 md:p-5">
      <div className="space-y-4">
        <div>
          <p className="text-[12px] font-black tracking-[0.16em] text-point">{publicLabel}</p>
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

      </div>

      <EvidenceFallback project={project} />
    </article>
  );
}
