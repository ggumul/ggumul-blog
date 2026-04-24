import { FeatureCard, MetricCard, PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 만들고 있는 게임과 개발 기록의 기준을 설명합니다.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="꼬물 소개"
        title={<>작은 게임을 만들고,<br />바뀐 이유를 기록합니다.</>}
        description="꼬물은 카드 게임, 퍼즐, 분기형 서사처럼 작게 시작할 수 있는 게임을 만듭니다. 이 블로그에는 실제 화면, 수정 이유, 다음에 고칠 문제를 남깁니다."
      >
        <div className="grid gap-3">
          <MetricCard label="현재 기준" value="직접 만든 화면" description="실행 화면과 개발 기록을 우선해서 공개" />
          <MetricCard label="기록 방식" value="변경 이유" description="무엇을 고쳤고 왜 바꿨는지 함께 정리" />
        </div>
      </PageHero>

      <section className="grid gap-5 md:grid-cols-3">
        <FeatureCard title="왜 꼬물인가요" description="작더라도 계속 움직이는 게임을 만들겠다는 뜻을 담았습니다. 결과 화면만 올리지 않고 무엇을 고쳤는지도 같이 남깁니다." />
        <FeatureCard title="무엇을 만드나요" description="짧은 카드 게임, 선택에 따라 전개가 달라지는 서사형 게임, 규칙을 비틀어 보는 퍼즐 실험을 만들고 있습니다." />
        <FeatureCard title="어떻게 만드나요" description="큰 팀처럼 보이게 포장하기보다 실제 수정, 실패, 방향 변경을 그대로 남깁니다. 아직 부족한 부분도 상태를 분명히 적습니다." />
      </section>

      <section className="panel-section space-y-6">
        <SectionHeader
          eyebrow="만드는 기준"
          title="결과보다 과정이 먼저 보이는 이유"
          description="프로젝트 소개에는 가능한 한 실행 화면, 현재 상태, 최근에 바꾼 내용을 먼저 둡니다. 작은 게임이라도 어떤 문제를 고치고 있는지 보여주는 쪽이 더 정확하기 때문입니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['실제 화면 기반', '가능하면 실행 화면과 캡처를 먼저 보여주고, 없는 것은 없는 상태로 둡니다.'],
            ['작은 단위의 완성', '거대한 세계관보다 짧게 플레이해도 기억에 남는 한 장면을 우선합니다.'],
            ['기록 가능한 개발', '수정 이유와 남은 문제를 글로 남겨 다음 작업의 기준으로 삼습니다.'],
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
