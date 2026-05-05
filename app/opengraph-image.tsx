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
          <div>ggumul / 꼬물</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '860px' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.18 }}>
            느리게라도 계속 만듭니다
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.5, color: '#5f574f' }}>
            작은 게임과 만든 이유를 짧게 적는 곳
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: 22, color: '#6a6159' }}>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>게임</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '1px solid rgba(86,65,44,0.15)' }}>게임 글</div>
        </div>
      </div>
    ),
    size,
  );
}
