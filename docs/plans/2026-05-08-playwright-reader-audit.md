# Playwright reader audit — local copy reset

작성일: 2026-05-08  
대상: local build `http://127.0.0.1:3010`  
산출물: `/tmp/ggumul-local-reader-audit/`

## 1. 확인한 화면

Playwright로 desktop/mobile 각각 캡처했다.

- `/` → `/tmp/ggumul-local-reader-audit/desktop-home.png`, `/tmp/ggumul-local-reader-audit/mobile-home.png`
- `/writing` → `/tmp/ggumul-local-reader-audit/desktop-writing.png`, `/tmp/ggumul-local-reader-audit/mobile-writing.png`
- `/projects` → `/tmp/ggumul-local-reader-audit/desktop-projects.png`, `/tmp/ggumul-local-reader-audit/mobile-projects.png`
- `/projects/wanderer` → `/tmp/ggumul-local-reader-audit/desktop-projects_wanderer.png`, `/tmp/ggumul-local-reader-audit/mobile-projects_wanderer.png`
- `/writing/wanderer-one-card` → `/tmp/ggumul-local-reader-audit/desktop-writing_wanderer-one-card.png`, `/tmp/ggumul-local-reader-audit/mobile-writing_wanderer-one-card.png`
- `/about` → `/tmp/ggumul-local-reader-audit/desktop-about.png`, `/tmp/ggumul-local-reader-audit/mobile-about.png`
- `/links` → `/tmp/ggumul-local-reader-audit/desktop-links.png`, `/tmp/ggumul-local-reader-audit/mobile-links.png`

## 2. 결론

이번 로컬 수정은 문장을 조금 낫게 만든 정도다. 사용자가 말한 것처럼, 사람이 읽고 싶어지는 수준으로 해결된 상태가 아니다.

문제는 문장 몇 개가 아니라 **페이지 문법**이다.

현재 화면은 대체로 다음처럼 읽힌다.

- 홈: “최근 글과 프로젝트가 있는 블로그”라는 정보는 보이나, 왜 따라 읽어야 하는지 약하다.
- 글 목록: 날짜순이라고 말하지만, 실제로는 카테고리 섹션과 반복 링크가 앞선다.
- 프로젝트 목록: 사람이 쓴 소개라기보다 카드형 대시보드다.
- 프로젝트 상세: Wanderer 한 사건은 선명하지만, 페이지가 해당 프로젝트의 시간축/현재 상태를 충분히 말하지 않는다.
- 글 상세: 본문은 괜찮지만, 메타 칩/사이드바/태그/다음 글 템플릿이 글보다 먼저 보인다.
- about/links: 기능은 하지만 전체 사이트의 읽을 이유를 강화하지 못한다.

## 3. Playwright visible text 기준 문제

### `/`

첫 3줄:

```text
꼬물
최근 글부터 둡니다.
작은 게임과 생활 도구를 만들며 쓴 글을 모아 둔 블로그입니다. 카드 규칙을 줄이고, 원반 퍼즐을 다시 만지고, 저녁 재료를 나눈 일이 날짜순으로 이어집니다.
```

문제:

- `최근 글부터 둡니다.`는 배열 방식 설명이다. 독자에게 읽을 이유를 주지 않는다.
- 카드 규칙/원반 퍼즐/저녁 재료의 공통점이 설명되지 않아 처음 보는 사람에게는 조각난 소재처럼 보인다.
- 홈이 레퍼런스의 `latest trace`가 아니라 “소개 + 최근글 + 프로젝트 목록”의 일반 블로그 홈으로 남아 있다.

### `/writing`

첫 3줄:

```text
글
날짜순으로 고친 것들.
세 장짜리 카드 턴, 11 이하 조건 카드, 김치찌개 재료처럼 실제로 고친 부분을 날짜순으로 둡니다. 프로젝트 설명보다 먼저 그날 바뀐 것이 보이게 했습니다.
```

문제:

- `날짜순`이라고 말하지만 실제 화면은 `게임 / 카드와 퍼즐`, `생활 도구 / 저녁을 고른 뒤`로 섹션화되어 있다.
- 레퍼런스 원칙 4.1의 “날짜순이면 진짜 날짜순이어야 한다”를 아직 어긴다.
- `글로 이동 →`가 반복되어 시스템 UI처럼 읽힌다.

### `/projects`

첫 5줄:

```text
지금 손대는 것들.
조건에 맞는 카드를 고르는 모바일 게임, 원반을 옮기는 퍼즐, 저녁 재료를 나누는 도구를 둡니다. 각 항목에는 실제로 이어지는 글만 붙였습니다.
게임
작은 게임들
Wanderer, Hanoi, Color Hanoi, TRPG를 따로 둡니다.
```

문제:

- `둡니다` 반복이 내부 관리 화면 문장처럼 느껴진다.
- “실제로 이어지는 글”의 의미가 애매하다.
- `지금 손대는 것들`인데 status/lastUpdated/relatedPosts/primaryEvidence가 안 보여 지금성이 약하다.
- 게임/도구/실험의 차이가 카드 내용으로 드러나지 않는다.

