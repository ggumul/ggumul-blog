import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

type ProjectCardProps = {
  project: ProjectEntry;
  records?: WritingEntry[];
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export function ProjectCard({ project, records = [] }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const previewRecords = records.slice(0, 2);

  return (
    <article className="space-y-5 rounded-[20px] border border-line/45 bg-white/[0.035] p-4 md:p-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-black text-point">
          <time dateTime={project.lastUpdated}>{formatDate(project.lastUpdated)}</time>
          <span className="text-subtext/70">/</span>
          <span>{records.length}개 글</span>
        </div>
        <h3 className="text-[24px] font-black leading-tight tracking-[-0.045em] text-text md:text-[32px]">
          <Link href={projectHref} className="hover:text-point">{project.title}</Link>
        </h3>
        <p className="text-sm leading-7 text-subtext">{project.summary}</p>
      </div>

      <a href={project.primaryEvidence.href} className="block rounded-2xl border border-line/50 bg-background/35 p-3 transition hover:border-point/60">
        <p className="text-[11px] font-black tracking-[0.14em] text-point">지금 볼 장면</p>
        <p className="mt-2 text-sm font-black leading-6 text-text">{project.primaryEvidence.label}</p>
        <p className="mt-1 text-sm leading-6 text-subtext">{project.primaryEvidence.note}</p>
      </a>

      {previewRecords.length ? (
        <div className="space-y-2 border-t border-line/30 pt-3">
          <p className="text-[11px] font-black tracking-[0.14em] text-subtext">이어진 글</p>
          {previewRecords.map((record) => (
            <Link key={record.slug} href={`/writing/${record.slug}`} className="grid gap-1 text-sm leading-6 md:grid-cols-[88px_minmax(0,1fr)]">
              <time className="text-subtext" dateTime={record.publishedAt}>{formatDate(record.publishedAt)}</time>
              <span className="block font-bold text-text hover:text-point">{record.title}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
