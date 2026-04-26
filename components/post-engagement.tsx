'use client';

import { useMemo, useState } from 'react';
import { toAbsoluteUrl } from '@/lib/site';

type PostEngagementProps = {
  title: string;
  slug: string;
};

const REPO_ISSUES_URL = 'https://github.com/ggumul/ggumul-blog/issues/new';

function buildPostUrl(slug: string) {
  return toAbsoluteUrl(`/writing/${slug}`);
}

export function PostEngagement({ title, slug }: PostEngagementProps) {
  const [copied, setCopied] = useState(false);
  const postUrl = useMemo(() => buildPostUrl(slug), [slug]);

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
    <div className="flex flex-wrap gap-3 text-sm text-subtext">
      <button
        className="transition hover:text-text"
        onClick={() => void handleShare()}
        type="button"
      >
        {copied ? '링크 복사됨' : '공유하기'}
      </button>
      <a
        className="transition hover:text-text"
        href={commentLink}
        rel="noreferrer"
        target="_blank"
      >
        댓글 남기기
      </a>
    </div>
  );
}
