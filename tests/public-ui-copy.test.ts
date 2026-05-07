import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');
const publicSources = () => [
  'app/page.tsx',
  'app/projects/page.tsx',
  'app/projects/[slug]/page.tsx',
  'app/writing/page.tsx',
  'app/writing/[slug]/page.tsx',
  'app/about/page.tsx',
  'app/links/page.tsx',
  'components/project-card.tsx',
  'components/site-shell.tsx',
  'lib/site.ts',
  'lib/writing-reading-path.ts',
  ...readdirSync('content/projects').filter((name) => name.endsWith('.mdx')).map((name) => `content/projects/${name}`),
  ...readdirSync('content/writing').filter((name) => name.endsWith('.mdx')).map((name) => `content/writing/${name}`),
].map(read).join('\n');

describe('public copy safety rails', () => {
  it('keeps Korean prose readable in narrow layouts', () => {
    const css = read('app/globals.css');

    expect(css).toMatch(/body[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.prose[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.korean-keep[\s\S]*word-break:\s*keep-all/);
  });

  it('keeps the home page as a writing-first blog index', () => {
    const homePage = read('app/page.tsx');
    const writingSectionIndex = homePage.indexOf('{latestPosts.length ? (');
    const projectsSectionIndex = homePage.indexOf('{projectLinks.length ? (');

    expect(writingSectionIndex).toBeGreaterThan(0);
    expect(projectsSectionIndex).toBeGreaterThan(0);
    expect(writingSectionIndex).toBeLessThan(projectsSectionIndex);
    expect(homePage).toContain('최근 글');
    expect(homePage).not.toMatch(/heroLoop|latestGamePath|<video|wanderer-mobile-demo\.mp4/);
  });

  it('does not bring back playable Wanderer UI or mini-play code', () => {
    const sources = publicSources();
    const components = readdirSync('components').join('\n');

    expect(components).not.toContain('wanderer-turn-strip.tsx');
    expect(components).not.toContain('wanderer-mini-play.tsx');
    expect(existsSync('lib/wanderer-mini-play.ts')).toBe(false);
    expect(sources).not.toMatch(/WandererTurnStrip|WandererMiniPlay|wanderer-mini-play|#mini-play|mini-play/);
    expect(sources).not.toMatch(/useState|onClick|aria-pressed|직접 선택|선택해|눌러|플레이 창구/);
  });

  it('does not publish game-trial CTAs or landing-page campaign blocks', () => {
    const sources = publicSources();

    expect(sources).not.toMatch(/게임 해보기|한 턴 체험|카드 한 장 고르기|Wanderer 카드 고르기|먼저 만져볼 게임|직접 골라보기|바로 고르기/);
    expect(sources).not.toMatch(/CommunityCTA|PostEngagement|공유하기|댓글 남기기|RSS로 새 기록 받기|짧게 감상 남기기/);
    expect(sources).not.toMatch(/대표 게임 보기|게임 더 보기|전체 보기|최근 글 보기|보기\s*→|읽기\s*→/);
  });

  it('does not repeat old card-battle sample copy across public pages', () => {
    const sources = publicSources();

    expect(sources).not.toMatch(/상대 카드 13|상대는 13|13보다 높|홀수만 살아남음|짝수\/정답\/짝수|카드 한 장으로 턴을 가져옵니다/);
    expect(sources).not.toMatch(/10을 냈는데, 바로 버려졌습니다|10을 버려야 이기는 턴입니다|Wanderer · 한 턴|Wanderer 한 턴/);
    expect(sources).not.toMatch(/Wanderer 01|Wanderer 02|Wanderer 03|지금 고친 것|01 처음엔|02 바꾼 뒤|03 그래서/);
  });

  it('does not read like an internal task log', () => {
    const sources = publicSources();

    expect(sources).not.toMatch(/작업 중인 표본|확인 중|테마 선택 표본|다시 쓴 기록|월간 메모|제작 메모|장보기 메모|연결 문제 기록|설계 회고/);
    expect(sources).not.toMatch(/보고 있습니다|고치고 있습니다|붙여 보려고 합니다|생각입니다|다음 작업|다음에는|계속 갱신하기|더 짧게 다듬기/);
    expect(sources).not.toMatch(/기록\b|메모\b|흔적|작업 흔적|작업 순서|작업 중/);
  });

  it('keeps project cards from repeating section labels inside each card', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toContain('publicLabel');
    expect(projectCard).not.toContain("project.slug === 'ggumul-dinner-grocery' ? '생활 도구' : '게임'");
  });

  it('keeps links from exposing raw long URLs as the visible label', () => {
    const linksPage = read('app/links/page.tsx');

    expect(linksPage).not.toContain('break-all');
    expect(linksPage).not.toContain('{link.href}</p>');
    expect(linksPage).toContain('link.displayHref');
  });

  it('keeps the quiet reading palette and avoids heavy decorative depth', () => {
    const css = read('app/globals.css');
    const tailwind = read('tailwind.config.ts');
    const sharedSources = [
      read('components/site-shell.tsx'),
      read('components/brand-ui.tsx'),
      read('components/project-card.tsx'),
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
    ].join('\n');

    expect(tailwind).toContain("background: '#0F172A'");
    expect(tailwind).toContain("text: '#F8FAFC'");
    expect(tailwind).toContain("subtext: '#CBD5E1'");
    expect(tailwind).toContain("line: '#334155'");
    expect(tailwind).toContain("point: '#D6A72A'");
    expect(css).toContain('background: #0f172a;');
    expect(css).toContain('color: #f8fafc;');
    expect(sharedSources).not.toMatch(/border-\[3px\]|shadow-card|hover:-translate-y|group-hover:scale|bg-\[radial-gradient/);
  });
});
