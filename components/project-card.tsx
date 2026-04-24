import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

export function ProjectCard({ project, records = [] }: { project: ProjectEntry; records?: WritingEntry[] }) {
  const latestRecord = records[0];
  const projectHref = `/projects/${project.slug}`;

  return (
    <article className="game-card-glow overflow-hidden rounded-[26px] border border-line/80 bg-white/[0.065] transition hover:border-point/55 hover:bg-white/[0.09]">
      {project.coverImage ? (
        <div className="shot-frame border-b border-line/80">
          <img
            alt={`${project.title} 대표 이미지`}
            className="h-52 w-full object-cover opacity-95 md:h-60"
            src={project.coverImage}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4">
            <span className="rounded-full border border-point/35 bg-black/75 px-3 py-1 text-[12px] font-semibold text-point shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {project.status} · 개발 기록 {records.length}개
            </span>
          </div>
        </div>
      ) : null}

      <div className="space-y-4 px-5 py-5">
        <div className="space-y-2">
          <Link
            href={projectHref}
            className="inline-flex min-h-[44px] items-center rounded-2xl text-[24px] font-semibold leading-tight tracking-[-0.02em] text-text outline-none transition hover:text-point focus-visible:ring-2 focus-visible:ring-point/30 md:text-[30px]"
          >
            {project.title}
          </Link>
          <p className="text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={projectHref}
            className="inline-flex min-h-[44px] items-center rounded-full border border-point/35 bg-point px-4 py-2 font-semibold text-[#160d08] transition hover:bg-[#ffc47f]"
          >
            자세히 보기
          </Link>
          {latestRecord ? (
            <Link
              href={`/writing/${latestRecord.slug}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-subtext transition hover:border-point/60 hover:text-text"
            >
              개발 기록
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
