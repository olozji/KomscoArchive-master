// 상품권/정책수당 Dashboard 데이터 조회 api
import http from '../lib/http/httpCommon';

// 시군별 CHAK 상품권 사용 현황 차트 목록 조회
const gftc_use = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/gftc/use', data);
};

// QR모바일 vs 지류 vs 카드 상품권 결제 금액 차트 목록 조회
const gftc_wdl = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/gftc/wdl', data);
};
// CHAK 누적 가입자 대비 실사용자수 차트 목록 조회
const user_real = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/user/real', data);
};
// CHAK 상품권 충전금액 대비 환불 구매 취소 차트 목록 조회
const rfund_cag = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/rfund/cag', data);
};
// CHAK 결제금액 대비 환불금액 차트 목록 조회
const rfund_setl = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/rfund/setl', data);
};
// CHAK 정책수당 지급 대비 사용금액 차트 목록 조회
const plcy_use = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/plcy/use', data);
};
// CHAK 정책수당 지급 대비 회수금액 차트 목록 조회
const plcy_rtrv = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/plcy/rtrv', data);
};
// CHAK 누적 가맹점 가입 추이 차트 목록 조회
const merc_joing = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/merc/joing', data);
};
// CHAK 가맹점 결제 추이 차트 목록 조회
const merc_setl = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/merc/setl', data);
};
// CHAK 항목별 수수료 사용금액 차트 목록 조회
const fee_use = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/fee/use', data);
};
// CHAK 수수료 추이금액 차트 목록 조회
const fee_trsi = (data: any) => {
  return http.post<any>('/st/v1/plcy/dash/fee/trsi', data);
};

const DashBoardService = {
  gftc_use,
  gftc_wdl,
  user_real,
  rfund_cag,
  rfund_setl,
  plcy_use,
  plcy_rtrv,
  merc_joing,
  merc_setl,
  fee_use,
  fee_trsi,
};

export default DashBoardService;
