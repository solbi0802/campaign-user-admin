## 실행 방법 (로컬)

1. 레포지토리 clone

   ```
   git clone https://github.com/solbi0802/campaign-user-admin.git
   ```
2. npm 설치

   ```
   npm install
   ```
3. 로컬에서 실행

   ```
   npm run dev
   ```
4. http://localhost:5137 접속
   
## 개발 환경
- React, Typescript, Vite, React Router (라우팅 처리)
- 상태 관리: Recoil
- Mock API 구현: [MSW(Mock Service Worker)](https://mswjs.io)
- Data Fetching: Fetch API 
- UI 라이브러리: [Chakra UI](https://chakra-ui.com)
- 스타일 관리: [Emotion](https://emotion.sh/docs/introduction)

## 기능 구현
- [x] GNB
   - 사용자 권한에 따라 다른 메뉴 노출 (admin, viewer, manager)
- [x] 캠페인 관리
- [x] 사용자 관리
- [x] 사용자 관리 > 생성
- [x] 사용자 관리 > 수정
- [x] 에러 발생시 처리: API 에러 발생 시 ErrorAlert가 뜨도록 처리

## 프로젝트 목적
관리자가 캠페인 및 사용자 데이터를 직관적으로 관리할 수 있도록 하는 것이 목표입니다.
- 사용자 권한(role)에 따라 접근 가능한 메뉴를 동적으로 설정하여 보안성을 강화
- 사용자 및 캠페인 데이터를 생성/수정할 수 있는 기능 제공
- 에러 발생 시 즉각적인 Alert 메시지를 띄워 사용자 경험 개선

## 기술 스택 & 라이브러리 선택 이유
- React & Typescript: 컴포넌트 기반 개발을 통한 유지 보수성을 향상하고 타입 안정성을 고려해서 선택했습니다.
- MSW: 백엔드 API 없이도 UI 개발이 가능하고 API 응답을 자유롭게 설정할 수 있어 다양한 테스트가 가능해서 선택했습니다.
- Recoil: 전역 상태 관리를 간결하고 효율적으로 하기 위해 선택했습니다.
- Chakra UI + Emotion: 일관된 디자인 시스템 유지하고 반응형 디자인 적용을 위해 Chakra UI를 사용했고, 스타일 커스터마이징이 필요할 때 Emotion을 활용하기 위해 선택했습니다.

## 개발시 고려한 사항

### ✅ 유지보수성과 확장성을 고려한 코드 구조
   - 컴포넌트 분리: UI 요소를 `components/`에 정리
   - 재사용성 높이기: 2번이상 사용되는 컴포넌트는 `components/common`에 정리
   - 커스텀 훅 사용: `hooks/userFormHook.ts`에 사용자 생성/수정 폼 데이터 관리
   - 공통 함수 정리: `utils/`에 숫자 포맷팅, 날짜 변환 등 유틸 함수 관리

### ✅ MSW(Mock Service Worker)로 API Mocking 설정
  - `mocks/handler`에서 사용자/캠페인 API 모킹
  -  `main.ts`에서 worker.start()를 실행해 개발 환경에서 MSW를 활성화
  - fetch 요청 시 실제 API 호출 없이도 데이터 응답을 받아 UI 개발이 가능하게 함

### ✅ Chakra UI와 Emotion 활용
  - 일관된 디자인을 유지하면서 빠르게 스타일링할 수 있도록 작업

### ✅ Recoil을 활용한 상태 관리
  - atom을 사용하여 전역 상태를 관리 (사용자 권한 상태 (roleState), 에러 상태 (errorState))

### ✅ Git 전략 & 커밋 컨벤션
  - develop 브랜치를 기준으로 개발 진행, feature/ 브랜치에서 개별 기능 구현 후 merge
  - PR을 통해 코드 리뷰를 진행하고, master 브랜치에 직접 merge하지 않도록 관리
