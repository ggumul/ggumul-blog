import { SectionTitle } from '@/components/section-title';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물 소개',
  description: '꼬물이 어떤 게임을 만들고 있는지 소개합니다.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 rounded-[28px] border border-line bg-white/10 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-point">꼬물 소개</p>
        <h1 className="text-4xl font-semibold tracking-tight">꼬물은 작은 게임을 만드는 이름입니다</h1>
        <p className="max-w-3xl text-base leading-7 text-subtext md:text-lg">
          빠르게 많이 만들기보다, 끝까지 고치고 이어가는 쪽을 선택합니다.
        </p>
      </section>

      <section>
        <SectionTitle title="왜 꼬물인가요" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물이라는 이름에는 작더라도 계속 움직이겠다는 뜻을 담았습니다.</p>
          <p>완성된 결과만 보여주기보다, 만들면서 바뀐 판단도 함께 남깁니다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="무엇을 만드나요" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>짧은 카드 게임, 선택에 따라 전개가 달라지는 서사형 게임, 규칙을 바꿔보는 퍼즐 실험을 만들고 있습니다.</p>
          <p>겉모습은 달라도 기준은 비슷합니다. 짧게 플레이해도 손에 남는 감각이 있는지, 만드는 중간의 판단을 어떻게 남길 수 있는지를 계속 봅니다.</p>
        </div>
      </section>

      <section>
        <SectionTitle title="어떻게 만드나요" />
        <div className="max-w-3xl space-y-4 text-subtext leading-7">
          <p>꼬물은 큰 팀이 아닙니다. 대신 만들면서 생기는 문제와 판단을 바로 기록할 수 있습니다.</p>
          <p>이곳에는 결과뿐 아니라 수정, 실패, 방향 변경도 남깁니다. 빠르지는 않아도 계속 만듭니다.</p>
        </div>
      </section>
    </div>
  );
}
