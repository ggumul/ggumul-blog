import { ImageResponse } from 'next/og';

export const alt = 'ggumul / 꼬물';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#8e6035',
          }}
        >
          <div>ggumul / 꼬물</div>
          <div>ggumul studio</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '860px' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.18 }}>
            느리더라도 오래 쌓아가는 작은 작업실
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.5, color: '#5f574f' }}>
            완성본보다 먼저 작업 기록을 남기는 꼬물의 게임 개발 블로그
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: 22, color: '#6a6159' }}>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>기록</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>프로젝트</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>작업실</div>
        </div>
      </div>
    ),
    size,
  );
}
