import { FeatureCard, MetricCard, PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 어떤 게임을 만들고 있는지 소개합니다.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="about ggumul"
        title={<>작아도 계속 움직이는<br />게임 작업실입니다.</>}
        description="꼬물은 빠르게 많이 만들기보다, 손에 남는 감각을 끝까지 고치고 기록하는 쪽을 선택합니다. 이 블로그는 그 작업의 쇼룸이자 노트입니다."
      >
        <div className="grid gap-3">
          <MetricCard label="pace" value="slow" description="급하게 벌리기보다 끝까지 다듬는 속도" />
          <MetricCard label="format" value="game + note" description="실행 화면과 제작 기록을 같이 보관" />
        </div>
      </PageHero>

      <section className="grid gap-5 md:grid-cols-3">
        <FeatureCard title="왜 꼬물인가요" description="작더라도 계속 움직이겠다는 뜻을 담았습니다. 완성된 결과만 보여주기보다, 만들면서 바뀐 판단도 함께 남깁니다." />
        <FeatureCard title="무엇을 만드나요" description="짧은 카드 게임, 선택에 따라 전개가 달라지는 서사형 게임, 규칙을 비틀어 보는 퍼즐 실험을 만들고 있습니다." />
        <FeatureCard title="어떻게 만드나요" description="큰 팀처럼 보이려고 하기보다 실제 수정, 실패, 방향 변경을 숨기지 않고 남깁니다. 빠르지는 않아도 계속 만듭니다." />
      </section>

      <section className="panel-section space-y-6">
        <SectionHeader
          eyebrow="making principles"
          title="결과보다 과정이 먼저 보이는 이유"
          description="꼬물의 프로젝트 소개는 마케팅 문구보다 실제 플레이 화면과 개발 기록을 먼저 둡니다. 작은 게임일수록 어떤 판단으로 지금의 형태가 됐는지가 더 중요하기 때문입니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['실제 화면 기반', '가능하면 실행 화면과 캡처를 먼저 보여주고, 없는 것은 없는 상태로 둡니다.'],
            ['작은 단위의 완성', '거대한 세계관보다 짧게 플레이해도 기억에 남는 한 장면을 우선합니다.'],
            ['기록 가능한 개발', '수정 이유와 판단의 흔적을 글로 남겨 다음 작업의 기준으로 삼습니다.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-[24px] border border-line/80 bg-white/[0.055] p-5">
              <h3 className="font-black tracking-[-0.03em] text-text">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-subtext">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
