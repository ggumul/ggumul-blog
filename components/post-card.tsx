import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';
import { Pill } from '@/components/brand-ui';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="story-card group block rounded-[26px] border border-line/80 bg-white/[0.055] px-5 py-5 transition hover:border-point/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          <Pill>{post.publishedAt}</Pill>
          <Pill tone="point">{post.category}</Pill>
          {post.series ? <Pill>{post.series}</Pill> : null}
          <Pill>{post.readingTimeMinutes}분</Pill>
        </div>
        <h3 className="text-[22px] font-black tracking-[-0.045em] leading-[1.15] text-text transition group-hover:text-point md:text-[32px]">
          {post.title}
        </h3>
        <p className="text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{post.summary}</p>
        <div className="flex flex-wrap gap-2 pt-1 text-[12px] text-subtext">
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
