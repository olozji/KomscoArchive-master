import http from '../lib/http/httpCommon';

// 회원통계 api

// qr키트 현황 조회
const QrKitPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/merc/qrs', data);
};

// 카드사별 발급통계 조회
const CardComPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/card/crco', data);
};

// 지점별 발급통계 조회
const BranchPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/card/brof', data);
};

// 사용자 통계 조회
const UserStaticsPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/user/list', data);
};

// 사용자 주사용 지역 조회
const UserSttstPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/user/marea', data);
};

// 사용자 성별 조회
const UserGenderPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/user/gend', data);
};

// 사용자 연령별 조회
const UserAgePayment = (data: any) => {
  return http.post<any>('/st/v1/memb/user/age', data);
};

// 사용자 가맹점 조회
const UserBranchPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/merc/adjs', data);
};

// 사용자 가맹점 조회
const UserStlmnPayment = (data: any) => {
  return http.post<any>('/st/v1/memb/merc/setl', data);
};

const UserService = {
  QrKitPayment,
  CardComPayment,
  BranchPayment,
  UserStaticsPayment,
  UserSttstPayment,
  UserGenderPayment,
  UserAgePayment,
  UserBranchPayment,
  UserStlmnPayment,
};

export default UserService;
