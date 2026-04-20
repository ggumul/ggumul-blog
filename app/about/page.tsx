import { SectionTitle } from '@/components/section-title';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section>
        <p className="text-sm uppercase tracking-[0.2em] text-point">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">꼬물에 대하여</h1>
      </section>

      <section>
        <SectionTitle title="왜 꼬물인가" />
        <div className="max-w-3xl space-y-4 text-subtext">
          <p>꼬물이라는 이름에는 느리더라도 멈추지 않고, 조금씩 손을 움직이며 결과물을 자라게 한다는 뜻이 들어 있다.</p>
          <p>우리는 완성된 결과만 중요하게 보지 않는다. 미완성인 상태를 지나며 점점 더 선명해지는 과정도 같이 남기고 싶다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="무엇을 만들고 있나" />
        <div className="max-w-3xl space-y-4 text-subtext">
          <p>지금 꼬물 안에는 짧은 카드 게임도 있고, 선택에 따라 전개가 달라지는 서사형 게임도 있고, 하나의 작업에서 조금씩 갈라져 나온 실험작도 있다.</p>
          <p>겉으로 보면 결이 조금씩 달라 보일 수 있지만, 안쪽에서는 모두 비슷한 질문에서 시작한다. 작더라도 손에 남는 감각은 어떻게 만들 수 있을까, 완성 전의 상태도 어디까지 작업으로 받아들일 수 있을까, 그리고 오래 붙들 수 있는 작업은 어떤 리듬으로 자라나는가.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="어떤 태도로 만드는가" />
        <div className="max-w-3xl space-y-4 text-subtext">
          <p>꼬물은 아직 큰 팀이 아니다. 하지만 그래서 오히려 지금의 고민과 흔적을 더 솔직하게 남길 수 있다고 생각한다.</p>
          <p>이곳에는 결과만 아니라, 만드는 중에 있었던 판단과 수정과 망설임도 같이 기록하려고 한다. 빠르진 않지만, 계속 만들고 있다.</p>
        </div>
      </section>
    </div>
  );
}
