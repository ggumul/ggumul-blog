import { ProjectCard } from '@/components/project-card';
import { SectionTitle } from '@/components/section-title';
import { getProjects } from '@/lib/content';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm uppercase tracking-[0.2em] text-point">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">지금 만들고 있는 것들</h1>
      </section>
      <SectionTitle title="프로젝트 목록" body="작품과 실험, 그리고 그걸 받쳐주는 서비스 축을 함께 모아두었다." />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
