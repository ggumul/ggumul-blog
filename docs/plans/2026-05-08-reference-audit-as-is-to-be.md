# ggumul-blog reference audit: AS-IS / TO-BE

작성일: 2026-05-08  
대상: `https://ggumul-blog.vercel.app` production QA 결과 + 라이브 레퍼런스 100개 탐색  
목적: 지금 사이트를 “보기는 되지만 아직 읽을 이유가 약한 페이지”에서 “작게 만들고 오래 남기는 작업 아카이브”로 재정렬한다.

## 0. 결론 한 줄

ggumul-blog는 더 화려한 랜딩 페이지가 아니라, **작은 게임과 생활 도구를 실제 제작 흔적 중심으로 쌓는 어두운 개인 작업 아카이브**가 되어야 한다.

레퍼런스는 정체성을 빌리기 위한 것이 아니라 문법을 빌리기 위한 것이다.

- 빌릴 것: archive rhythm, active nav, 링크 affordance, 날짜/상태/유형 메타데이터, 프로젝트-글 연결, 실제 GIF/스크린샷 중심 기록
- 버릴 것: SaaS식 hero, 과장 CTA, 가짜 인터랙티브 데모, 카드만 반복하는 템플릿 구조, 상업 게임 랜딩 톤

---

## 1. 탐색한 레퍼런스 100개

### A. Archive / journal / personal lab — 35

| # | Reference | URL | 핵심 차용점 |
|---:|---|---|---|
| 1 | Maggie Appleton Garden | https://maggieappleton.com/garden | 글의 상태/성장 단계 표시, 디지털 가든형 archive |
| 2 | Simon Willison Weblog | https://simonwillison.net/ | 글 유형 분리, 강한 링크 affordance |
| 3 | Julia Evans | https://jvns.ca/ | 카테고리별 전체 글, 단순하고 명확한 목록 |
| 4 | Bret Victor / WorryDream | https://worrydream.com/ | 긴 시간축, 프로젝트 계보 |
| 5 | Robin Sloan | https://www.robinsloan.com/ | 개인 작업의 디렉터리형 홈 |
| 6 | Are.na Editorial | https://www.are.na/editorial | 절제된 에디토리얼 큐레이션 |
| 7 | Low-tech Magazine Solar | https://solar.lowtechmagazine.com/ | 사이트 철학이 UI에 드러나는 방식 |
| 8 | Craig Mod Essays | https://craigmod.com/essays/ | 제목+부제 중심의 장문 archive |
| 9 | Tiny Projects | https://tinyprojects.dev/ | 작은 프로젝트를 시도/기록으로 남기는 방식 |
| 10 | Ink & Switch Essays | https://www.inkandswitch.com/essay/ | 프로젝트-에세이-연구주제 연결 |
| 11 | Linus Lee / thesephist | https://thesephist.com/ | posts/projects/stream 분리 |
| 12 | kottke.org | https://kottke.org/ | 링크로그 리듬과 오래 쌓인 archive감 |
| 13 | Frank Chimero Blog | https://frankchimero.com/blog/ | 조용한 타이포와 본문 링크 처리 |
| 14 | A Working Library | https://aworkinglibrary.com/ | 읽고 만든 흔적의 라이브러리 톤 |
| 15 | Dan Luu | https://danluu.com/ | 핵심만 남기는 고밀도 제목 목록 |
| 16 | Bartosz Ciechanowski | https://ciechanow.ski/archives/ | 설명 글과 시각/인터랙션의 연결 |
| 17 | Gwern | https://www.gwern.net/ | 깊은 메타데이터, backlinks, 주석 |
| 18 | Adactio Journal | https://adactio.com/journal/ | active nav, 클래식 웹 링크 상태 |
| 19 | Alex Chan | https://alexwlchan.net/ | 글과 작은 도구/프로젝트 연결 |
| 20 | Josh Comeau | https://www.joshwcomeau.com/ | 글 안의 작은 데모/설명 리듬 |
| 21 | Tom MacWright | https://macwright.com/ | writing/projects/notes의 담백한 분리 |
| 22 | Sam Who | https://samwho.dev/blog/ | 기술 설명의 작은 시각 장치 |
| 23 | TodePond | https://www.todepond.com/wikiblogarden/ | wiki/blog/garden 혼합, 실험장 감각 |
| 24 | Dense Discovery Archive | https://www.densediscovery.com/archive/ | issue/date 중심 archive |
| 25 | The Pudding | https://pudding.cool/ | 이야기 있는 결과물 카드 |
| 26 | Observable Blog | https://observablehq.com/blog | 코드/도구 글의 설명 구조 |
| 27 | Increment | https://increment.com/ | 주제 묶음형 에디토리얼 archive |
| 28 | Wait But Why Archive | https://waitbutwhy.com/archive | 시리즈 탐색 구조 |
| 29 | Ribbonfarm | https://www.ribbonfarm.com/ | 장문 시리즈/연재 archive |
| 30 | Interconnected | https://interconnected.org/home/ | 짧은 메모와 긴 글이 섞이는 흐름 |
| 31 | Benedict Evans | https://www.ben-evans.com/benedictevans | 글 목록의 스캔성 |
| 32 | LukeW | https://www.lukew.com/ff/ | 긴 시간축을 유지하는 archive |
| 33 | Matthew Ström Writing | https://matthewstrom.com/writing/ | 현대적 미니멀 글 목록 |
| 34 | Stacking the Bricks Archive | https://stackingthebricks.com/archive/ | 시행착오를 글 자산으로 쌓는 구조 |
| 35 | The History of the Web | https://thehistoryoftheweb.com/ | 연대기형 기록 구조 |

