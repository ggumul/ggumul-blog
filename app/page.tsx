import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { SectionTitle } from '@/components/section-title';
import { getFeaturedProjects, getFeaturedWriting } from '@/lib/content';

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(), getFeaturedWriting()]);

  return (
    <div className="space-y-16">
      <section className="space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-point">ggumul / 꼬물</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          작게 시작해도 계속 만들고 쌓아가는 팀의 작업실
        </h1>
        <p className="max-w-2xl text-base text-subtext md:text-lg">
          꼬물은 게임들을 만드는 작은 팀이다. 빠르게 크게 보여주기보다, 작더라도 계속 만들고 쌓아가는 쪽에 더 가깝다.
          이곳에는 완성된 결과만 아니라, 그 사이에 있었던 고민과 수정, 그리고 만드는 중의 흔적도 같이 남긴다.
        </p>
      </section>

      <section>
        <SectionTitle title="지금 만들고 있는 것" body="프로젝트 자체보다, 어떤 감각을 붙들고 있는지가 먼저 보였으면 했다." />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="최근 글" body="기술 설명보다, 왜 이런 식으로 만들고 있는지부터 남기고 있다." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white/50 p-6">
        <SectionTitle title="이 공간에서 하는 일" />
        <ul className="space-y-3 text-sm text-subtext">
          <li>Projects에서 지금 만드는 것들을 정리한다.</li>
          <li>Writing에서 발행한 글과 생각 정리를 모은다.</li>
          <li>노션에는 내부 정리를, 여기에는 바깥으로 보여줄 형태를 남긴다.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link className="rounded-full border border-line px-4 py-2 hover:border-point" href="/about">
            About 보기
          </Link>
          <Link className="rounded-full border border-line px-4 py-2 hover:border-point" href="/projects">
            Projects 보기
          </Link>
          <Link className="rounded-full border border-line px-4 py-2 hover:border-point" href="/writing">
            Writing 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
