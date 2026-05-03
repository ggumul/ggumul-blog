import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');
const readWritingMdx = () =>
  readdirSync('content/writing')
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => read(`content/writing/${name}`))
    .join('\n');

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
    expect(projectDetailPage).not.toMatch(/지금 확인|지금 보는 이유|다음에 고칠 것|기록 보기|플레이 방식|현재 들어간 것|Wanderer 노트|폰에서 돌린 날/);
    expect(projectDetailPage).toContain('한 장 고르고, 바로 결과를 봅니다.');
  });

  it('removes campaign-style follow/share blocks from primary pages', () => {
    const combined = [read('app/page.tsx'), read('app/links/page.tsx'), read('components/site-shell.tsx')].join('\n');

    expect(combined).not.toMatch(/같이 보기|RSS로 새 기록 받기|짧게 감상 남기기|X에 짧게 남기기|공유 문구|>RSS</);
  });

  it('removes pre-reading instruction boxes and engagement prompts from writing detail pages', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).not.toMatch(/읽기 전에|작업과 연결된 기록|확인한 화면\/문제\/판단|PostEngagement|공유하기|댓글 남기기/);
  });

  it('keeps public copy from repeating generic view CTAs and dev-record framing', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('components/project-card.tsx'),
      read('components/post-card.tsx'),
      read('components/site-shell.tsx'),
      read('app/about/page.tsx'),
      read('lib/writing-reading-path.ts'),
      read('content/writing/2026-04-20-wanderer-초기-설계-회고.mdx'),
      readWritingMdx(),
    ].join('\n');

    expect(combined).not.toMatch(/대표 게임 보기|게임 더 보기|전체 보기|글 더 보기|최근 글 보기|끊긴 지점 보기|어긋난 이유 보기|퍼즐 흐름 보기|장보기 흐름 보기|개발 기록 보기/);
    expect(combined).not.toMatch(/게임의 화면, 변경 이유, 남은 문제|결과보다 과정|기록 가능한 개발|작은 단위의 완성|개발기록/);
    expect(combined).not.toMatch(/실제 화면 기록|화면에서 막힌 지점|화면 노트|시스템 노트|프로젝트 소개|최근 글|최근 바뀐 장면|Wanderer 노트/);
    expect(combined).not.toMatch(/게임 노트|장보기 기록|스튜디오 노트|#게임 개발|개발 중/);
    expect(combined).not.toMatch(/플레이 메모|Studio rhythm|4 Games Map|프로젝트 상태|작업 기준/);
    expect(combined).not.toMatch(/이번 기록|초기 설계 회고|확인한 사실|다음 작업|점검표|프로젝트 문서|프로젝트 회고|같은 작업에서 나온 글/);
  });

  it('keeps project cards from repeating two descriptions for the same project', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/projectLines|projectAvailability|StatusFacts/);
    expect(projectCard).not.toMatch(/식단을 정하면 장보기 목록과 가격 판단으로 이어집니다|홀수만 살아남는 턴에서 15를 내면 상대의 13을 넘깁니다|막대를 옮기면 다음 상태가 바로 보입니다/);
  });
});