### B. Indie game / devlog / creative project — 35

| # | Reference | URL | 핵심 차용점 |
|---:|---|---|---|
| 36 | Lucas Pope / Dukope | https://dukope.com/ | 작품별 날짜, 빌드, devlog 링크가 쌓이는 구조 |
| 37 | Pippin Barr | https://www.pippinbarr.com/ | 실험 게임을 작품+아이디어+상태로 기록 |
| 38 | Nicky Case | https://ncase.me/ | Play/Read/Watch 같은 방문 목적별 분류 |
| 39 | Alienmelon | https://alienmelon.itch.io/ | 이상하고 작은 작업도 독립 작품으로 보관 |
| 40 | Increpare | https://increpare.com/ | 작고 자주 만든 흔적의 누적감 |
| 41 | Bennett Foddy | https://www.foddy.net/ | 게임별 짧고 명확한 소개 |
| 42 | Kitty Horrorshow | https://kittyhorrorshow.itch.io/ | 어두운 무드와 작품 독립성 |
| 43 | Daniel Linssen / Managore | https://managore.itch.io/ | 작은 게임잼 결과물 카드 그리드 |
| 44 | Distractionware Blog | https://distractionware.com/blog/ | 개발자 목소리와 근황 기록 |
| 45 | Crows Crows Crows | https://crowscrowscrows.com/ | 작품 세계관을 사이트 톤으로 확장 |
| 46 | Playdate | https://play.date/ | 작은 게임 카탈로그 감각 |
| 47 | Hempuli | https://hempuli.com/ | 긴 시간축의 개인 제작자 archive |
| 48 | Molleindustria | https://molleindustria.org/ | 게임을 맥락/메시지와 함께 설명 |
| 49 | Sokpop Collective | https://sokpop.co/ | 다작 프로젝트 썸네일 그리드 |
| 50 | Cardboard Computer | https://cardboardcomputer.com/ | 여백과 미스터리를 남기는 작품 소개 |
| 51 | Simogo | https://simogo.com/ | 프로젝트별 독립 시각 언어 |
| 52 | Dinosaur Polo Club | https://dinopoloclub.com/ | 게임 시리즈를 체계적으로 묶는 구조 |
| 53 | Firewatch | https://www.firewatchgame.com/ | 대표작 상세의 미디어/스토리 구조 |
| 54 | Tender Claws | https://tenderclaws.com/ | 게임·도구·실험을 한 세계 안에 묶기 |
| 55 | Die Gute Fabrik | https://gutefabrik.com/ | 제작 철학과 작품 맥락 연결 |
| 56 | Amanita Design | https://amanita-design.net/ | 작품 썸네일의 개성, 즐거운 카탈로그 |
| 57 | Strange Scaffold | https://strangescaffold.com/ | 다작 프로젝트의 선명한 구분 |
| 58 | Finji | https://finji.co/ | 다양한 작품을 정돈된 카드로 분류 |
| 59 | Factorio Blog | https://www.factorio.com/blog/ | 변경 이유, 전후, 기술 설명이 있는 devlog |
| 60 | Yacht Club Games Blog | https://www.yachtclubgames.com/blog/ | 업데이트/패치/메이킹의 한 흐름 |
| 61 | ConcernedApe Blog | https://www.concernedape.com/blog/ | 1인 개발자의 직접적 목소리 |
| 62 | Team Cherry Blog | https://www.teamcherry.com.au/blog/ | 스크린샷/GIF와 제작 서사 연결 |
| 63 | LocalThunk | https://www.localthunk.com/ | 극도로 단순한 개인 제작자 정체성 페이지 |
| 64 | Zachtronics | https://www.zachtronics.com/ | 시스템적 게임을 명료하게 소개 |
| 65 | Playdead INSIDE | https://www.playdead.com/games/inside/ | 어두운 여백과 극도의 절제 |
| 66 | Caves of Qud | https://www.cavesofqud.com/ | 장기 개발 게임의 업데이트 누적 |
| 67 | Lexaloffle BBS | https://www.lexaloffle.com/bbs/ | 작은 playable toy를 피드처럼 보여주는 구조 |
| 68 | Nano Pesos | https://nanopesos.itch.io/ | 소규모 실험작 공개 방식 |
| 69 | Klei Games | https://www.klei.com/games | 여러 작품을 한눈에 구분하는 썸네일 시스템 |
| 70 | Tale of Tales | https://tale-of-tales.com/ | 작품과 글, 철학을 함께 보관 |

