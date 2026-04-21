import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

export function ProjectCard({ project, records = [] }: { project: ProjectEntry; records?: WritingEntry[] }) {
  const latestRecord = records[0];

  return (
    <div className="rounded-xl border border-line/80 bg-white/40 px-4 py-4">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-subtext">
          <span>{project.status}</span>
          <span>기록 {records.length}</span>
        </div>
        <Link href={`/projects/${project.slug}`} className="inline-block text-[22px] font-semibold tracking-[-0.03em] leading-[1.2] text-text md:text-[30px]">
          {project.title}
        </Link>
        <p className="text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{project.summary}</p>
        {latestRecord ? (
          <Link href={`/writing/${latestRecord.slug}`} className="inline-flex text-sm text-subtext transition hover:text-text">
            최근 글 보기 →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
