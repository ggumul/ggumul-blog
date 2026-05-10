import type { Metadata } from 'next';

const SITE_URL = 'https://ggumul-blog.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/home-real-preview-20260510.png?v=real-home-20260510`;

export const siteConfig = {
  name: 'ggumul / 꼬물',
  shortName: '꼬물',
  url: SITE_URL,
  description: '꼬물은 작은 게임과 생활 도구를 만들고, 고치며 생긴 장면을 글로 남기는 블로그입니다.',
  keywords: [
    '꼬물',
    'ggumul',
    '인디 게임',
    '제작 블로그',
    '게임 개발',
    'Wanderer',
  ],
  authorName: '꼬물',
  ogImage: DEFAULT_OG_IMAGE,
} as const;

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  ogImage?: string;
};

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
};

export function toAbsoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

function resolveOgImageUrl(ogImage?: string) {
  if (!ogImage) {
    return siteConfig.ogImage;
  }

  if (ogImage.startsWith('http://') || ogImage.startsWith('https://')) {
    return ogImage;
  }

  return toAbsoluteUrl(ogImage);
}

export function createMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  ogImage,
}: MetadataInput): Metadata {
  const absoluteUrl = toAbsoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;
  const resolvedOgImage = resolveOgImageUrl(ogImage);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      type,
      url: absoluteUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: 'ko_KR',
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} 공유 이미지`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [resolvedOgImage],
    },
  };
}

export function createArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
}: ArticleJsonLdInput) {
  const absoluteUrl = toAbsoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: absoluteUrl,
    url: absoluteUrl,
    author: {
      '@type': 'Organization',
      name: siteConfig.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'ko-KR',
  };
}
