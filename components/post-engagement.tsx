'use client';

import { useEffect, useMemo, useState } from 'react';

type PostEngagementProps = {
  title: string;
  slug: string;
};

const COUNTER_NAMESPACE = 'ggumul-blog';
const SITE_URL = 'https://ggumul-blog.vercel.app';
const REPO_ISSUES_URL = 'https://github.com/ggumul/ggumul-blog/issues/new';

function buildPostUrl(slug: string) {
  return `${SITE_URL}/writing/${slug}`;
}

export function PostEngagement({ title, slug }: PostEngagementProps) {
  const [views, setViews] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const postUrl = useMemo(() => buildPostUrl(slug), [slug]);

  useEffect(() => {
    let ignore = false;

    async function trackView() {
      try {
        const response = await fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${encodeURIComponent(slug)}`);
        const data = (await response.json()) as { value?: number };

        if (!ignore && typeof data.value === 'number') {
          setViews(data.value);
        }
      } catch {
        if (!ignore) {
          setViews(null);
        }
      }
    }

    void trackView();

    return () => {
      ignore = true;
    };
  }, [slug]);

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({
        title,
        url: postUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const commentLink = `${REPO_ISSUES_URL}?title=${encodeURIComponent(`[comment] ${title}`)}&body=${encodeURIComponent(`글 링크: ${postUrl}\n\n의견을 남겨 주세요.`)}`;

  return (
    <div className="panel-aside space-y-3 text-sm text-subtext md:space-y-4">
      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.28em] text-point">반응</div>
        <div className="rounded-[1.15rem] border border-line/70 bg-white/65 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.24em] text-point">조회수</div>
          <div className="mt-2 text-sm text-text">{views?.toLocaleString('ko-KR') ?? '집계 중'}</div>
        </div>
      </div>
      <div className="grid gap-2">
        <button
          className="rounded-full border border-line/80 bg-white/70 px-3 py-2 text-[13px] transition hover:border-point hover:text-text"
          onClick={() => void handleShare()}
          type="button"
        >
          {copied ? '링크 복사됨' : '공유하기'}
        </button>
        <a
          className="rounded-full border border-line/80 bg-white/70 px-3 py-2 text-center text-[13px] transition hover:border-point hover:text-text"
          href={commentLink}
          rel="noreferrer"
          target="_blank"
        >
          댓글 남기기
        </a>
      </div>
    </div>
  );
}
