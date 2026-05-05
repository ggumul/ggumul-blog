import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';
import { getWritingReadingPath } from '@/lib/writing-reading-path';

const projectLabels: Record<string, string> = {
  hanoi: 'Hanoi',
  wanderer: 'Wanderer',
  trpg: 'TRPG',
  'color-hanoi': 'Color Hanoi',
  'ggumul-dinner-grocery': 'Dinner Grocery',
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export function PostCard({ post, compact = false, featured = false }: { post: WritingEntry; compact?: boolean; featured?: boolean }) {
  const readingPath = getWritingReadingPath(post.slug);
  const label = projectLabels[post.relatedProjects[0]] ?? post.category;

  if (compact) {
    return (
      <Link href={`/writing/${post.slug}`} className="group block border-t border-line/40 py-4 last:border-b last:border-line/40">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-subtext">
          <span className="font-bold text-point">{label}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className="mt-2 text-[18px] font-black leading-snug tracking-[-0.035em] text-text group-hover:text-point">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-subtext">{readingPath.stakes}</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/writing/${post.slug}`}
      className={[
        'group grid gap-3 border-t border-line/40 py-5 last:border-b last:border-line/40',
        featured ? 'md:grid-cols-[140px_minmax(0,1fr)] md:gap-6' : 'md:grid-cols-[120px_minmax(0,1fr)] md:gap-5',
      ].join(' ')}
    >
      <div className="text-sm leading-6 text-subtext">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span className="mt-1 block font-bold text-point">{label}</span>
      </div>
      <div>
        <h3 className={featured ? 'text-[26px] font-black leading-tight tracking-[-0.045em] text-text md:text-[34px]' : 'text-[21px] font-black leading-tight tracking-[-0.04em] text-text'}>
          {post.title}
        </h3>
        <p className={featured ? 'mt-3 text-base leading-8 text-subtext' : 'mt-3 text-sm leading-7 text-subtext'}>{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-subtext">
          {post.tags.slice(0, featured ? 4 : 2).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
          <span className="font-bold text-point">열기 →</span>
        </div>
      </div>
    </Link>
  );
}
