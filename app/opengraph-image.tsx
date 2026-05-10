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
          background: 'linear-gradient(180deg, #fff7e8 0%, #fffdf7 58%, #fff0b8 100%)',
          color: '#211a14',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#e85d3f',
            fontWeight: 800,
          }}
        >
          <div>ggumul / 꼬물</div>
          <div
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              border: '3px solid #2a2119',
              background: '#ffd95a',
              color: '#211a14',
              fontSize: 22,
            }}
          >
            TINY WORKSHOP
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            maxWidth: '900px',
            padding: '42px',
            border: '5px solid #2a2119',
            borderRadius: 34,
            background: '#fffdf7',
            boxShadow: '12px 12px 0 #2a2119',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.04em' }}>
            <span>작은 장면을 만들고,</span>
            <span>한 번 더 만져봅니다.</span>
          </div>
          <div style={{ fontSize: 29, lineHeight: 1.45, color: '#5f5147' }}>
            작은 게임과 생활 도구를 크게 포장하지 않고, 실제로 본 화면과 바뀐 선택을 글로 남깁니다.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: 22, color: '#211a14', fontWeight: 800 }}>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '3px solid #2a2119', background: '#6e56cf', color: '#fff' }}>Wanderer</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '3px solid #2a2119', background: '#ffd95a' }}>Hanoi</div>
          <div style={{ padding: '12px 20px', borderRadius: '9999px', border: '3px solid #2a2119', background: '#6ed6a8' }}>글</div>
        </div>
      </div>
    ),
    size,
  );
}
