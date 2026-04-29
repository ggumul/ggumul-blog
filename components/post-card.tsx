import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

type Thumbnail = {
  src: string | null;
  label: string;
  caption: string;
};

const projectThumbnails: Record<string, Thumbnail> = {
  'ggumul-dinner-grocery': {
    src: null,
    label: 'GGUMUL Dinner Grocery',
    caption: '가격 계약 · 장보기 판단',
  },
  wanderer: {
    src: '/media/runtime-checks/wanderer-mobile-current.png',
    label: 'Wanderer',
    caption: '실제 진행 화면',
  },
  hanoi: {
    src: '/project-covers/hanoi.png',
    label: 'Hanoi',
    caption: '웹 퍼즐 화면',
  },
  'color-hanoi': {
    src: '/project-covers/color-hanoi.png',
    label: 'Color Hanoi',
    caption: '색 조건 퍼즐',
  },
  trpg: {
    src: '/project-covers/trpg.png',
    label: 'TRPG',
    caption: '분기형 서사 화면',
  },
};

function resolvePostImage(post: WritingEntry): Thumbnail {
  if (post.slug === 'runtime-화면-확인-기록') {
    return {
      src: '/media/runtime-checks/wanderer-mobile-current.png',
      label: 'Runtime check',
      caption: '실제 화면 확인 기록',
    };
  }

  const firstProject = post.relatedProjects[0];
  return firstProject && projectThumbnails[firstProject]
    ? projectThumbnails[firstProject]
    : {
        src: null,
        label: post.category,
        caption: post.series ?? '개발기록',
      };
}

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

function ThumbnailFrame({ thumbnail, alt, featured }: { thumbnail: Thumbnail; alt: string; featured: boolean }) {
  const frameClass = featured ? 'relative min-h-[220px] overflow-hidden md:min-h-full' : 'relative h-48 overflow-hidden';

  return (
    <div className={frameClass}>
      {thumbnail.src ? (
        <img
          src={thumbnail.src}
          alt={alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="flex h-full min-h-[220px] flex-col justify-between bg-[radial-gradient(circle_at_20%_15%,rgba(255,180,95,0.28),transparent_18rem),linear-gradient(135deg,rgba(32,20,16,0.96),rgba(13,10,16,0.98))] p-5">
          <div className="inline-flex w-fit rounded-full border border-point/25 bg-point/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-point">
            기록 기반 카드
          </div>
          <div>
            <p className="text-[13px] font-bold text-point">{thumbnail.caption}</p>
            <p className="mt-2 max-w-[13rem] text-[30px] font-black leading-none tracking-[-0.06em] text-text">{thumbnail.label}</p>
          </div>
        </div>
      )}
      {thumbnail.src ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur">
            {thumbnail.caption}
          </span>
        </div>
      ) : null}
    </div>
  );
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
        featured ? 'md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]' : '',
      ].join(' ')}
    >
      <ThumbnailFrame thumbnail={thumbnail} alt={`${post.title} 대표 화면`} featured={featured} />

      <div className={featured ? 'flex min-h-[240px] flex-col justify-between p-5 md:p-7' : 'p-5'}>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
            <span className="font-bold text-point">{post.category}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{post.readingTimeMinutes}분</span>
          </div>
          <h3 className={featured ? 'mt-4 text-[26px] font-black leading-tight tracking-[-0.055em] text-text md:text-[38px]' : 'mt-3 text-[22px] font-black leading-tight tracking-[-0.045em] text-text'}>
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
