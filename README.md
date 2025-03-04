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
관리자 페이지에서 사용자 및 캠페인을 효율적으로 관리할 수 있도록 하는 것이 목표입니다.

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
- 백엔드 API가 완성되기 전에도 UI 개발 및 테스트가 가능하도록 MSW를 활용하여 Mock API를 구현
- 다양한 API 응답을 시뮬레이션하여 예외 처리 로직 테스트 강화
  - 정상적인 데이터 응답뿐만 아니라, 400/500 에러 응답을 설정하여 에러 핸들링 시나리오 검증 가능  
- 네트워크 요청을 가로채기 때문에 실제 API 요청을 보내지 않고도 개발 가능
  - API 요청 시 MSW가 응답을 가로채어 `fetch` 또는 `axios`를 사용하는 방식과 동일한 개발 경험 제공  
  - 실서버와 동일한 방식으로 데이터를 주고받을 수 있어 API 통합 테스트에도 활용 가능  


### ✅ Chakra UI와 Emotion 활용
  - 일관된 디자인을 유지하면서 빠르게 스타일링할 수 있도록 작업

### ✅ Recoil을 활용한 상태 관리
  - atom을 사용하여 전역 상태를 관리 (사용자 권한 상태 (roleState), 에러 상태 (errorState))

### ✅ Git 전략 & 커밋 컨벤션
  - 의미있는 커밋 메시지 작성(feat:, fix:, chore: 등)
  - 브랜치 전략을 활용하여 협업을 고려한 개발 (master, develop, feature/)
