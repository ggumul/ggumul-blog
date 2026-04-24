import { ImageResponse } from 'next/og';
import { getWritingBySlug } from '@/lib/content';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function WritingOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);

  const title = post?.title ?? '꼬물의 기록';
  const summary = post?.summary ?? '꼬물이 게임을 만들며 남긴 개발 기록';
  const category = post?.category ?? '개발 기록';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(180deg, #f7f2e8 0%, #f1ebe1 100%)',
          color: '#1f1c18',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#8e6035' }}>
          <div>ggumul / 꼬물</div>
          <div>{category}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.18 }}>{title}</div>
          <div style={{ fontSize: 28, lineHeight: 1.45, color: '#5f574f' }}>{summary}</div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: 22, color: '#6a6159' }}>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>기록</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>개발 기록</div>
        </div>
      </div>
    ),
    size,
  );
}