### C. Changelog / docs / project index — 30

| # | Reference | URL | 핵심 차용점 |
|---:|---|---|---|
| 71 | Linear Changelog | https://linear.app/changelog | 다크 미니멀, 날짜별 긴 변경 기록 |
| 72 | GitHub Changelog | https://github.blog/changelog/ | 월별 묶음, 유형 배지, 명확한 타임라인 |
| 73 | Vercel Changelog | https://vercel.com/changelog | 블로그와 변경 기록의 연결 |
| 74 | Supabase Changelog | https://supabase.com/changelog | 태그, 복사 가능한 기록, anchor heading |
| 75 | Cloudflare Docs Changelog | https://developers.cloudflare.com/changelog/ | 제품별 필터, docs 내부 기록 구조 |
| 76 | Stripe Changelog | https://docs.stripe.com/changelog | 변경사항 → 영향 → 조치 구조 |
| 77 | GitHub Docs | https://docs.github.com/en | breadcrumbs, 문서/가이드/레퍼런스 분리 |
| 78 | MDN Web Docs | https://developer.mozilla.org/en-US/docs/Web | 짧은 설명이 붙은 링크 directory |
| 79 | shadcn/ui Docs | https://ui.shadcn.com/docs | active sidebar, 섹션 그룹, New badge |
| 80 | Radix Themes Docs | https://www.radix-ui.com/themes/docs/overview/getting-started | demo와 문서 병렬 구조 |
| 81 | Storybook Docs | https://storybook.js.org/docs | 초보자 경로와 레퍼런스 경로 분리 |
| 82 | Next.js Blog | https://nextjs.org/blog | release detail의 highlights 구조 |
| 83 | Tailwind CSS Blog | https://tailwindcss.com/blog | preview 이미지와 간결한 excerpt |
| 84 | Astro Blog | https://astro.build/blog/ | 태그/카테고리형 친근한 카드 |
| 85 | Svelte Blog | https://svelte.dev/blog | 단순 날짜순 archive |
| 86 | Deno Blog | https://deno.com/blog | 글 유형 배지와 카드 요약 |
| 87 | Bun Blog | https://bun.sh/blog | dark high-contrast release detail |
| 88 | Prisma Upgrade Guides | https://www.prisma.io/docs/orm/more/upgrade-guides | before/after migration checklist |
| 89 | PostHog Changelog | https://posthog.com/changelog | 작은 개선도 기록하는 문화 |
| 90 | Cal.com Changelog | https://cal.com/changelog | 빠르게 스캔되는 업데이트 카드 |
| 91 | Raycast Changelog | https://www.raycast.com/changelog | 버전/날짜별 릴리즈와 앱 스크린샷 |
| 92 | Notion Releases | https://www.notion.com/releases | 비개발자도 이해하는 업데이트 설명 |
| 93 | Framer Updates | https://www.framer.com/updates/ | 시각적 카드 affordance |
| 94 | Figma Release Notes | https://www.figma.com/release-notes/ | 사용 사례 중심 변경 설명 |
| 95 | Docker Release Notes | https://docs.docker.com/release-notes/ | 제품/도구별 기록 보관소 |
| 96 | Tailscale Changelog | https://tailscale.com/changelog | 플랫폼/도구별 태그 |
| 97 | Plausible Changelog | https://plausible.io/changelog | 신뢰감 있는 간단한 변경 기록 |
| 98 | Obsidian Changelog | https://obsidian.md/changelog/ | Improvements / Bug fixes 구분 |
| 99 | Ghost Changelog | https://ghost.org/changelog/ | 변경 기록도 읽을거리로 만드는 방식 |
| 100 | Vite Blog | https://vite.dev/blog/ | major release와 소소한 패치 구분 |

