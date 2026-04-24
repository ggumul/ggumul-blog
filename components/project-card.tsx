import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';
import { Pill } from '@/components/brand-ui';

export function ProjectCard({ project, records = [] }: { project: ProjectEntry; records?: WritingEntry[] }) {
  const latestRecord = records[0];
  const projectHref = `/projects/${project.slug}`;

  return (
    <article className="game-card-glow group grid overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.06] transition hover:border-point/55 hover:bg-white/[0.085] md:grid-cols-[minmax(300px,0.92fr)_minmax(0,1fr)]">
      {project.coverImage ? (
        <Link href={projectHref} className="shot-frame min-h-[260px] border-b border-line/80 md:border-b-0 md:border-r">
          <img
            alt={`${project.title} 대표 이미지`}
            className="h-full min-h-[260px] w-full object-cover opacity-95"
            src={project.coverImage}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 via-black/34 to-transparent p-4">
            <span className="rounded-full border border-point/35 bg-black/75 px-3 py-1 text-[12px] font-black text-point shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md">
              실제 실행 화면
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-semibold text-text backdrop-blur-md">
              {project.status}
            </span>
          </div>
        </Link>
      ) : null}

      <div className="flex min-h-full flex-col justify-between gap-6 px-5 py-5 md:px-6 md:py-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            <Pill tone="point">프로젝트 {String(project.order).padStart(2, '0')}</Pill>
            <Pill>개발 기록 {records.length}개</Pill>
          </div>
          <Link
            href={projectHref}
            className="block rounded-2xl text-[28px] font-black leading-tight tracking-[-0.055em] text-text outline-none transition group-hover:text-point focus-visible:ring-2 focus-visible:ring-point/30 md:text-[42px]"
          >
            {project.title}
          </Link>
          <p className="text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">{project.summary}</p>
        </div>

        <div className="space-y-4">
          {latestRecord ? (
            <Link href={`/writing/${latestRecord.slug}`} className="block rounded-[20px] border border-line/70 bg-black/20 p-4 transition hover:border-point/50">
              <div className="text-[11px] font-bold tracking-[0.18em] text-point">최근 기록</div>
              <div className="mt-2 font-bold tracking-[-0.02em] text-text">{latestRecord.title}</div>
              <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-subtext">{latestRecord.summary}</p>
            </Link>
          ) : null}

          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href={projectHref}
              className="inline-flex min-h-[44px] items-center rounded-full border border-point/35 bg-point px-4 py-2 font-black text-[#160d08] transition hover:bg-[#ffc47f]"
            >
              프로젝트 보기
            </Link>
            {latestRecord ? (
              <Link
                href={`/writing/${latestRecord.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 font-semibold text-subtext transition hover:border-point/60 hover:text-text"
              >
                최근 기록 읽기
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
