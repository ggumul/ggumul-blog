import { SectionTitle } from '@/components/section-title';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 어떤 방식으로 만들고 기록하는지 정리한 페이지.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 rounded-[28px] border border-line bg-white/65 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-point">꼬물 소개</p>
        <h1 className="text-4xl font-semibold tracking-tight">꼬물에 대하여</h1>
        <p className="max-w-3xl text-base leading-7 text-subtext md:text-lg">
          꼬물은 빠르게 많이 만들기보다, 오래 이어 가는 쪽에 더 가까운 이름이다.
        </p>
      </section>

      <section>
        <SectionTitle title="왜 꼬물인가" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물이라는 이름은 빠르게 크게 움직이기보다, 작더라도 계속 이어 가는 방식에 가깝다.</p>
          <p>우리는 완성된 결과만 보여주기보다, 만들면서 판단이 어떻게 바뀌는지도 같이 남기고 싶다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="무엇을 만들고 있나" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>짧은 카드 게임도 있고, 선택에 따라 전개가 달라지는 서사형 게임도 있고, 하나의 작업에서 갈라져 나온 실험작도 있다.</p>
          <p>겉모습은 달라도 안에서 보는 질문은 비슷하다. 짧게 해도 손에 남는 플레이를 만들 수 있을지, 완성 전의 상태도 어디까지 기록으로 남길 수 있을지를 계속 보고 있다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="어떻게 만들고 있나" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물은 큰 팀이 아니다. 그래서 지금 만들면서 생기는 문제와 판단을 더 바로 기록할 수 있다.</p>
          <p>이곳에는 결과뿐 아니라, 만드는 중에 있었던 수정과 실패와 방향 변경도 같이 남기려고 한다. 빠르진 않지만 계속 만들고 있다.</p>
        </div>
      </section>
    </div>
  );
}