---

## 2. 현재 AS-IS

### 2.1 production 상태

| 항목 | AS-IS |
|---|---|
| 배포/라우팅 | 주요 16개 route HTTP 200. `/`, `/projects`, `/writing`, `/about`, `/links`, 주요 상세 페이지 정상 접근. |
| 콘솔 오류 | 확인한 주요 페이지에서 JS console error/message 0개. |
| 미디어 | Wanderer GIF 정상 로드. 본문 사건과 이미지 관계도 대체로 맞음. |
| 문제 성격 | 기능 장애가 아니라 정보 구조/읽기 흐름/링크성/문장 결 문제. |

### 2.2 정보 구조 AS-IS

| 영역 | 현재 상태 | 문제 |
|---|---|---|
| Home | 작은 게임/글/프로젝트를 보여주지만 첫 화면의 이유가 약함 | “왜 여기서 읽어야 하는가”보다 “페이지가 있다”에 가까움 |
| Projects | 프로젝트 카드들이 비슷한 리듬으로 나열됨 | 게임/도구/실험/보관 상태의 차이가 잘 안 드러남 |
| Writing | 제목은 `날짜순으로 모았습니다.`인데 실제 체감은 분류/묶음형 | 제목과 구조가 불일치해서 신뢰감이 떨어짐 |
| Detail | Wanderer 글은 GIF와 본문 사건이 맞음 | 관련 프로젝트/다음 글/태그의 링크성이 약함 |
| Header/Footer | 메뉴는 있지만 현재 위치 표시가 약함 | 사용자가 지금 어느 섹션에 있는지 덜 분명함 |
| Cards/Links | 클릭 가능한 요소가 시각적으로 조용함 | 스캔 중 어디를 눌러야 할지 약함 |

### 2.3 브랜드 표현 AS-IS

| 항목 | 현재 상태 | 문제 |
|---|---|---|
| 정체성 | 느리게 꾸준히 만드는 꼬물의 의미가 일부 반영됨 | 페이지 구조가 그 의미를 충분히 증명하지 못함 |
| 문장 | 과하게 나쁘진 않지만 설명형 문장이 많음 | 실제 만든 흔적보다 설명이 먼저 보이면 얕아짐 |
| 콘텐츠 증거 | Wanderer GIF는 좋은 방향 | 모든 페이지가 같은 대표 사건만 반복하면 오히려 역할이 무너짐 |
| CTA | 직접 조작/체험 CTA는 현재 강하지 않음 | 앞으로도 fake demo 방향은 피해야 함 |

---

## 3. 목표 TO-BE

### 3.1 사이트 포지션

| 축 | TO-BE |
|---|---|
| 정체성 | 작게 만들고, 고치고, 남기는 개인 작업 아카이브 |
| 핵심 콘텐츠 | 작은 게임, 생활 도구, 제작 기록, 실제 GIF/스크린샷, 변경 이유 |
| 방문자 경험 | “뭐 하는 곳인지”보다 “무엇을 만들었고 어떻게 이어졌는지”가 먼저 보임 |
| 시각 톤 | dark minimal + 얇은 구분선 + 밀도 있는 목록 + 가끔 강한 미디어 |
| 문장 톤 | 과장 없는 한국어. 작업장/기록장 느낌. 선언보다 흔적. |

### 3.2 페이지별 TO-BE

