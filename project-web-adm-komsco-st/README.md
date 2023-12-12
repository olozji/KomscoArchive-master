# PROJECT-STRUCTURE

- PROJECT-STRUCTURE 개발 관련 내용을 기술한다.

# 이력

- 2022.07.22
  - 최초 등록
  - 개발프로세스, 소스코드관리 방법
- 2022.07.26
  - Node 버전관리 추가
- 2022.08.16
  - Node 버전 업데이트
- 2022.08.20
  - 프로젝트명 변경 ( PROJECT-INIT > PROJECT-STRUCTURE )

# 구성

  <!-- blank line -->

- 환경

  - windows 10, mac
  - visual studio code
  - node v16.17.0
  - npm v8.15.0

  ## <!-- blank line -->

- 라이브러리

  - next / 12.2.2
  - react / 18.2.0
  - react-dom / 18.2.0

# 실행

- Visual Studio Code 실행
- npm install

- 로컬환경
  - npm run serve

- 개발환경
  - npm run serve-development

- 운영환경
  - npm run serve-production

- 스토리북
  - npm run storybook

# 배포

- Visual Studio Code 실행
- npm install
- npm run build

- CSR (Client Side Rendering)

  - 로컬환경
    - npm run build-export

  - 개발환경
    - npm run build-export-development

  - 운영환경
    - npm run build-export-production

- SSR (Server Side Rendering)

  - 로컬환경
    - npm run build
    - npm run start-pm2

- 개발환경
  - npm run build-development
  - npm run start-pm2-development

- 운영환경
  - npm run build-production
  - npm run start-pm2-production

# Node 버전관리

NVM(Node Version Manager)은 말 그대로 Node.js의 버전을 관리하는 도구입니다. 협업, 여러가지 프로젝트를 동시에 진행해야 할때와 라이브러리 버전 호환 문제에 유용하게 사용할 수 있습니다.

1. nvm 설치
mac : brew install nvm
windows : windows-nvm

2. `.nvmrc` 생성
project root 에 `.nvmrc` 생성후 Node Version 을 기입 한다.

```
// .nvmrc
{Node Version}
```

3. nvm use
`.nvmrc` 에 명시된 Node Version 으로 변경 된다.                                                                                                                                                  

# 주석

- TODO : 좀더 최적화시키고 리팩토링시킬 수 있을만한 구석이 있을때. 미래에 뭔가 의미있는 작업을 더 해야 할 필요성을 느낄때.
- FIXME : 문제가 있는것이 확실하지만, 그걸 지금 당장 그것을 수정할 필요는 없을 때.
- XXX : 해당 부분에 대해서는 더 생각해볼 필요성이 있을 때. 또는 해당 부분에 질문이 생길 때. 또는 코드에서 문제가 일어날만한 부분을 강조 표기할때. 완벽하게 정확히 구현되지 않은 부분이 있을 때. 나중에 고쳐야만하는 부분일 때.

# 개발

## 구조

```sh
root
├── _document.tsx
├── components
│   ├── folder
│   └── folder
├── lib
│   ├── folder
│   └── folder
├── pages
│   ├── folder
│   └── folder
└── folder
```

```sh

pages
├── pas (상품권 / 정책수당 통계 폴더) 
│   │   ├── index.tsx (Dashboard)
│   │   └── sttst.tsx (통계현황판)
│   │
│   ├── charge (충전/지급 폴더)
│   │   │   └── components (탭메뉴 폴더)
│   │   │       ├── user.tsx (사용자별)
│   │   │       ├── day.tsx (요일별)
│   │   │       └── grahp.tsx (그래프)
│   │   │
│   │   ├── index.tsx (충전/지급내역)
│   │   ├── pbmntsttst.tsx (상품권 발행 월병통계)
│   │   ├── rfnmnsttst.tsx (상품권 환불 월별통계)
│   │   ├── policysttst.tsx (정책수당 지급통계)
│   │   ├── policysttst.tsx (상품권 발행 월병통계)
│   │   │
│   ├── payment (결제 폴더)
│   │   │   └── components (탭메뉴 폴더)
│   │   │       ├── user.tsx (사용자별)
│   │   │       ├── day.tsx (요일별)
│   │   │       └── grahp.tsx (그래프)
│   │   │
│   │   ├── index.tsx (결제조회)
│   │   ├── cshmnInqry.tsx (캐시백 월별조회)
│   │   ├── paydetails.tsx (카드/제휴사 결제내역)
│   │   └── marketdetails.tsx (전통시장 결제내역)
│   │
│   ├── gift (선물 폴더)
│   │   │   └── components (탭메뉴 폴더)
│   │   │       ├── history.tsx (선물내역)
│   │   │       ├── sent.tsx (보낸선물 사용자별)
│   │   │       └── rcvd.tsx (받은선물 사용자별)
│   │   │
│   │   └── index.tsx (결제조회)
│   │
├── mmbrsttst (회원통계 폴더) 
│   │   │   └── components (탭메뉴 폴더)
│   │   │       ├── userttst.tsx (사용자통계)
│   │   │       ├── gender.tsx (성별)
│   │   │       └── age.tsx (나이)
│   │   │
│   │   ├── index.tsx (사용자)
│   │   │
│   │   └── mrchn (가맹점 폴더)
│   │           ├── components (탭메뉴 폴더)
│   │           │   ├── stlmnbase.tsx (정산기준)
│   │           │   └── pymntbase.tsx (결제기준)
│   │           ├── index.tsx (가맹점통계)
│   │           └── qr.tsx (QR키트 현황)
│   │
├── report (보고서관리 폴더) 
│   │   │   └── components (탭메뉴 폴더)
│   │   │       ├── user.tsx (사용자 데이터)
│   │   │       ├── mrchn.tsx (가맹점 데이터)
│   │   │       ├── buy.tsx (상품권 구매 데이터)
│   │   │       ├── pymnt.tsx (상품권 결제 데이터 )
│   │   │       └── rfnmn.tsx (상품권 환불 데이터 )
│   │   │ 
│   │   ├── index.tsx (시흥시 첨단도시조성과 자료제공)
│   │   │
│   │   ├── mtbexorgnz (대외기관제출자료(국회,한국은행,금감원)폴더)
│   │   │       ├── components (탭메뉴 폴더)
│   │   │       │   ├── baseinfo.tsx (기본 정보)
│   │   │       │   └── mntpyInfrm.tsx (월간 결제 정보)
│   │   │       └── index.tsx (대외기관제출자료)
│   │   │
│   │   └── frwrddata.tsx (국세청 전달자료(분기))
│   │
├── openbnkmydata (오픈뱅킹/마이데이터 폴더) 
│       │   └── components (탭메뉴 폴더)
│       │       ├── feeSttst.tsx (정보제공 수수료 통계)
│       │       └── InfoFee.tsx (정보제공내역 통계)
│       │
│       └── index.tsx (마이데이터)
└── folder
```

