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

  it('keeps the home page led by the latest trace, then dated flow and project worklines', () => {
    const homePage = read('app/page.tsx');
    const latestTraceIndex = homePage.indexOf('latestTrace');
    const traceFlowIndex = homePage.indexOf('traceFlow');
    const projectLinksIndex = homePage.indexOf('projectLinks');

    expect(latestTraceIndex).toBeGreaterThan(0);
    expect(traceFlowIndex).toBeGreaterThan(latestTraceIndex);
    expect(projectLinksIndex).toBeGreaterThan(traceFlowIndex);
    expect(homePage).toContain('작은 장면을 만들고, 한 번 더 만져봅니다.');
    expect(homePage).toContain('첫 글을 준비하고 있습니다');
    expect(homePage).toContain('보여줄 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.');
    expect(homePage).not.toMatch(/heroLoop|latestGamePath|<video|wanderer-mobile-demo\.mp4/);
    expect(homePage).not.toMatch(/최근에 쓴 글|만들고 있는 것|함께 만드는 것들|카드가 빠지는 순간|다음 자리가 열리는 순간/);
  });

  it('keeps the writing list as a real dated timeline instead of category sections', () => {
    const writingPage = read('app/writing/page.tsx');
    const content = read('lib/content.ts');

    expect(content).toContain('export type WorkTrace');
    expect(content).toContain('getWorkTraces');
    expect(writingPage).toContain('getWorkTraces');
    expect(writingPage).toContain('만들며 쓴 글');
    expect(writingPage).toContain('첫 글을 준비하고 있습니다');
    expect(writingPage).toContain('읽을 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.');
    expect(writingPage).not.toMatch(/기존 글은 모두 내렸습니다|Notion 초고|실행 화면/);
    expect(writingPage).not.toMatch(/trace\.type|trace\.status/);
    expect(writingPage).not.toMatch(/gamePosts|outsidePosts|section aria-label="게임"|카드와 퍼즐|저녁을 고른 뒤|글로 이동/);
  });

  it('marks the current top-level navigation item and keeps footer order aligned with the header', () => {
    const shell = read('components/site-shell.tsx');
    const nav = read('components/site-nav.tsx');

    expect(shell).toContain('<SiteNav items={NAV_ITEMS} />');
    expect(nav).toContain('usePathname');
    expect(nav).toContain('aria-current');
    expect(nav).toContain('현재 위치');

    const headerOrder = [
      shell.indexOf("href: '/projects'"),
      shell.indexOf("href: '/writing'"),
      shell.indexOf("href: '/about'"),
      shell.indexOf("href: '/links'"),
    ];
    const footerOrder = [
      shell.indexOf('href="/projects"'),
      shell.indexOf('href="/writing"'),
      shell.indexOf('href="/about"'),
      shell.indexOf('href="/links"'),
    ];

    expect(headerOrder).toEqual([...headerOrder].sort((a, b) => a - b));
    expect(footerOrder).toEqual([...footerOrder].sort((a, b) => a - b));
  });

  it('shows latest trace first on home instead of a generic recent-post index', () => {
    const homePage = read('app/page.tsx');

    expect(homePage).toContain('latestTrace');
    expect(homePage).toContain('첫 글을 준비하고 있습니다');
    expect(homePage).toContain('책상 위의 작은 게임과 도구');
    expect(homePage).not.toMatch(/최근 작업|최근 글부터 둡니다|latestPosts\.map|최근에 쓴 글|글 전체/);
  });

  it('keeps project index cards visitor-facing instead of dashboard cards', () => {
    const projectPage = read('app/projects/page.tsx');
    const projectCard = read('components/project-card.tsx');
    const content = read('lib/content.ts');

    expect(content).toContain('lastUpdated');
    expect(content).not.toContain('primaryEvidence');
    expect(content).not.toContain('verificationNote');
    expect(content).not.toContain('nextStep');
    expect(content).not.toContain('evidenceLabel');
    expect(projectCard).not.toContain('project.lastUpdated');
    expect(projectCard).not.toContain('records.length');
    expect(projectPage).toContain('작은 게임과 생활 도구');
    expect(projectPage).not.toMatch(/마지막으로 바뀐 순서|최근 날짜|실제로 이어진 글|ProjectCard[\s\S]*compact|Wanderer, Hanoi, Color Hanoi, TRPG를 따로 둡니다|프로젝트로 이동|글로 이동/);
  });

  it('does not expose evidence-state labels on project cards', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toContain('지금 볼 장면');
    expect(projectCard).not.toContain('primaryEvidence.href');
    expect(projectCard).not.toContain('primaryEvidence.label');
    expect(projectCard).not.toContain('primaryEvidence.note');
    expect(projectCard).not.toContain('evidenceLabel');
    expect(projectCard).not.toContain('evidenceHref');
  });

  it('keeps project detail related rows free of generic CTA labels', () => {
    const projectDetailPage = read('app/projects/[slug]/page.tsx');

    expect(projectDetailPage).not.toContain('글로 이동');
  });

  it('reduces writing detail scaffolding around the article body', () => {
    const detailPage = read('app/writing/[slug]/page.tsx');

    expect(detailPage).not.toMatch(/Pill|관련 프로젝트|이 글에서 보는 것|#\{tag\}|다음 글|다음에 읽을 이야기|post\.category|post\.series/);
    expect(detailPage).toContain('post.publishedAt');
    expect(detailPage).toContain('이어지는 글');
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
    expect(sources).not.toMatch(/첫 문장보다 선택의 부담|테마를 고르면 첫 문장이 바뀌는 게임|쓰는 건 부족했습니다|이 화면을 보고 나니/);
    expect(sources).not.toMatch(/기록\b|메모\b|흔적|작업 흔적|작업 순서|작업 중/);
  });

  it('keeps project cards from repeating section labels inside each card', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toContain('publicLabel');
    expect(projectCard).not.toContain("project.slug === 'ggumul-dinner-grocery' ? '생활 도구' : '게임'");
  });

  it('keeps the Wanderer project page as a plain game description', () => {
    const projectPage = read('app/projects/[slug]/page.tsx');
    const projectContent = read('content/projects/wanderer.mdx');
    const combined = [projectPage, projectContent].join('\n');

    expect(projectPage).toContain('조건에 맞는 카드를 골라 턴을 넘기는 모바일 카드 게임입니다.');
    expect(projectPage).toContain('손패는 낼 수 있는 카드와 낼 수 없는 카드로 바로 갈립니다.');
    expect(combined).not.toMatch(/세 장짜리 판으로 줄인 카드 게임|큰 카드 전투|뒤로 밀리는 숫자|뒤로 밀립니다|밀리는 손패|납득되는지부터 붙잡|그 짧은 흐름/);
    expect(projectPage).not.toMatch(/wanderer-mobile-demo\.mp4|<video/);
    expect(projectContent).not.toContain('small-games-first-move');
  });

  it('keeps the Hanoi project page as a plain puzzle description', () => {
    const projectPage = read('app/projects/[slug]/page.tsx');
    const projectContent = read('content/projects/hanoi.mdx');
    const combined = [projectPage, projectContent].join('\n');

    expect(projectPage).toContain('작은 원반 위에는 큰 원반을 올릴 수 없습니다.');
    expect(projectPage).toContain('원반을 하나 옮길 때마다 다음 선택지가 달라집니다.');
    expect(projectContent).not.toContain('small-games-first-move');
    expect(combined).not.toMatch(/재미있는 순간|어떤 길은 닫히고|새로 열립니다|자리의 차이를 먼저 붙잡|손끝에서 이어집니다|다음 자리 GIF|Hanoi 다음 자리|다음에 갈 수 있는 기둥이 바로 달라집니다|막힌 자리를 먼저 보이게 맞추고 있습니다/);
  });

  it('keeps links from exposing raw long URLs as the visible label', () => {
    const linksPage = read('app/links/page.tsx');

    expect(linksPage).not.toContain('break-all');
    expect(linksPage).not.toContain('{link.href}</p>');
    expect(linksPage).toContain('link.displayHref');
  });

  it('uses the paper-workshop palette and avoids heavy decorative depth', () => {
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

    expect(tailwind).toContain("background: '#FFF7E8'");
    expect(tailwind).toContain("text: '#211A14'");
    expect(tailwind).toContain("subtext: '#5F5147'");
    expect(tailwind).toContain("line: '#2A2119'");
    expect(tailwind).toContain("point: '#E85D3F'");
    expect(css).toContain('background: #fff7e8;');
    expect(css).toContain('color: #211a14;');
    expect(css).toContain('.sticker-card');
    expect(sharedSources).not.toMatch(/border-\[3px\]|group-hover:scale|blur-3xl/);
  });
});
