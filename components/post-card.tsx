import Link from 'next/link';
import Image from 'next/image';
import type { WritingEntry } from '@/lib/content';
import { Pill } from '@/components/brand-ui';

const projectThumbnails: Record<string, string> = {
  wanderer: '/media/runtime-checks/wanderer-mobile-current.png',
  hanoi: '/project-covers/hanoi.png',
  'color-hanoi': '/project-covers/color-hanoi.png',
  trpg: '/project-covers/trpg.png',
};

function getPostThumbnail(post: WritingEntry) {
  if (post.slug === 'runtime-화면-확인-기록') {
    return '/media/runtime-checks/wanderer-mobile-current.png';
  }

  const relatedProject = post.relatedProjects.find((project) => projectThumbnails[project]);
  return relatedProject ? projectThumbnails[relatedProject] : null;
}

export function PostCard({ post }: { post: WritingEntry }) {
  const thumbnail = getPostThumbnail(post);

  return (
    <Link
      href={`/writing/${post.slug}`}
      className={`story-card group grid gap-4 rounded-[22px] border border-line/80 bg-white/[0.045] p-4 transition hover:border-point/60 hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30 ${thumbnail ? 'md:grid-cols-[150px_minmax(0,1fr)] md:items-stretch' : ''}`}
    >
      {thumbnail ? (
        <div className="relative min-h-[130px] overflow-hidden rounded-[18px] border border-white/10 bg-black/30 md:min-h-0">
          <Image
            src={thumbnail}
            alt={`${post.title} 썸네일`}
            fill
            sizes="(min-width: 768px) 150px, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <Pill>{post.publishedAt}</Pill>
          <Pill tone="point">{post.category}</Pill>
          <Pill>{post.readingTimeMinutes}분</Pill>
        </div>
        <h3 className="text-[20px] font-black tracking-[-0.04em] leading-[1.2] text-text transition group-hover:text-point md:text-[26px]">
          {post.title}
        </h3>
        <p className="text-[14px] leading-6 text-subtext md:text-[15px]">{post.summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-0.5 text-[11px] text-subtext">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5">#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