**file**
- _document.tsx
  - meta 태그 정의
  - 전체 페이지에 관여하는 컴포넌트
- _app.tsx
  - 모든 페이지 컴포넌트를 감싸고 있는 공통 레이아웃
  - 최초로 실행됨
  - 내부의 컴포넌트를 전부 실행하고 html body로 구성

**folder**
- components : 애플리케이션을 구성하는 개별 UI 구성 요소
- lib : 비즈니스/애플리케이션/도메인 로직
- pages : 애플리케이션 구조에 따라 실제 경로/페이지

## 컴포넌트

컴폰넌트 명명 규칙
{컴포넌트분류}/{컴포넌트명}

### 디렉토리 구조
```
components/button
├── Button.mocks.ts
├── Button.stories.tsx
└── Button.tsx
```
- Button.mocks.ts : 목업 데이터 정의
- Button.stories.tsx : 스토리북 정의
- Button.tsx : React 컴포넌트 정의



## 개발 프로세스

- 이슈 단계
  issues - boards(open, todo, doing, merged develop, merged master, close)
  - 'open' 단계에 앞으로 진행 될 이슈 생성(마일스톤, 작업자, 일정, 내용)
  - 스프린트 단위로 한 주가 시작되기 전 'open' -> 'todo' 상태 변경하여 해당 주의 스프린트가 시작 됨을 알림
  - 해당 작업자는 이슈 상태 'doing' 변경하여 이슈 해결 시작을 알림
  - /develop 브랜치를 기반으로 /feature/이슈번호 브랜치 생성하여 개발 시작
  - 개발 완료 후 /feature/이슈번호에 commit/push 후 merge request 생성
  - /feature/이슈번호 맞는 merge request 를 해당 팀원은 모두 코드를 확인하고 변경사항이 있다면 소스 위치에 수정내용 작성, 없다면 '확인 완료' 커맨트 작성
  - 작업자는 merge request 의 모든 커맨트를 확인하고 변경 작업 후에 완료했다는 커맨트를 등록, 'mark as resolved' 선택,
    만약 '확인 완료' 만 있다면 'mark as resolved' 선택하고 병합
  - 변경요청 한 팀원은 변경 된 내용을 확인하고 작업자의 커맨트에 'mark as resolved'
  - 모든 작업이 완료되었다면 /develop 브랜치로 병합
  - 해당 프로젝트의 빌드전(배포서버에서) slack의 해당 채널에 배포 시작을 모든 팀원에게 알리고, 해당 프로젝트 deploy를 시작
  - deploy가 모두 완료되면 slack의 해당 채널에 배포 완료를 모든 팀원에게 알림
  - 해당 테스크 상태 'merged develop' 변경
  - 테스트 진행
  - 위 내용은 스프린트(단위:1주) 단위로 이루어 지며 모든 이슈에 대해서 위와 같이 동일하게 반복

## 소스 버전 관리

- 해당 브랜치 구조는 git-flow 정책을 따름

- 브랜치 구조
  feature - develop - release - tag - master - hotfix
  - feature : 테스크 단위 브랜치
  - develop : 전체 개발 단위 브랜치
  - release : 릴리즈 단위 브랜치
  - master : 전체 운영 단위 브랜치
  - hotfix : 전체운영 핫픽스 단위 브랜치
