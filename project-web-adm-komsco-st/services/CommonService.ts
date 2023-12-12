import http from '../lib/http/httpCommon';

// 공통 코드 API 호출

// 상품권 발행 통계 조회
const getCodeList = (data: any) => {
  return http.post<any>('/st/v1/com/code/list', data);
};

// 지역 서비스 조회
const LocalServiceData = (data: any) => {
  return http.post<any>('/st/v1/com/data/areasrvc', data);
};

// 상품권 조회
const LocalGiftData = (data: any) => {
  return http.post<any>('/st/v1/com/data/gftclist', data);
};

// 카드 제휴사 조회
const LocalCardData = (data: any) => {
  return http.post<any>('/st/v1/com/data/cardafcr', data);
};

const CommonService = {
  getCodeList,
  LocalServiceData,
  LocalGiftData,
  LocalCardData,
};

export default CommonService;