| 페이지 | AS-IS | TO-BE |
|---|---|---|
| `/` Home | 사이트 소개와 목록이 있으나 강한 첫 이유가 약함 | `최근 남긴 흔적`을 가장 먼저 보여주고, 그 아래 `만들고 있는 것들`, `최근 글`, `오래된 기록`으로 흐르게 함 |
| `/projects` | 프로젝트 카드 나열 | `게임`, `생활 도구`, `실험/보관`으로 분리. 각 항목에 상태, 마지막 업데이트, 관련 글 수, 대표 미디어 유무 표시 |
| `/writing` | 제목과 실제 구조 불일치 | 선택지 1: 진짜 날짜순 타임라인. 선택지 2: `만들면서 남긴 글` + 주제별 묶음. 제목과 구조를 반드시 일치 |
| `/projects/[slug]` | 프로젝트 설명과 관련 글 연결은 있으나 링크성이 약함 | `무엇인가 → 지금 어디까지 왔나 → 대표 장면 → 관련 기록 → 변경 흐름` 순서 |
| `/writing/[slug]` | 본문 사건과 GIF 관계는 좋음 | `관련 프로젝트`, `다음 글`, `태그`를 더 클릭 가능하게. 글 말미에 “이 글이 어느 프로젝트 흔적인지” 명확히 |
| `/about` | 정체성 설명 페이지 | 꼬물 이름의 뜻과 오래 만드는 태도를 짧게. 포부보다 실제 운영 원칙 중심 |
| `/links` | 외부 링크 정리 | GitHub/Notion/Mail의 쓰임을 짧고 명확히. 설명 반복 제거 |

---

## 4. 레퍼런스에서 뽑은 구조 원칙

### 4.1 Archive rhythm

참고: Maggie Appleton, Simon Willison, Julia Evans, Dukope, GitHub Changelog

TO-BE 규칙:

- 목록 항목은 `날짜 / 유형 / 제목 / 한 줄 설명 / 관련 프로젝트`를 가진다.
- 날짜순이면 진짜 날짜순이어야 한다.
- 주제별이면 제목부터 주제별이라고 말한다.
- 최근 항목을 뽑아놓았다면 바로 아래에서 같은 카드를 같은 형태로 반복하지 않는다.

### 4.2 Project index

참고: Dukope, Pippin Barr, Raycast Changelog, Deno Blog, Finji

TO-BE 규칙:

- 프로젝트 카드는 모두 같은 모양이어도 내용의 위계는 달라야 한다.
- 게임과 생활 도구를 같은 말로 포장하지 않는다.
- 각 프로젝트에는 다음 메타데이터를 둔다.
  - type: `game | tool | experiment | archived`
  - status: `making | playable | paused | archived`
  - lastUpdated
  - relatedPosts count
  - primaryEvidence: GIF/image/video 여부

### 4.3 Detail page

참고: Factorio Blog, Stripe Changelog, Supabase Changelog, Team Cherry Blog

TO-BE 규칙:

- 상세 페이지는 선언보다 사건 순서로 읽혀야 한다.
- 기본 템플릿:
  1. 무엇인가
  2. 왜 만들었나
  3. 지금 어디까지 왔나
  4. 대표 장면 / 실제 화면
  5. 관련 기록
  6. 다음에 손댈 것
- 변경 기록이 있으면 `Added / Changed / Fixed / Paused` 같은 유형 배지를 쓴다.

### 4.4 Link affordance

참고: Simon Willison, Adactio, GitHub Changelog, shadcn/ui

TO-BE 규칙:

- 본문 링크는 밑줄 또는 색 대비를 확실히 둔다.
- 카드 전체가 클릭 가능하면 hover에서 배경/테두리/화살표 중 최소 하나가 변해야 한다.
- 현재 페이지 nav는 반드시 active 상태가 있어야 한다.
- 외부 링크는 외부임을 작게 표시한다.

### 4.5 Visual grammar

참고: Linear, Raycast, Playdead, Obsidian, Low-tech Magazine Solar

TO-BE 규칙:

- dark minimal을 유지하되, 모든 것을 둥근 카드로 해결하지 않는다.
- 구조별 표현을 분리한다.
  - latest trace: 넓은 editorial slab
  - project list: compact workline/card hybrid
  - writing archive: 날짜가 보이는 timeline/list
  - detail media: 캡션 분리
- 꾸밈보다 구분선, 타이포 크기, 여백, hover 상태로 품질을 만든다.

---

## 5. 구체 AS-IS → TO-BE 매트릭스

