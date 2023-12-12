// 상품권 정책수당 조회 api

import http from '../lib/http/httpCommon';

// 충전/지급내역 통계 조회
const ChargePayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/prvs/prvss', data);
};

// 충전 지급 요일별 조회
const ChargeDayPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/prvs/weeks', data);
};

// 카드/제휴사 결제내역 조회
const CardPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/afcrs', data);
};

// 전통시장 결제내역 조회
const MarketPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/trdmkts', data);
};

// 상품권 발행 통계 조회
const GiftCardPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/issus', data);
};

// 상품권 환불 통계 조회
const GiftRefundPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/rfunds', data);
};

// 상품권 구매취소 통계 조회
const GiftCancelPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/bcanc', data);
};

// 정책수당 지급 통계 조회
const PolicyPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/prvss', data);
};

// 정책수당 회수 통계 조회
const PolicyRefundPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/rtrvs', data);
};

// 캐시백 월별조회
const CashBackPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/csbk/list', data);
};

// 통계현황판 조회
const StaticsBoardPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/pres/press', data);
};

// 충전 지급 통계 사용자별
const ChargeUserPayment = (data: any) => {
  return http.post<any>('/st/v1/plcy/cag/prvs/users', data);
};

// 최근 조회 이력 저장
const RecentlySearchData = (data: any) => {
  return http.post<any>('/st/v1/com/iqry/hist', data);
};

// 최근 조회 이력 저장
const RecentlySearchSave = (data: any) => {
  return http.post<any>('/st/v1/com/iqry/reg', data);
};

// 결제 조회
// 결제/취소 내역
const PaymentCancelData = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/inqry/list', data);
};

// 결제 수단별 조회
const PaymentWayData = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/inqry/pay', data);
};

// 결제 사용자 조회
const PaymentUserData = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/inqry/user', data);
};

// 결제 가맹점 유형
const PaymentBranchData = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/inqry/merc', data);
};

// 결제 온라인 제휴사별 조회
const PaymentPartnerData = (data: any) => {
  return http.post<any>('/st/v1/plcy/setl/inqry/company', data);
};

// 선물 내역
const PaymentGiftData = (data: any) => {
  return http.post<any>('/st/v1/plcy/gft/list', data);
};

// 보낸선물 사용자 내역
const PaymentGiftSend = (data: any) => {
  return http.post<any>('/st/v1/plcy/gft/send', data);
};

// 받은선물 사용자 내역
const PaymentGiftReceive = (data: any) => {
  return http.post<any>('/st/v1/plcy/gft/recv', data);
};

const GiftPolicyService = {
  CardPayment,
  MarketPayment,
  GiftCardPayment,
  GiftRefundPayment,
  GiftCancelPayment,
  PolicyPayment,
  PolicyRefundPayment,
  CashBackPayment,
  StaticsBoardPayment,
  ChargeUserPayment,
  RecentlySearchData,
  RecentlySearchSave,
  ChargePayment,
  ChargeDayPayment,
  PaymentCancelData,
  PaymentWayData,
  PaymentBranchData,
  PaymentPartnerData,
  PaymentGiftData,
  PaymentUserData,
  PaymentGiftSend,
  PaymentGiftReceive,
};

export default GiftPolicyService;
