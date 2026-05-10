# ggumul-blog 글 투고 원칙: Notion first

꼬물 블로그의 공개 글은 MDX 파일을 먼저 쓰지 않는다. 먼저 Notion에 초고를 투고하고, 그 초고를 검토한 뒤 production MDX로 옮긴다.

## 왜 이렇게 운영하는가

- 블로그가 즉흥 MDX 수정으로 흘러가면 공개 문구가 내부 작업 보고서처럼 변한다.
- Notion 초고는 글의 사건, 독자가 볼 장면, 공개해도 되는 표현을 먼저 분리하는 검토 지점이다.
- production MDX는 배포 산출물이고, Notion은 초고/검토의 원본이다.

## 새 글 작성 순서

1. Notion에 `[초고/<프로젝트>] <제목>` 형식의 페이지를 먼저 만든다.
2. Notion 본문에 최소한 아래 항목을 쓴다.
   - 이 글이 다루는 한 사건
   - 독자/플레이어가 실제로 볼 장면
   - 공개 글에서 빼야 할 내부 확인 문구
   - MDX로 옮길 때 남길 문장
3. MDX 파일을 만들 때 frontmatter에 `notionSource`를 반드시 추가한다.
4. `npm test`로 Notion 출처 검증을 통과한 뒤에만 배포한다.

## MDX frontmatter 필수 형식

```yaml
notionSource:
  pageId: 35a521c1-5180-81e7-8f6d-d81fc3f21648
  url: https://www.notion.so/Wanderer-35a521c1518081e78f6dd81fc3f21648
  title: "[초고/Wanderer] 조건은 단순했는데, 실제 턴은 생각보다 빨리 줄었다"
  status: 초안
```

## 금지

- Notion 초고 없이 `content/writing/*.mdx`를 바로 추가하지 않는다.
- 없는 Notion 페이지 ID나 임의 URL을 넣지 않는다.
- Notion의 내부 관찰 로그를 그대로 공개 본문에 복사하지 않는다.
- `실제 GIF 없음`, `검증`, `로컬 WAS`, `Simulator`, `테스트 통과` 같은 내부 확인 문구를 첫 화면/카드/요약의 근거처럼 쓰지 않는다.

## 검증

```bash
npm test
npm run build
```

`tests/content.test.ts`는 모든 공개 writing entry가 Notion 초고 출처를 갖는지 검사한다.
