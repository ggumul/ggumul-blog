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
    <div aria-label="게임 단서" className="border-t border-line/30 pt-4">
      <p className="text-[12px] font-black tracking-[0.14em] text-point">{project.evidenceLabel}</p>
      <p className="mt-3 text-sm leading-6 text-subtext">카드를 낼지, 막대를 옮길지, 재료를 고를지부터 보여줍니다.</p>
    </div>
  );
}

function WandererCardPreview() {
  return (
    <div className="wanderer-card-preview border-t border-line/30 pt-4">
      <p className="text-[12px] font-black tracking-[0.14em] text-point">Wanderer 한 턴</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-subtext">
        <p>홀수 카드만 살아남는 판입니다. 손에 든 5, 10, 15는 같은 카드처럼 보이지만 시작하자마자 무게가 갈립니다.</p>
        <p>10은 빠지고, 5는 약하고, 15는 상대의 13을 넘습니다. 그래서 고를 카드는 하나로 좁아집니다.</p>
      </div>
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

      {project.slug === 'wanderer' ? <WandererCardPreview /> : <EvidenceFallback project={project} />}
    </article>
  );
}