| 문제 | AS-IS | TO-BE | 우선순위 |
|---|---|---|---|
| 글 목록 제목 불일치 | `/writing`이 `날짜순`이라고 말하지만 실제 구조와 체감이 다름 | 제목을 구조에 맞추거나 실제 날짜순 타임라인으로 변경 | P0 |
| 링크성 약함 | 카드/관련 링크가 조용해서 클릭 지점이 약함 | hover, underline, arrow, active state 도입 | P0 |
| 현재 위치 약함 | nav active 없음 | route 기반 active nav 추가 | P0 |
| 프로젝트 구분 약함 | 게임/도구/실험이 비슷한 카드로 보임 | type/status/lastUpdated/relatedPosts 메타데이터 표시 | P1 |
| Home 첫 이유 약함 | 소개와 목록이 병렬로 놓임 | 최신 제작 흔적을 첫 화면의 주인공으로 배치 | P1 |
| 카드 리듬 단조로움 | 모든 목록이 비슷한 박스 | latest slab / workline / timeline / compact related list로 분리 | P1 |
| 상세 하단 연결 약함 | 관련 프로젝트/다음 글이 링크처럼 덜 보임 | related section을 명확한 링크 리스트로 재구성 | P1 |
| 대표 사건 반복 위험 | Wanderer 10/15 사건이 여러 페이지에 반복될 수 있음 | 홈/목록/상세/글 상세의 역할을 분리. 깊은 사건은 해당 글에만 배치 | P1 |
| 문장 설명 과다 위험 | 정체성을 설명으로 풀 가능성 | 선언보다 실제 기록/장면/변경 이유를 먼저 보여줌 | P2 |
| changelog 부재 | 작은 변경이 별도 콘텐츠로 쌓이지 않음 | 프로젝트별 `변경 흐름` 또는 site-wide `records` 도입 검토 | P2 |

---

## 6. 구현 제안 순서

### Round 1 — 읽기 신뢰 회복

목표: 지금 production의 QA 문제를 빠르게 고친다.

- `/writing` 제목과 구조 일치
- header active nav
- 카드/글/관련 링크 hover와 affordance
- header/footer 메뉴 순서 통일
- 프로젝트 설명 문구 1차 정리

완료 조건:

- `npm test -- --run`
- `npm run build`
- local browser 확인: `/`, `/projects`, `/writing`, `/projects/wanderer`, `/writing/wanderer-one-card`
- production 배포 후 같은 route smoke + 콘솔 확인

### Round 2 — archive 구조 재정렬

목표: 사이트가 “작업 아카이브”처럼 읽히게 한다.

- content helper 추가
  - latest trace
  - project worklines
  - writing timeline
  - project ↔ post relationship
- 프로젝트 metadata 보강
  - type/status/lastUpdated/relatedPosts/primaryEvidence
- 홈 구조 변경
  - latest trace → worklines → recent writing → small about
- `/projects`를 game/tool/experiment/archived로 분리
- `/writing`을 timeline 또는 topic archive 중 하나로 확정

완료 조건:

- helper 단위 테스트 추가
- list 중복 노출 방지 테스트
- 모바일 폭 overflow 없음 확인

### Round 3 — detail page evidence 강화

목표: 각 상세가 “무슨 일이 있었는지”로 읽히게 한다.

- 프로젝트 상세 템플릿 재구성
- 글 상세 하단 관계 링크 강화
- GIF/image caption 스타일 분리
- Wanderer 외 프로젝트도 각자 다른 대표 근거를 갖게 함
- changelog/records 도입 여부 결정

완료 조건:

- Wanderer만 과대표현되지 않음
- 각 페이지가 서로 다른 역할을 함
- production에서 실제 미디어 로딩 확인

---

## 7. 하지 말 것

- 상업 게임 랜딩처럼 만들지 않는다.
- “지금 바로 플레이” 같은 CTA를 억지로 만들지 않는다.
- 실제 런타임 자료 없는 mockup/demo를 넣지 않는다.
- 모든 섹션을 카드로만 해결하지 않는다.
- Notion 내부 문장을 public copy로 그대로 옮기지 않는다.
- Wanderer 한 사건을 홈/목록/상세/글 상세에 반복해서 증거처럼 쓰지 않는다.
- 레퍼런스 사이트의 브랜드 색/폰트/일러스트를 그대로 베끼지 않는다.

---

## 8. 최종 TO-BE 문장

> ggumul은 작게 만들고 오래 고치는 작업을 남기는 곳이다.  
> 게임과 도구는 완성품처럼 포장하기보다, 실제로 고친 장면과 그때의 판단으로 읽히게 한다.  
> 방문자는 “멋진 랜딩 페이지”가 아니라 “이 사람이 계속 만들고 있구나”를 느껴야 한다.
