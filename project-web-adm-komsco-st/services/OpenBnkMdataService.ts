import http from '../lib/http/httpCommon';

// 오픈뱅킹/마이데이터 api

// 오픈뱅킹 수수료 현황 조회
const BnkFeeService = (data: any) => {
  return http.post<any>('/st/v1/open/bank/fee', data);
};

// 마이데이터 정보제공 수수료 통계 합계 조회
const InfoFeeSumService = (data: any) => {
  return http.post<any>('/st/v1/open/mdta/fees/stts', data);
};

// 마이데이터 정보제공 수수료 통계 목록 조회
const InfoFeeStaticService = (data: any) => {
  return http.post<any>('/st/v1/open/mdta/fees', data);
};

// 마이데이터 정보제공 통계
const InfoDataService = (data: any) => {
  return http.post<any>('/st/v1/open/mdta/ofrs', data);
};

const BnkMDataService = {
  BnkFeeService,
  InfoFeeSumService,
  InfoFeeStaticService,
  InfoDataService,
};

export default BnkMDataService;
