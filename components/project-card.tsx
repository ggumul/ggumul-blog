import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

export function ProjectCard({ project, records = [] }: { project: ProjectEntry; records?: WritingEntry[] }) {
  const [latestRecord, ...moreRecords] = records;

  return (
    <div className="group border-t border-line/80 py-7 first:border-t-0 md:py-8">
      <div className="grid gap-5 md:grid-cols-[72px_minmax(0,1fr)_260px] md:gap-8">
        <div className="text-[26px] font-semibold tracking-[-0.05em] text-line transition group-hover:text-point md:text-[34px]">
          {String(project.order).padStart(2, '0')}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.32em] text-point">
            <span>프로젝트</span>
            <span className="text-subtext">{project.status}</span>
            <span className="text-subtext">기록 {records.length}</span>
          </div>

          <div className="space-y-3">
            <Link href={`/projects/${project.slug}`} className="inline-block text-[30px] font-semibold tracking-[-0.045em] leading-none text-text transition group-hover:text-point md:text-[42px]">
              {project.title}
            </Link>
            <p className="max-w-2xl text-[16px] leading-8 text-subtext">{project.summary}</p>
          </div>
        </div>

        <div className="space-y-4 border-l border-line/60 pl-0 md:pl-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-point">관련 기록</div>
          {latestRecord ? (
            <div className="space-y-3">
              <Link href={`/writing/${latestRecord.slug}`} className="block border-t border-line/60 pt-3 transition hover:border-point/60">
                <div className="text-[11px] uppercase tracking-[0.24em] text-subtext">최근 기록</div>
                <div className="mt-2 font-medium text-text transition hover:text-point">{latestRecord.title}</div>
                <p className="mt-2 text-[13px] leading-6 text-subtext">{latestRecord.summary}</p>
              </Link>
              {moreRecords.length > 0 ? (
                <div className="text-[12px] leading-6 text-subtext">이 프로젝트와 관련된 기록이 {moreRecords.length}개 더 있습니다.</div>
              ) : null}
            </div>
          ) : (
            <p className="text-[13px] leading-6 text-subtext">아직 연결된 기록은 많지 않지만, 프로젝트는 계속 진행 중입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
