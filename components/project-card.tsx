import Link from 'next/link';
import type { ProjectEntry, WritingEntry } from '@/lib/content';

type ProjectCardProps = {
  project: ProjectEntry;
  records?: WritingEntry[];
};

const PROJECT_STYLE: Record<string, { cover: string | null; className: string; icon: string }> = {
  wanderer: { cover: '/project-covers/wanderer.png', className: 'bg-violet text-white', icon: '카드' },
  hanoi: { cover: '/project-covers/hanoi.png', className: 'bg-butter text-text', icon: '원반' },
  'color-hanoi': { cover: '/project-covers/color-hanoi.png', className: 'bg-mint text-text', icon: '색' },
  trpg: { cover: '/project-covers/trpg.png', className: 'bg-peach text-text', icon: '문장' },
  'ggumul-dinner-grocery': { cover: null, className: 'bg-[#CBEF8F] text-text', icon: '저녁' },
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export function ProjectCard({ project, records = [] }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const previewRecords = records.slice(0, 2);
  const style = PROJECT_STYLE[project.slug] ?? { cover: project.coverImage ?? null, className: 'bg-surface text-text', icon: project.title };

  return (
    <article className="sticker-card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#2A2119]">
      <Link href={projectHref} className="block">
        <div className={`${style.className} border-b-2 border-line p-3`}>
          {style.cover ? (
            <img src={style.cover} alt="" className="aspect-[16/10] w-full rounded-[18px] border-2 border-line bg-surface object-cover" />
          ) : (
            <div aria-hidden="true" className="grid aspect-[16/10] place-items-center rounded-[18px] border-2 border-line bg-surface text-[40px] font-black tracking-[-0.06em] text-text">
              {style.icon}
            </div>
          )}
        </div>
        <div className="space-y-3 p-5">
          <p className="inline-flex rounded-full border-2 border-line bg-butter px-3 py-1 text-[12px] font-black tracking-[0.08em] text-text">
            {style.icon}
          </p>
          <h3 className="text-[26px] font-black leading-tight tracking-[-0.05em] text-text md:text-[34px]">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-subtext">{project.summary}</p>
        </div>
      </Link>

      {previewRecords.length ? (
        <div className="space-y-2 border-t-2 border-line/25 px-5 pb-5 pt-3">
          <p className="text-[11px] font-black tracking-[0.14em] text-subtext">최근 글</p>
          {previewRecords.map((record) => (
            <Link key={record.slug} href={`/writing/${record.slug}`} className="grid gap-1 text-sm leading-6 md:grid-cols-[112px_minmax(0,1fr)]">
              <time className="font-bold text-subtext" dateTime={record.publishedAt}>{formatDate(record.publishedAt)} ·</time>
              <span className="block font-black text-text hover:text-point">{record.title}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
