import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group block rounded-[24px] border border-line/80 bg-white/[0.055] px-5 py-5 transition hover:border-point/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/30"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtext">
          <span>{post.publishedAt}</span>
          <span className="trace-chip text-[12px] font-bold text-point">
            {post.category}
          </span>
          {post.series ? <span>{post.series}</span> : null}
        </div>
        <h3 className="text-[20px] font-semibold tracking-[-0.035em] leading-[1.18] text-text transition group-hover:text-point md:text-[28px]">
          {post.title}
        </h3>
        <p className="text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{post.summary}</p>
      </div>
    </Link>
  );
}
