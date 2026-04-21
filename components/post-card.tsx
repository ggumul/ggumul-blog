import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="block rounded-xl border border-line/80 bg-white/40 px-4 py-4 transition hover:border-point/60"
    >
      <div className="space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-subtext">
          <span>{post.publishedAt}</span>
          <span>{post.category}</span>
        </div>
        <h3 className="text-[20px] font-semibold tracking-[-0.03em] leading-[1.2] text-text md:text-[28px]">
          {post.title}
        </h3>
        <p className="text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{post.summary}</p>
      </div>
    </Link>
  );
}
