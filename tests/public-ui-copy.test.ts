import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('public UI copy cleanup', () => {
  it('keeps Korean prose from splitting syllables in narrow cards', () => {
    const css = read('app/globals.css');

    expect(css).toMatch(/body[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.prose[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.korean-keep[\s\S]*word-break:\s*keep-all/);
  });

  it('does not expose raw long external URLs as card text', () => {
    const linksPage = read('app/links/page.tsx');

    expect(linksPage).not.toContain('break-all');
    expect(linksPage).not.toContain('{link.href}</p>');
    expect(linksPage).toContain('link.displayHref');
  });

  it('removes internal ordering and reading-time chips from visitor-facing cards', () => {
    const combined = [
      read('app/projects/[slug]/page.tsx'),
      read('components/post-card.tsx'),
      read('components/project-card.tsx'),
      read('app/writing/[slug]/page.tsx'),
    ].join('\n');

    expect(combined).not.toMatch(/순서 \{String\(project\.order\)|readingTimeMinutes\}분|개발기록 \{records\.length\}개/);
  });

  it('removes template labels from archive and project cards', () => {
    const combined = [
      read('components/post-card.tsx'),
      read('components/project-card.tsx'),
      read('app/writing/page.tsx'),
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
    ].join('\n');

    expect(combined).not.toMatch(/문제가 된 장면|바뀐 점|다음 장면/);
    expect(combined).not.toMatch(/남긴 판단|먼저 읽기|찾아볼 주제|처음 볼 기록|처음 오셨다면/);
    expect(combined).not.toMatch(/볼 지점|볼 수 있는 것|관련 기록|이어 읽기|기록 기반 카드/);
  });

  it('keeps project cards from using repeated explainer labels', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/지금 바로 볼 장면|다음에 이어 볼 기록|왜 이렇게 만들었는지|기록 기반 카드|이어 읽기|관련 기록|볼 수 있는 것|볼 지점/);
  });

  it('keeps the projects page focused on Wanderer instead of dashboard metrics', () => {
    const projectsPage = read('app/projects/page.tsx');

    expect(projectsPage).toContain("project.slug === 'wanderer'");
    expect(projectsPage).not.toMatch(/MetricCard|공개 항목|recordTotal|worklines\.slice\(1, 4\)/);
    expect(projectsPage).toContain('Wanderer부터 바로 봅니다');
  });

  it('keeps home from duplicating latest-record explanation blocks', () => {
    const homePage = read('app/page.tsx');

    expect(homePage).not.toMatch(/latestGamePath|다음에 볼 막힌 장면|남긴 판단|읽을 이유/);
    expect(homePage).toContain('30초 카드 골라보기');
  });

  it('keeps writing index from becoming a tag wall or repeated explainer grid', () => {
    const writingPage = read('app/writing/page.tsx');

    expect(writingPage).not.toMatch(/displayTopicTags|topicTags|recordLabel|읽을 이유|aside-rail|처음 오셨다면|처음 볼 기록/);
    expect(writingPage).toContain('Wanderer');
  });

  it('keeps the Wanderer detail page focused on play before follow/devlog blocks', () => {
    const projectDetailPage = read('app/projects/[slug]/page.tsx');

    expect(projectDetailPage).toContain('<WandererMiniPlay />');
    expect(projectDetailPage).not.toMatch(/firstVisitSteps|CommunityCTA|영상 → 기록 → 다음 소식|처음 오셨다면/);
    expect(projectDetailPage).not.toMatch(/지금 확인|지금 보는 이유|다음에 고칠 것|기록 보기|플레이 방식/);
    expect(projectDetailPage).toContain('한 장 고르고, 바로 결과를 봅니다.');
  });

  it('removes campaign-style follow/share blocks from primary pages', () => {
    const combined = [read('app/page.tsx'), read('app/links/page.tsx')].join('\n');

    expect(combined).not.toMatch(/같이 보기|RSS로 새 기록 받기|짧게 감상 남기기|X에 짧게 남기기|공유 문구/);
  });

  it('removes pre-reading instruction boxes from writing detail pages', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).not.toMatch(/읽기 전에|작업과 연결된 기록|확인한 화면\/문제\/판단/);
  });
});
