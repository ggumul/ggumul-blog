import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';
import { getWritingReadingPath } from '@/lib/writing-reading-path';

type Thumbnail = {
  src: string | null;
  label: string;
  caption: string;
  badge?: string;
  tone?: string;
};

const postThumbnails: Record<string, Thumbnail> = {
  'runtime-화면-확인-기록': {
    src: '/media/runtime-checks/wanderer-mobile-current.png',
    label: 'Mobile flow',
    caption: '버튼 뒤 흐름 끊김',
  },
  'wanderer-sync-연결-문제-분석': {
    src: '/studio/wanderer-home.png',
    label: 'Sync problem',
    caption: '이어진다고 믿은 화면',
  },
  '4월-프로젝트-개발-현황': {
    src: null,
    label: '4 Games Map',
    caption: '카드·퍼즐·서사 지도',
    badge: '프로젝트 지도',
    tone: 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,212,71,0.34),transparent_18rem),radial-gradient(circle_at_80%_25%,rgba(255,112,166,0.24),transparent_16rem),linear-gradient(135deg,rgba(31,70,162,0.96),rgba(16,24,58,0.98))]',
  },
  'wanderer-초기-설계-회고': {
    src: '/project-covers/wanderer.png',
    label: 'Wanderer loop',
    caption: '짧은 카드 전투의 기준',
  },
  '제작-리듬을-우선하는-이유': {
    src: null,
    label: 'Studio rhythm',
    caption: '작업 기준을 잃지 않는 법',
    badge: '스튜디오 노트',
    tone: 'bg-[radial-gradient(circle_at_20%_15%,rgba(126,230,198,0.28),transparent_16rem),radial-gradient(circle_at_75%_70%,rgba(255,212,71,0.26),transparent_18rem),linear-gradient(135deg,rgba(31,70,162,0.96),rgba(16,24,58,0.98))]',
  },
  'ggumul-dinner-grocery-가격-계약-정리': {
    src: null,
    label: 'Dinner Grocery',
    caption: '가격이 흔들리는 순간',
    badge: '장보기 기록',
    tone: 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,212,71,0.3),transparent_18rem),radial-gradient(circle_at_80%_70%,rgba(143,210,255,0.24),transparent_16rem),linear-gradient(135deg,rgba(31,70,162,0.96),rgba(16,24,58,0.98))]',
  },
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
  if (postThumbnails[post.slug]) {
    return postThumbnails[post.slug];
  }

  const firstProject = post.relatedProjects[0];
  return firstProject && projectThumbnails[firstProject]
    ? projectThumbnails[firstProject]
    : {
        src: null,
        label: post.category,
        caption: post.series ?? '소식',
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
        <div className={["flex h-full min-h-full flex-col justify-between p-5", thumbnail.tone ?? 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,212,71,0.32),transparent_18rem),linear-gradient(135deg,rgba(31,70,162,0.96),rgba(16,24,58,0.98))]'].join(' ')}>
          <div className="inline-flex w-fit rounded-full border-2 border-[#fff1b8]/55 bg-[#ffd447] px-3 py-1 text-[11px] font-black text-[#15183a]">
            {thumbnail.badge ?? '소식'}
          </div>
          <div>
            <p className="text-[13px] font-bold text-point">{thumbnail.caption}</p>
            <p className="mt-2 max-w-[13rem] text-[30px] font-black leading-none tracking-[-0.06em] text-text">{thumbnail.label}</p>
          </div>
        </div>
      )}
      {thumbnail.src ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="rounded-full border-2 border-[#fff1b8]/55 bg-[#10183a]/65 px-3 py-1 text-[11px] font-bold text-text backdrop-blur">
            {thumbnail.caption}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function PostCard({ post, compact = false, featured = false }: { post: WritingEntry; compact?: boolean; featured?: boolean }) {
  const thumbnail = resolvePostImage(post);
  const readingPath = getWritingReadingPath(post.slug);

  if (compact) {
    return (
      <Link
        href={`/writing/${post.slug}`}
        className="group grid gap-3 rounded-[20px] border-2 border-[#fff1b8]/34 bg-[#1b3d96]/58 p-4 transition hover:-translate-y-0.5 hover:border-point hover:bg-[#244aa8]/80"
      >
        <div className="flex items-center justify-between gap-4 text-[12px] text-subtext">
          <span className="font-semibold text-point">{post.category}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <div>
          <h3 className="text-[18px] font-black leading-snug tracking-[-0.04em] text-text group-hover:text-point">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-subtext">{readingPath.stakes}</p>
        </div>
        <p className="rounded-2xl border border-[#fff1b8]/24 bg-[#10183a]/28 px-3 py-2 text-[12px] leading-5 text-subtext">{readingPath.next}</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/writing/${post.slug}`}
      className={[
        'group story-card grid overflow-hidden rounded-[24px] border-[3px] border-[#fff1b8]/42 bg-[#1b3d96]/66 transition hover:-translate-y-1 hover:border-point hover:bg-[#244aa8]/80',
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
          </div>
          <h3 className={featured ? 'mt-4 text-[26px] font-black leading-tight tracking-[-0.055em] text-text md:text-[38px]' : 'mt-3 text-[22px] font-black leading-tight tracking-[-0.045em] text-text'}>
            {post.title}
          </h3>
          <p className={featured ? 'mt-4 text-base leading-8 text-subtext' : 'mt-3 line-clamp-3 text-sm leading-7 text-subtext'}>{post.summary}</p>
          <div className={featured ? 'mt-5' : 'mt-4'}>
            <p className="rounded-2xl border border-[#fff1b8]/24 bg-[#10183a]/28 p-3 text-[13px] leading-6 text-subtext">{readingPath.next}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-subtext">
          {post.relatedProjects.slice(0, 3).map((project) => (
            <span key={project} className="rounded-full border-2 border-[#fff1b8]/32 bg-[#10183a]/25 px-2.5 py-1">
              {project}
            </span>
          ))}
          {post.tags.slice(0, featured ? 4 : 2).map((tag) => (
            <span key={tag} className="rounded-full border-2 border-[#fff1b8]/35 bg-[#ffd447]/15 px-2.5 py-1 text-point">
              #{tag}
            </span>
          ))}
          <span className="ml-auto rounded-full border-2 border-point/40 bg-point/15 px-3 py-1 font-black text-point">
            {readingPath.next} →
          </span>
        </div>
      </div>
    </Link>
  );
}
