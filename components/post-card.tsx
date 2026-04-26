import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

const projectThumbnails: Record<string, string> = {
  wanderer: '/media/runtime-checks/wanderer-mobile-current.png',
  hanoi: '/project-covers/hanoi.png',
  'color-hanoi': '/project-covers/color-hanoi.png',
  trpg: '/project-covers/trpg.png',
};

function resolvePostImage(post: WritingEntry) {
  if (post.slug === 'runtime-화면-확인-기록') {
    return '/media/runtime-checks/wanderer-mobile-current.png';
  }

  const firstProject = post.relatedProjects[0];
  return firstProject ? projectThumbnails[firstProject] : '/studio/wanderer-home.png';
}

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export function PostCard({ post, compact = false, featured = false }: { post: WritingEntry; compact?: boolean; featured?: boolean }) {
  const thumbnail = resolvePostImage(post);

  if (compact) {
    return (
      <Link
        href={`/writing/${post.slug}`}
        className="group grid gap-3 rounded-[22px] border border-line/75 bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:border-point/55 hover:bg-white/[0.07]"
      >
        <div className="flex items-center justify-between gap-4 text-[12px] text-subtext">
          <span className="font-semibold text-point">{post.category}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <div>
          <h3 className="text-[18px] font-black leading-snug tracking-[-0.04em] text-text group-hover:text-point">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-subtext">{post.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] text-subtext">
          {post.series ? <span className="rounded-full border border-line/70 px-2.5 py-1">{post.series}</span> : null}
          <span className="rounded-full border border-line/70 px-2.5 py-1">{post.readingTimeMinutes}분</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/writing/${post.slug}`}
      className={[
        'group story-card grid overflow-hidden rounded-[28px] border border-line/80 bg-white/[0.055] transition hover:-translate-y-1 hover:border-point/55 hover:bg-white/[0.075]',
        featured ? 'md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]' : '',
      ].join(' ')}
    >
      <div className={featured ? 'relative min-h-[260px] overflow-hidden md:min-h-full' : 'relative h-48 overflow-hidden'}>
        <img
          src={thumbnail}
          alt={`${post.title} 대표 화면`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur">
            {post.series ?? post.category}
          </span>
        </div>
      </div>

      <div className={featured ? 'flex min-h-[260px] flex-col justify-between p-6 md:p-8' : 'p-5'}>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
            <span className="font-bold text-point">{post.category}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{post.readingTimeMinutes}분</span>
          </div>
          <h3 className={featured ? 'mt-4 text-[28px] font-black leading-tight tracking-[-0.055em] text-text md:text-[40px]' : 'mt-3 text-[22px] font-black leading-tight tracking-[-0.045em] text-text'}>
            {post.title}
          </h3>
          <p className={featured ? 'mt-4 text-base leading-8 text-subtext' : 'mt-3 line-clamp-3 text-sm leading-7 text-subtext'}>{post.summary}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-subtext">
          {post.relatedProjects.slice(0, 3).map((project) => (
            <span key={project} className="rounded-full border border-line/75 bg-white/[0.045] px-2.5 py-1">
              {project}
            </span>
          ))}
          {post.tags.slice(0, featured ? 4 : 2).map((tag) => (
            <span key={tag} className="rounded-full border border-point/20 bg-point/10 px-2.5 py-1 text-point">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