### `/projects/wanderer`

문제:

- Wanderer는 가장 낫다. 실제 장면이 있고, 11 이하 조건 사건이 구체적이다.
- 다만 홈/프로젝트/글 상세에서 같은 사건을 계속 쓰면 “대표 근거”가 아니라 “반복 설명”으로 보인다.
- 프로젝트 상세는 `무엇인가 → 지금 어디까지 왔나 → 대표 장면 → 관련 기록 → 다음에 손댈 것`이어야 하는데, 현재는 대표 장면과 관련 글만 있다.

### `/writing/wanderer-one-card`

문제:

- 본문 자체는 읽을 만하다.
- 하지만 `글 목록으로 / Wanderer / Wanderer 글 / 날짜 / 제목 / 요약 / 관련 프로젝트 / 이 글에서 보는 것 / #카드 #턴 #규칙 / 다음 글 / 다음에 읽을 이야기`가 앞뒤를 감싼다.
- `이 글에서 보는 것`은 목차처럼 보이는데 실제로는 태그다. 기대와 정보가 어긋난다.
- 제목과 요약은 조건 카드 이야기인데 본문 첫 문장에서 `승패 문장`이 갑자기 등장한다.

## 4. 레퍼런스 감사 문서와 재대조

기존 100개 레퍼런스 문서의 핵심은 이미 맞았다.

- line 13: `archive rhythm`, `날짜/상태/유형 메타데이터`, `프로젝트-글 연결`, `실제 GIF/스크린샷 중심 기록`
- line 14: `카드만 반복하는 템플릿 구조` 버리기
- line 178: 방문자는 “무엇을 만들었고 어떻게 이어졌는지”가 먼저 보여야 함
- line 204~207: 목록 항목은 `날짜 / 유형 / 제목 / 한 줄 설명 / 관련 프로젝트`, 날짜순이면 진짜 날짜순
- line 215~222: 프로젝트 카드에 `type/status/lastUpdated/relatedPosts/primaryEvidence`
- line 230~237: 상세 페이지는 선언보다 사건 순서
- line 257~262: 모든 것을 둥근 카드로 해결하지 말고 구조별 표현 분리
- line 314~317: 홈 구조 변경, `/projects` metadata 보강, `/writing` 구조 확정

즉 지금 해야 할 일은 카피 수정이 아니라 문서의 Round 2/3을 실제 구현하는 것이다.

## 5. 구조 재설계 범위

### P0 — 목록 문법을 먼저 바꾼다

1. `lib`에 작업 기록 view model을 만든다.
   - post + project를 묶어 `trace`로 본다.
   - 필드: `date`, `type`, `project`, `title`, `summary`, `status`, `evidence`, `href`.
2. `/writing`을 진짜 날짜순 timeline으로 바꾼다.
   - 카테고리 섹션을 제거한다.
   - 각 줄은 `date / project / type / title / summary`로 간다.
3. 홈은 `latest trace`를 한 덩어리로 보여준다.
   - 단순 “최근 글” 목록이 아니라 최근 작업 하나를 크게 보여주고, 그 아래 짧은 흐름을 둔다.

### P1 — 프로젝트 인덱스를 대시보드에서 작업 목록으로 바꾼다

1. 프로젝트 메타데이터 추가:
   - `type`, `status`, `lastUpdated`, `relatedPostsCount`, `primaryEvidence`.
2. `/projects` 카드에서 상태와 마지막 작업을 먼저 보이게 한다.
3. `프로젝트로 이동`, `글로 이동` 반복 문구를 줄인다.
4. 생활 도구는 2열 빈 카드 그리드가 아니라 1열 workline 또는 compact row로 둔다.

### P2 — 상세 페이지 템플릿 냄새를 줄인다

1. `/writing/[slug]`
   - 상단 메타 칩은 축소한다.
   - `이 글에서 보는 것`은 실제 목차형 bullet로 만들거나 `태그`로 낮춘다.
   - `다음 글 / 다음에 읽을 이야기` 중복 라벨 제거.
2. `/projects/[slug]`
   - `무엇인가 → 지금 어디까지 왔나 → 대표 장면 → 관련 기록 → 다음에 손댈 것` 순서로 재구성한다.
3. Wanderer 11 이하 사건은 관련 상세 글에 깊게 두고, 홈/목록에서는 반복하지 않는다.

## 6. 이번 라운드에서 바로 고칠 대상

사용자 지적 기준으로는 다음 순서가 맞다.

1. `/writing` 날짜순 timeline 구조 변경
2. `/projects` status/lastUpdated/evidence 기반 인덱스 변경
3. `/` latest trace 중심 홈 변경
4. `/writing/[slug]` 구조 라벨 정리
5. `/projects/[slug]` 프로젝트 상세 구조 변경

문장만 조금 바꾸는 작업은 중단해야 한다.
