import http from '../lib/http/httpCommon';
// 보고서 관리 api 목록

// 지역서비스 상품권 제공

// 사용자 데이터 목록 조회
const LocalUserDataList = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/users', data);
};

// 가맹점 데이터 목록 조회
const LocalBranchDataList = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/mercs', data);
};

// 상품권 구매 데이터 조회
const LocalGiftDataList = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/buyns', data);
};

// 상품궈 구매 취소 조회
const LocalGiftCancelDataList = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/bcancs', data);
};

// 상품권 결제 데이터 조회
const LocalGiftPayment = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/setls', data);
};

// 상품권 환불 데이터 조회
const LocalRefundsPayment = (data: any) => {
  return http.post<any>('/st/v1/rpt/gftc/rfunds', data);
};

// 국세청 자료조회
const chargeHistory = (data: any) => {
  return http.post<any>('/st/v1/rpt/nts/dtas', data);
};

// 국회 제출자료 조회
const CongressReport = (data: any) => {
  return http.post<any>('/st/v1/rpt/xtis/nas', data);
};

// 한국은행 제출자료 조회
const KoreaBnkReport = (data: any) => {
  return http.post<any>('/st/v1/rpt/xtis/bok', data);
};

// 금융감독원 제출자료 조회
const FinancialReport = (data: any) => {
  return http.post<any>('/st/v1/rpt/xtis/fss', data);
};

const ReportService = {
  chargeHistory,
  LocalUserDataList,
  CongressReport,
  KoreaBnkReport,
  FinancialReport,
  LocalBranchDataList,
  LocalGiftDataList,
  LocalGiftPayment,
  LocalRefundsPayment,
  LocalGiftCancelDataList,
};

export default ReportService;
