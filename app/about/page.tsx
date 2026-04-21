import { SectionTitle } from '@/components/section-title';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 왜 느리더라도 오래 쌓는 방식으로 만들고 기록하는지 소개하는 페이지.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 rounded-[28px] border border-line bg-white/65 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-point">About ggumul</p>
        <h1 className="text-4xl font-semibold tracking-tight">꼬물에 대하여</h1>
        <p className="max-w-3xl text-base leading-7 text-subtext md:text-lg">
          꼬물이라는 이름에는 느리더라도 손을 멈추지 않고, 조금씩 움직이며 결과를 자라게 한다는 뜻이 들어 있다.
        </p>
      </section>

      <section>
        <SectionTitle title="왜 꼬물인가" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물이라는 이름은 빠르고 번쩍이는 움직임보다, 아주 작더라도 계속 이어지는 손의 리듬에 더 가깝다.</p>
          <p>우리는 완성된 결과만 중요하게 보지 않는다. 미완성인 상태를 지나며 점점 더 선명해지는 과정도 같이 남기고 싶다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="무엇을 만들고 있나" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>짧은 카드 게임도 있고, 선택에 따라 전개가 달라지는 서사형 게임도 있고, 하나의 작업에서 갈라져 나온 실험작도 있다.</p>
          <p>겉으로 보면 결이 달라 보여도 안쪽 질문은 비슷하다. 작더라도 손에 남는 감각은 어떻게 만들 수 있을까, 완성 전의 상태도 어디까지 작업으로 받아들일 수 있을까.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="어떤 태도로 만드는가" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물은 큰 팀이 아니다. 그래서 오히려 지금의 고민과 흔적을 더 솔직하게 남길 수 있다고 생각한다.</p>
          <p>이곳에는 결과뿐 아니라, 만드는 중에 있었던 판단과 수정과 망설임도 같이 기록하려고 한다. 빠르진 않지만 계속 만들고 있다.</p>
        </div>
      </section>
    </div>
  );
}
