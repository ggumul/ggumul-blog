import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');
const readFrontmatter = (path: string) => read(path).split('---')[1] ?? '';
const readWritingMdx = () =>
  readdirSync('content/writing')
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => read(`content/writing/${name}`))
    .join('\n');

const readProjectMdx = () =>
  readdirSync('content/projects')
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => read(`content/projects/${name}`))
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
    expect(linksPage).not.toContain('github.com/ggumul');
    expect(linksPage).toContain('github.com/ggomul');
    expect(linksPage).toContain('아직 게임이 되기 전의 생각을 모아 놓습니다');
    expect(linksPage).not.toMatch(/메모 모음|type: 'memo'|게임, 메모|코드 저장소, 메모/);
    expect(linksPage).toContain('link.displayHref');
  });

  it('removes internal ordering and reading-time chips from visitor-facing cards', () => {
    const combined = [
      read('app/projects/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('app/writing/[slug]/page.tsx'),
    ].join('\n');

    expect(combined).not.toMatch(/순서 \{String\(project\.order\)|readingTimeMinutes\}분|개발기록 \{records\.length\}개/);
  });

  it('removes template labels from archive and project cards', () => {
    const combined = [
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
    expect(projectsPage).not.toMatch(/공개 항목|recordTotal|worklines\.slice\(1, 4\)|총 게임|화면·글·상태|현황판/);
    expect(projectsPage).not.toMatch(/장면을 나누고, 글과 화면을 붙입니다|가장 최근에 확인한 화면과 기록을 먼저 보여줍니다/);
    expect(projectsPage).not.toMatch(/object-contain object-center/);
    expect(projectsPage).not.toContain('/media/runtime-checks/wanderer-mobile-current.png');
    expect(projectsPage).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
    expect(projectsPage).not.toMatch(/Wanderer부터 바로 봅니다|먼저 볼 건|줄였습니다|한장을|짧게 보고 고릅니다|새로 좋아진 점|살아남고|13보다 높아/);
    expect(projectsPage).not.toMatch(/게임 해보기|해보기|카드 한 장 고르기|Wanderer 카드 고르기|Wanderer 한 턴/);
    expect(projectsPage).not.toMatch(/안전한 선택이 먼저 틀어집니다|규칙 앞에서 빠집니다/);
    expect(projectsPage).toContain('좋아 보이는 선택도 판이 바뀌면 버립니다.');
    expect(projectsPage).toContain('좋은 카드가 아니라 죽지 않을 카드');
  });

  it('states the real ggumul identity before introducing any single game', () => {
    const homePage = read('app/page.tsx');
    const heroSection = homePage.slice(homePage.indexOf('<section className="max-w-4xl'), homePage.indexOf('{leadProject ? ('));
    const leadSection = homePage.slice(homePage.indexOf('{leadProject ? ('), homePage.indexOf('{otherProjects.length ? ('));

    expect(heroSection).toContain('안전해 보이는 선택부터 버립니다.');
    expect(heroSection).toContain('꼬물은 작은 게임에서 선택이 틀어지는 순간을 먼저 꺼냅니다.');
    expect(heroSection).toContain('왜 10을 버리고 15를 남겼는지');
    expect(heroSection).not.toMatch(/고르면 바로 결과가 보이는 게임|카드를 고르고, 막대를 옮기고, 문장을 누르는|글은 게임을 해본 뒤에 읽는 설명|게임 뒤에 읽는 글|작은 선택이 바로 돌아오는|선택이 바로 돌아오는|결과가 바로 돌아오는|큰 세계관보다|글은 그 뒤에 붙습니다/s);
    expect(heroSection).not.toMatch(/Wanderer|카드 한 장|한 장의 카드|카드 한 장 고르기/);
    expect(leadSection).toContain('처음 걸리는 선택');
    expect(leadSection).not.toMatch(/먼저 만져볼 게임|게임 해보기|해보기|카드 한 장 고르기/);
    expect(leadSection).toContain('Wanderer');
    expect(leadSection).toContain('10은 안전해 보이지만');
    expect(leadSection).toContain('좋은 카드가 아니라 죽지 않을 카드');
  });

  it('keeps home focused on one playable turn instead of a generic landing page', () => {
    const homePage = read('app/page.tsx');
    const homeVisibleSources = [
      homePage,
      read('components/site-shell.tsx'),
      read('lib/writing-reading-path.ts'),
      readFrontmatter('content/projects/wanderer.mdx'),
      readFrontmatter('content/writing/2026-04-26-runtime-화면-확인-기록.mdx'),
      readFrontmatter('content/writing/2026-04-21-wanderer-sync-연결-문제-분석.mdx'),
      readFrontmatter('content/writing/2026-04-27-ggumul-dinner-grocery-가격-계약-정리.mdx'),
    ].join('\n');

    expect(homePage).not.toMatch(/latestGamePath|다음에 볼 막힌 장면|남긴 판단|읽을 이유/);
    expect(homePage).not.toContain('object-contain object-center');
    expect(homePage).not.toContain('<video');
    expect(homePage).not.toContain('wanderer-mobile-demo.mp4');
    expect(homePage).not.toMatch(/heroLoop|조건을 읽고,?<br \/>한 장으로 턴을 가져갑니다|Wanderer 한 턴 샘플|홀수만 살아남음|직접 골라보기|Wanderer를 먼저 봅니다|Wanderer 말고도 바로 해볼 일이 있어요|버튼 뒤 장면이 늦었던 날/);
    expect(homePage).not.toMatch(/Wanderer 플레이 예시|지금 이길 카드는 어느 쪽일까요|모바일에서 결과가 늦게 보였던 문제|끊긴 이유|서버는 이미 끊겼다|턴 조건을 보고/);
    expect(homeVisibleSources).not.toMatch(/모바일에서도 결과가 자연스럽게|결과가 바로 이어지지 않던 흐름|흐름을 다시 맞췄습니다|버튼 뒤 흐름 끊김|진행 상태 개선|짧게 볼 수 있는 다른 게임들|유효합니다/);
    expect(homeVisibleSources).not.toMatch(/category: "연결 문제"|- "runtime"|- "flutter"|안정적으로 이어지게|자연스럽게 이어지게|멈칫했는지 줄이고|카드를 한 장을/);
    expect(homeVisibleSources).not.toMatch(/다듬고 있습니다|만들고 있습니다|정리했습니다|다듬었습니다|볼 수 있어야 했습니다|고쳤|Mobile flow|Wanderer turn/);
    expect(homeVisibleSources).not.toMatch(/상대 카드 13|이번 턴은 홀수는 남고 짝수는 빠집니다\. 상대의 13보다 높은|13보다 높고 홀수인 카드|선택한 문장이 이어지는 흐름과 결말로 돌아옵니다|색 조건 하나가 익숙한 퍼즐을 다른 문제로 바꿉니다/);
    expect(homeVisibleSources).not.toMatch(/바로 한 턴 해보기|한 턴 가능|플레이 흐름 읽기|카드 선택 뒤 결과|다른 작은 게임들|장보기 보기|한 턴 체험하기|서사 보기|퍼즐 보기|상대보다 높은 카드|글 목록|글 읽기 →|게임이 늘어나자|게임 둘러보기 →/);

    expect(homeVisibleSources).toContain('안전해 보이는 10은 왜 먼저 버려졌나');
    expect(homeVisibleSources).toContain('좋은 카드가 아니라 죽지 않을 카드');
    expect(homePage).toContain('안전해 보이는 선택부터 버립니다.');
    expect(homePage).toContain('10은 안전해 보이지만');
    expect(homePage).not.toMatch(/게임 해보기|해보기|카드 한 장 고르기|Wanderer 카드 고르기|Wanderer 한 턴/);
    expect(homePage).toContain('왜 10을 버리고 15를 남겼는지');
  });

  it('keeps the late-stage public copy fixes from regressing into awkward repeated labels', () => {
    const homePage = read('app/page.tsx');
    const projectsPage = read('app/projects/page.tsx');
    const writingPage = read('app/writing/page.tsx');
    const aboutPage = read('app/about/page.tsx');

    expect(homePage).not.toMatch(/지금 해볼 게임|열기 →|글 모아 열기|게임 목록 열기/);
    expect(projectsPage).not.toMatch(/더 궁금한 이유|지금 해볼 게임/);
    expect(aboutPage).not.toContain('열기 →');
    expect(aboutPage).not.toMatch(/카드 한 장을 냅니다|손으로 만질 수 있는 것부터/);
    expect(projectsPage).not.toMatch(/안전한 선택이 먼저 틀어집니다|규칙 앞에서 빠집니다/);
    expect(projectsPage).toContain('좋아 보이는 선택도 판이 바뀌면 버립니다.');
    expect(writingPage).toContain('왜 그 선택을 버렸나');
  });

  it('keeps public navigation from falling back to repeated open-arrow CTAs', () => {
    const publicNavigationSources = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/writing/[slug]/page.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
      read('components/project-card.tsx'),
      read('lib/writing-reading-path.ts'),
    ].join('\n');

    expect(publicNavigationSources).not.toMatch(/열기|보기\s*→|읽기\s*→|→/);
    expect(publicNavigationSources).not.toMatch(/더 궁금한 이유|지금 해볼 게임|게임 목록 열기|글 모아 열기|대표 게임|다음 게임/);
    expect(publicNavigationSources).not.toMatch(/<span className="text-sm font-bold text-point">보기<\/span>/);
    expect(publicNavigationSources).toContain('안전해 보이는 선택부터 버립니다.');
  });

  it('keeps project cards from repeating the same title as a nested CTA block', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toContain('aria-label={`${project.title} 자세히`}');
    expect(projectCard).not.toContain('<p className="mt-3 text-[20px] font-black leading-tight tracking-[-0.04em] text-text">{project.title}</p>');
    expect(projectCard).not.toContain('{project.title}\n        </Link>');
  });

  it('keeps writing index from becoming a tag wall or repeated explainer grid', () => {
    const writingPage = read('app/writing/page.tsx');

    expect(writingPage).not.toMatch(/displayTopicTags|topicTags|recordLabel|읽을 이유|aside-rail|처음 오셨다면|처음 볼 기록|project\.progressStatus/);
    expect(writingPage).toContain('Wanderer');
  });

  it('keeps the Wanderer detail page focused on play before follow/devlog blocks', () => {
    const projectDetailPage = read('app/projects/[slug]/page.tsx');

    expect(projectDetailPage).toContain('<WandererMiniPlay />');
    expect(projectDetailPage).not.toMatch(/firstVisitSteps|CommunityCTA|영상 → 기록 → 다음 소식|처음 오셨다면/);
    expect(projectDetailPage).not.toMatch(/지금 확인|지금 보는 이유|다음에 고칠 것|기록 보기|플레이 방식|현재 들어간 것|Wanderer 노트|폰에서 돌린 날/);
    expect(projectDetailPage).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
    expect(projectDetailPage).not.toMatch(/게임 해보기|해보기|카드 한 장 고르기|Wanderer 카드 고르기|Wanderer 한 턴|카드 한 장으로 턴을 가져옵니다|상대는 13|한 장을 고르면/);
    expect(projectDetailPage).toContain('홀수는 남고 짝수는 빠집니다');
    expect(projectDetailPage).toContain('10을 버려야 이기는 턴입니다.');
  });

  it('removes campaign-style follow/share blocks from primary pages', () => {
    const combined = [read('app/page.tsx'), read('app/links/page.tsx'), read('components/site-shell.tsx')].join('\n');

    expect(combined).not.toMatch(/같이 보기|RSS로 새 기록 받기|짧게 감상 남기기|X에 짧게 남기기|공유 문구|>RSS</);
  });

  it('keeps shared navigation labels consistent with the public game framing', () => {
    const shell = read('components/site-shell.tsx');

    expect(shell).toContain('<Link href="/projects" className="transition hover:text-text">게임</Link>');
    expect(shell).toContain('<Link href="/writing" className="transition hover:text-text">게임 글</Link>');
    expect(shell).not.toContain('<Link href="/projects" className="transition hover:text-text">프로젝트</Link>');
    expect(shell).not.toContain('<Link href="/writing" className="transition hover:text-text">새 소식</Link>');
  });

  it('keeps the shared header navigational instead of repeating the primary play CTA', () => {
    const shell = read('components/site-shell.tsx');

    expect(shell).not.toContain('/projects/wanderer#mini-play');
    expect(shell).not.toContain('카드 한 장 고르기');
    expect(shell).not.toContain('md:max-lg:hidden');
  });

  it('keeps mobile-facing copy and thumbnails from reading like dashboards or placeholders', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('components/wanderer-mini-play.tsx'),
      read('lib/writing-reading-path.ts'),
    ].join('\n');

    expect(combined).not.toMatch(/한장|한판|한장을/);
    expect(combined).not.toMatch(/Wanderer부터 고릅니다|결과가 여기에 뜹니다|상대 카드 13|상대는 13|카드 한 장으로 턴을 가져옵니다|한 장을 고르면|한 장만 선택|짝수\/정답\/짝수|볼 수 있는 장면/);
    expect(combined).not.toMatch(/게임이 끊기는 순간을 고칩니다|어떤 순간에 멈추는지 보고 왜 바꿨는지|자세한 제작 이야기|아래에는 퍼즐과 서사 게임도 함께 모았습니다/);
    expect(combined).toContain('처음 걸리는 선택');
    expect(combined).toContain('게임 글');
    expect(combined).toContain('aria-live="polite"');
  });

  it('keeps the public flow game-first instead of project-status first', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('components/site-shell.tsx'),
      readFrontmatter('content/writing/2026-04-20-4월-프로젝트-개발-현황.mdx'),
      readFrontmatter('content/writing/2026-04-26-runtime-화면-확인-기록.mdx'),
    ].join('\n');

    expect(combined).toContain('안전해 보이는 선택부터 버립니다.');
    expect(combined).not.toMatch(/짧게 만질 수 있는 작은 게임을 만듭니다|꼬물은 작은 게임을 만들고, 게임을 해본 뒤 읽을 글을 함께 보여 줍니다|작은 선택이 바로 돌아오는|선택이 바로 돌아오는|결과가 바로 돌아오는/);
    expect(combined).not.toMatch(/게임 해보기|해보기|카드 한 장 고르기|Wanderer 카드 고르기|Wanderer 한 턴|먼저 만져볼 게임/);
    expect(combined).toContain('게임 글');
    expect(combined).toContain('안전해 보이는 10은 왜 먼저 버려졌나');
    expect(combined).not.toMatch(/게임과 도구|다른 게임과 도구|다른 작은 게임들?|새 소식|최근 소식|한 턴 고르기|짧게 살펴봅니다|게임 흐름 보기|이야기 더 보기|이야기 읽기|Wanderer와 퍼즐을 한 화면에서 고르게 나눴다|고르게 나눴다|현재 상태를 한 번에 정리|무엇을 확인하는 단계인지|다음에 어떤 작업이 필요한지|버튼 뒤 장면이 늦었습니다|폰에서 눌렀을 때 결과가 늦게 읽힌 순간|iOS Simulator에서 실행했습니다|로컬 서버|Flutter 통합 테스트|Gradle 테스트|운영 서버|장시간 동시 접속|보여야 합니다|돌아와야 합니다|흐려졌습니다|흐려지는|깊은 기술|다음에 볼 게임들|다음에 해볼 게임들|Wanderer부터 시작합니다/);
    expect(combined).not.toMatch(/Wanderer와 퍼즐을 한 화면에서 고르게 나눴다|고르게 나눴다|현재 상태를 한 번에 정리|무엇을 확인하는 단계인지|다음에 어떤 작업이 필요한지/);
    expect(combined).not.toMatch(/버튼 뒤 장면이 늦었습니다|폰에서 눌렀을 때 결과가 늦게 읽힌 순간|iOS Simulator에서 실행했습니다|로컬 서버|Flutter 통합 테스트|Gradle 테스트|운영 서버|장시간 동시 접속/);
  });

  it('removes pre-reading instruction boxes and engagement prompts from writing detail pages', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).not.toMatch(/읽기 전에|작업과 연결된 기록|확인한 화면\/문제\/판단|PostEngagement|공유하기|댓글 남기기/);
  });

  it('does not render broken article hero images or mismatched fixed captions when a project has no screenshot', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).toContain('heroImage ? (');
    expect(writingDetailPage).toContain('<span>{post.title}</span>');
    expect(writingDetailPage).not.toContain('<span>장보기 전 가격 흐름</span>');
    expect(writingDetailPage).toContain('{heroImage ? (\n              <img');
    expect(writingDetailPage).not.toMatch(/<figure[^>]*>\s*<img[\s\S]*src=\{heroImage\}/);
  });

  it('keeps public copy from repeating generic view CTAs and dev-record framing', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('components/project-card.tsx'),
      read('components/site-shell.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
      read('lib/writing-reading-path.ts'),
      read('content/writing/2026-04-20-wanderer-초기-설계-회고.mdx'),
      readWritingMdx(),
      readProjectMdx(),
    ].join('\n');

    expect(combined).not.toMatch(/봤습니다|봅니다|확인합니다|검증|실행|Simulator|Flutter|wanderer-was|플레이 확인|계약 점검 중/);
    expect(combined).not.toMatch(/대표 게임 보기|게임 더 보기|전체 보기|글 더 보기|최근 글 보기|끊긴 지점 보기|어긋난 이유 보기|퍼즐 흐름 보기|장보기 흐름 보기|개발 기록 보기/);
    expect(combined).not.toMatch(/게임의 화면, 변경 이유, 남은 문제|결과보다 과정|기록 가능한 개발|작은 단위의 완성|개발기록/);
    expect(combined).not.toMatch(/실제 화면 기록|화면에서 막힌 지점|화면 노트|시스템 노트|프로젝트 소개|최근 글|최근 바뀐 장면|Wanderer 노트/);
    expect(combined).not.toMatch(/게임 노트|장보기 기록|스튜디오 노트|#게임 개발|개발 중/);
    expect(combined).not.toMatch(/플레이 메모|Studio rhythm|4 Games Map|프로젝트 상태|작업 기준/);
    expect(combined).not.toMatch(/화면 있음|가격 연결 중|다른 항목|폰에서 본 장면|바로 고르기|첫 장면|새 장면|퍼즐 흐름|장보기 흐름|변형 규칙|빈 부분 다시 열기|가격 기준 다시 열기|끊긴 장면\s*→|프로젝트 지도|볼 항목|event 이름|payload 기준|작업 철학|진행 현황/);
    expect(combined).not.toMatch(/작업 문서|작업 정리|작업 관련 문의/);
    expect(combined).not.toMatch(/이번 기록|초기 설계 회고|확인한 사실|다음 작업|점검표|프로젝트 문서|프로젝트 회고|같은 작업에서 나온 글/);
    expect(combined).not.toMatch(/작업 철학|진행 현황/);
    expect(combined).not.toMatch(/모바일 화면|최근 장면 보기|한 턴 다듬은 글|대표 화면|작업을 찾을 수 없음|요청한 작업을 찾을 수 없습니다/);
    expect(combined).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
  });

  it('keeps project cards from repeating two descriptions for the same project', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/projectLines|projectAvailability|StatusFacts|project\.progressStatus/);
    expect(projectCard).not.toMatch(/>새 소식<|식단을 정하면 장보기 목록과 가격 판단으로 이어집니다|홀수는 남고 짝수는 빠집니다에서 15를 내면 상대의 13을 넘깁니다|막대를 옮기면 다음 상태가 바로 보입니다|기록 읽기|첫 행동과 결과가 바로 이어지는지 확인할 수 있게/);
    expect(projectCard).not.toContain('function WandererCardPreview');
    expect(projectCard).not.toContain("project.slug === 'wanderer' ?");
    expect(projectCard).not.toContain('wanderer-card-preview');
  });

  it('keeps the visual system quiet: no patterned backdrop or heavy depth tokens', () => {
    const css = read('app/globals.css');
    const sharedSources = [
      css,
      read('components/site-shell.tsx'),
      read('components/brand-ui.tsx'),
      read('components/project-card.tsx'),
      read('components/wanderer-mini-play.tsx'),
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('app/writing/[slug]/page.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
    ].join('\n');

    expect(css).not.toMatch(/body::before|radial-gradient\(circle at 14%|background-size:\s*26px 26px|blur-3xl/);
    expect(sharedSources).not.toMatch(/border-\[3px\]|shadow-card|shadow-\[0_[3-9]px|hover:-translate-y|group-hover:scale|bg-\[radial-gradient/);
    expect(sharedSources).not.toMatch(/studio-shot|hero-panel|game-card-glow|story-card|rounded-\[28px\]/);
  });

  it('keeps primary pages one-layered and list-like instead of card-in-card dashboards', () => {
    const home = read('app/page.tsx');
    const projects = read('app/projects/page.tsx');
    const writing = read('app/writing/page.tsx');
    const miniPlay = read('components/wanderer-mini-play.tsx');

    expect(home).not.toMatch(/상대 카드: 13|내 손패|정답|VS|figure className="studio-shot|ProjectCard project=\{leadProject\}/);
    expect(projects).not.toMatch(/상대 카드|내 카드|결과|VS|figure className="studio-shot|recentRecords/);
    expect(writing).toContain('article-list');
    expect(writing).not.toMatch(/gameLanes|grid gap-5 md:grid-cols/);
    expect(miniPlay).not.toMatch(/rounded-\[26px\]|rounded-\[22px\]|lg:grid-cols-\[minmax\(0,0\.62fr\)|result aside/);
  });

  it('keeps mobile archive pages compact enough to show real lists immediately', () => {
    const projects = read('app/projects/page.tsx');
    const writing = read('app/writing/page.tsx');

    expect(projects).not.toContain('game-button-primary text-sm md:max-lg:hidden');
    expect(projects).not.toContain('text-[38px] font-black leading-[1.04]');
    expect(writing).not.toContain('text-[38px] font-black leading-[1.04]');
    expect(writing).not.toContain('Wanderer 한 턴 →');
    expect(projects).toContain('text-[30px] font-black leading-tight');
    expect(writing).toContain('text-[26px] font-black leading-tight');
    expect(writing).toContain('rounded-full border border-line/60 px-2.5 py-1 text-[12px] font-semibold text-subtext');
  });

  it('puts Wanderer card selection before the video-heavy detail proof without nested CTA frames', () => {
    const detail = read('app/projects/[slug]/page.tsx');
    const miniPlay = read('components/wanderer-mini-play.tsx');

    expect(detail.indexOf('<WandererMiniPlay />')).toBeLessThan(detail.indexOf('<section id="play-video"'));
    expect(detail).not.toContain('rounded-[28px]');
    expect(detail).not.toContain('rounded-[24px] border border-line/70 bg-black/20');
    expect(detail).not.toContain('figure id="play-video" className="relative scroll-mt-28 overflow-hidden rounded-2xl border');
    expect(detail).toContain('md:hidden');
    expect(detail).toContain('hidden max-h-[520px] w-full object-contain md:block');
    expect(detail).toContain('승부 읽기');
    expect(miniPlay).not.toContain('id="mini-play"');
    expect(miniPlay).not.toContain('scroll-mt-28');
    expect(miniPlay).not.toContain('href="#play-video"');
    expect(miniPlay).not.toContain('rounded-[18px] border p-4 ${selectedCard');
  });

  it('states ggumul, games, and game-writing relationship in one plain public frame', () => {
    const home = read('app/page.tsx');
    const shell = read('components/site-shell.tsx');
    const writing = read('app/writing/page.tsx');
    const projects = read('app/projects/page.tsx');
    const site = read('lib/site.ts');
    const og = read('app/opengraph-image.tsx');
    const combined = [home, shell, writing, projects, site, og].join('\n');

    expect(combined).toContain('안전해 보이는 선택부터 버립니다.');
    expect(combined).toContain('꼬물은 작은 게임에서 선택이 틀어지는 순간을 먼저 꺼냅니다.');
    expect(combined).not.toMatch(/고르면 바로 결과가 보이는 게임|꼬물은 카드를 고르고, 막대를 옮기고, 문장을 누르는|글은 게임을 해본 뒤에 읽는 설명|작은 게임, 그리고 게임 뒤에 읽는 글|작은 게임을 만들고, 게임 뒤에 읽는 글을 함께 보여 줍니다|게임을 먼저 해보고, 그 뒤에 선택이 왜 그렇게 놓였는지|먼저 게임을 고른 뒤, 궁금해진 이야기는 게임 뒤의 글에서 이어 읽습니다/);
    expect(combined).not.toMatch(/작은 게임과 게임 글|선택 뒤에 남은 이야기|선택 뒤에 남은|게임 뒤의 글<\/p>[\s\S]*선택이 짧아진 이유/);
  });

  it('uses a reading-first muted palette instead of yellow-on-blue visual noise', () => {
    const css = read('app/globals.css');
    const tailwind = read('tailwind.config.ts');
    const combined = [css, tailwind].join('\n');

    expect(tailwind).toContain("background: '#0F172A'");
    expect(tailwind).toContain("text: '#F8FAFC'");
    expect(tailwind).toContain("subtext: '#CBD5E1'");
    expect(tailwind).toContain("line: '#334155'");
    expect(tailwind).toContain("point: '#D6A72A'");
    expect(combined).not.toMatch(/#FFF1B8|#FFD447|#11183A|#10172f|#10183a|#111936|#0d1328|#3957A6|#C9D7FF|#ffd447|#ffe08a/);
    expect(css).toContain('background: #0f172a;');
    expect(css).toContain('color: #f8fafc;');
  });

  it('keeps public sentences direct instead of abstract scene/report fragments', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('app/writing/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('components/wanderer-mini-play.tsx'),
      read('lib/writing-reading-path.ts'),
      readWritingMdx(),
      readdirSync('content/projects').filter((name) => name.endsWith('.mdx')).map((name) => read(`content/projects/${name}`)).join('\n'),
    ].join('\n');

    expect(combined).toContain('안전해 보이는 선택부터 버립니다.');
    expect(combined).toContain('안전해 보이는 10은 왜 먼저 버려졌나');
    expect(combined).toContain('좋은 카드가 아니라 죽지 않을 카드');
    expect(combined).toContain('10은 안전해 보이지만');
    expect(combined).not.toMatch(/같이 볼 글|고른 순간, 승부가 갈립니다|카드를 냈을 때 왜 15가 이기는지|고르면 바로 승부가 갈립니다|장면|감각|붙잡|남깁|둡니다|살핍니다|이어 봅니다|먼저 두고|먼저 보여|목록처럼 읽|게임 밖에서 나온|제작 노트|게임 안에서 나온 기록|선택과 결과가 남은 글|지금 만질/);
  });

  it('keeps detail/list labels from reading like duplicated archive scaffolding', () => {
    const projectsPage = read('app/projects/page.tsx');
    const projectDetail = read('app/projects/[slug]/page.tsx');
    const writingPage = read('app/writing/page.tsx');
    const writingDetail = read('app/writing/[slug]/page.tsx');
    const linksPage = read('app/links/page.tsx');

    expect(projectsPage).not.toMatch(/어디서 시작할지 바로 보이게|카드 다음에는 막대와 선택지/);
    expect(projectsPage).not.toMatch(/안전한 선택이 먼저 틀어집니다|규칙 앞에서 빠집니다/);
    expect(projectsPage).toContain('좋아 보이는 선택도 판이 바뀌면 버립니다.');
    expect(projectDetail).not.toContain('PageHero eyebrow="game"');
    expect(projectDetail).not.toContain('title={<>{game.title}<br />게임 글</>}');
    expect(projectDetail).not.toMatch(/다음에 읽을 것|새 게임 글/);
    expect(projectDetail).toContain('eyebrow="게임"');
    expect(projectDetail).toContain('title={game.title}');
    expect(writingPage).not.toMatch(/text-point">게임 글<\/p>[\s\S]*>\s*게임 글\s*<\/h1>/);
    expect(writingPage).toContain('왜 그 선택을 버렸나');
    expect(writingDetail).not.toMatch(/\{post\.relatedProjects\.map\(\(project\).*\{project\}/);
    expect(linksPage).not.toMatch(/코드와 메모|게임은 사이트에서 먼저 읽히지만/);
  });

  it('keeps pages and articles from restarting every paragraph like separate memo bullets', () => {
    const primaryPages = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
      read('components/project-card.tsx'),
    ].join('\n');
    const articles = [readWritingMdx(), readProjectMdx()].join('\n');

    expect(primaryPages).not.toMatch(/규칙<\/strong><br \/>[\s\S]*선택<\/strong><br \/>[\s\S]*결과<\/strong><br \/>/);
    expect(primaryPages).not.toMatch(/만들고 있는 게임을 짧은 글로 정리했습니다|코드, 아이디어, 연락처를 모았습니다|필요한 링크만 남겼습니다|Wanderer는 지금 바로 해볼 수 있는 카드 게임입니다\. Hanoi와 TRPG는 준비 중입니다/);
    expect(primaryPages).not.toMatch(/대표 게임|다음 게임|게임을 만든 이유|왜 이렇게 만들었는지|기록으로 가기|게임 더 읽기|Wanderer 보기|보기 →|읽기 →/);
    expect(articles).not.toMatch(/## 첫 선택이 게임을 정합니다[\s\S]*## 목록보다 행동|## 작은 판의 힘[\s\S]*## 남길 규칙|## 오래 이어가기 위한 기준[\s\S]*## 다시 돌아오는 방법|## 한 턴이 짧을수록|## 가격을 읽는 순서[\s\S]*## 작은 판단이 모이면/);
    expect(articles).not.toMatch(/Wanderer는 짧게 끝나는 모바일 카드 게임이에요|Hanoi는 하노이 탑 규칙을 바탕으로 만든 퍼즐 게임이에요|Color Hanoi는 하노이 탑 규칙에 색 조건을 더한 퍼즐 변형작이에요|TRPG는 선택에 따라 이야기와 결말이 달라지는 서사 게임입니다/);
    expect(articles).not.toMatch(/이 글은|이 글에서는|기준입니다|기준은|정리했습니다|정리합니다|기록입니다|기록을|문제는|단계|화면/);
    expect(articles).toContain('Wanderer는 오래 버티는 게임이 아니라 한 장을 버리고 한 장을 남기는 게임입니다.');
  });
});
