import { describe, expect, it } from 'vitest';
import { createArticleJsonLd, createMetadata, siteConfig, toAbsoluteUrl } from '@/lib/site';

describe('site branding and seo helpers', () => {
  it('exposes ggumul brand identity for metadata defaults', () => {
    expect(siteConfig.name).toBe('ggumul / 꼬물');
    expect(siteConfig.description).toContain('작업실');
    expect(siteConfig.keywords).toContain('게임 개발 블로그');
  });

  it('creates page metadata with canonical url and open graph title', () => {
    const metadata = createMetadata({
      title: '글과 기록',
      description: '꼬물의 글과 기록을 모아두는 공간',
      path: '/writing',
      ogImage: '/writing/custom-post/opengraph-image',
    });

    expect(metadata.alternates?.canonical).toBe('https://ggumul-blog.vercel.app/writing');
    expect(metadata.openGraph?.title).toBe('글과 기록 | ggumul / 꼬물');
    expect(metadata.openGraph?.images?.[0]).toMatchObject({
      url: 'https://ggumul-blog.vercel.app/writing/custom-post/opengraph-image',
    });
  });

  it('creates article json-ld with published date and absolute url', () => {
    const article = createArticleJsonLd({
      title: '우리는 왜 이렇게 천천히 만들고 있냐',
      description: '꼬물이 오래 쌓는 팀인 이유를 다룬 글',
      path: '/writing/우리는-왜-이렇게-천천히-만들고-있냐',
      publishedAt: '2026-04-20',
    });

    expect(article['@type']).toBe('BlogPosting');
    expect(article.headline).toBe('우리는 왜 이렇게 천천히 만들고 있냐');
    expect(article.datePublished).toBe('2026-04-20');
    expect(article.mainEntityOfPage).toBe(toAbsoluteUrl('/writing/우리는-왜-이렇게-천천히-만들고-있냐'));
  });
});
