# Hackle Demo Store

Hackle 이벤트 트래킹 테스트를 위한 전자상거래 데모 웹사이트입니다.

## 프로젝트 개요

이 프로젝트는 전자제품과 가구를 판매하는 온라인 쇼핑몰 데모로, 완전한 구매 퍼널(Purchase Funnel)을 구현하고 있습니다.

## 주요 기능

- **홈페이지**: 스토어 소개 및 카테고리 안내
- **상품 목록**: 카테고리별 필터링 기능
- **상품 상세**: 상세 정보, 사양, 재고 확인
- **장바구니**: 수량 조절 및 상품 관리
- **주문서**: 주문 내역 확인
- **구매 완료**: 주문 완료 확인

## 디자인 특징

### 색상 팔레트
- **Primary**: 인디고 (#6366f1)
- **Secondary**: 그린 (#10b981)
- **Danger**: 레드 (#ef4444)
- **Gray Scale**: 다양한 회색 톤

### UI/UX 요소
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 부드러운 애니메이션 효과
- 직관적인 사용자 인터페이스
- 모바일 최적화
- 그라디언트 배경
- 카드 기반 레이아웃
- 실시간 장바구니 카운터

## 프로젝트 구조

```
hackle_event_test/
├── package.json          # 프로젝트 설정
├── server.js             # Node.js 서버
├── README.md            # 프로젝트 문서
└── public/              # 정적 파일
    ├── index.html       # 홈페이지
    ├── list.html        # 상품 목록
    ├── detail.html      # 상품 상세
    ├── cart.html        # 장바구니
    ├── checkout.html    # 주문서
    ├── complete.html    # 구매 완료
    ├── css/
    │   └── style.css    # 스타일시트
    ├── data/
    │   └── products.js  # 상품 데이터
    └── js/
        ├── cart.js      # 장바구니 로직
        └── tracking.js  # 이벤트 트래킹
```

## 시작하기

### 필수 요구사항
- Node.js (v12 이상)

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 서버 실행:
```bash
npm start
또는
node server.js
```

3. 브라우저에서 접속:
```
http://localhost:3001
```

## 상품 카테고리

### 전자제품 (Electronics)
- 노트북 (L/S 모델)
- 데스크탑
- 스마트폰 (S/A 모델)
- 무선 이어폰

### 가구 (Furniture)
- 책상
- 의자

## 🛠 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Data Storage**: LocalStorage (클라이언트 사이드)
- **Tracking**: Custom event tracking system

## 이벤트 트래킹

프로젝트는 다음 주요 이벤트를 추적합니다:

- `trackViewHome()` - 홈 페이지 방문
- `trackViewProductList()` - 상품 목록 보기
- `trackClickProduct()` - 상품 클릭
- `trackViewProductDetail()` - 상품 상세 보기
- `trackAddToCart()` - 장바구니 추가
- `trackViewCart()` - 장바구니 보기
- `trackUpdateCartQuantity()` - 수량 변경
- `trackRemoveFromCart()` - 장바구니 삭제
- `trackEnterCheckout()` - 주문서 진입
- `trackPurchaseComplete()` - 구매 완료

## 주요 개선사항

### CSS
- CSS 변수를 활용한 일관된 디자인 시스템
- 부드러운 애니메이션 및 트랜지션 효과
- 반응형 그리드 레이아웃
- 다양한 버튼 스타일 (primary, secondary, success, danger)
- 카드 호버 효과

### HTML
- 시맨틱 마크업
- 메타 태그 추가 (viewport, charset)
- 접근성 개선
- 네비게이션 바 추가
- 진행 상태 표시

### JavaScript
- 실시간 장바구니 카운터
- 동적 UI 렌더링
- 카테고리 필터링
- 폼 검증
- LocalStorage 활용

## 반응형 디자인

- **Desktop**: 1200px 최대 너비
- **Tablet**: 자동 조정 그리드
- **Mobile**: 단일 컬럼 레이아웃, 전체 너비 버튼

## 향후 개선 계획

- [ ] 실제 상품 이미지 추가
- [ ] 검색 기능 구현
- [ ] 정렬 기능 (가격순, 인기순)
- [ ] 사용자 리뷰 시스템
- [ ] 위시리스트 기능
- [ ] 백엔드 API 연동
- [ ] 결제 시스템 통합

## 라이선스

이 프로젝트는 데모 목적으로 제작되었습니다.

## 제작

Hackle Demo Store - 2026

---

**Note**: 이 프로젝트는 Hackle 이벤트 트래킹 테스트를 위한 데모 애플리케이션입니다.
