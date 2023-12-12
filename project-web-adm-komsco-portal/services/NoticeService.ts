import http from '../lib/http/httpCommon';
import { ISelectNotice, ISelectFaq, ISelectMenual } from '../types/Notice';

// 메인화면 공지사항 조회
const selectnotice = (data: ISelectNotice) => {
  return http.post<ISelectNotice>('/portal/v1/main/mngr/cmknMtrs', data);
};

// 메인화면 faq 조회
const selectfaq = (data: ISelectFaq) => {
  return http.post<ISelectFaq>('/portal/v1/main/mngr/faqs', data);
};

// 메인화면 메뉴얼 조회
const selectmenual = (data: ISelectMenual) => {
  return http.post<ISelectMenual>('/portal/v1/main/mngr/mnul', data);
};

//

// 공지사항 페이지 공지사항 조회
const selectNoticeList = (data: any) => {
  return http.post<any>('/portal/v1/sy/bltn/cmkns', data);
};

// FAQ 페이지 FAQ 조회
const selectFaqList = (data: any) => {
  return http.post<any>('/portal/v1/sy/bltn/faqs', data);
};

// 시스템메뉴얼 페이지 시스템메뉴얼리스트 조회
const selectMenualList = (data: any) => {
  return http.post<any>('/portal/v1/sy/bltn/mnuls', data);
};

//

// 공지사항 상세 조회
const getNoticeDetail = (data: any) => {
  return http.get('/portal/v1/sy/bltn/cmkn/' + data);
};

// 공지사항 상세 수정
const putModifyNotice = (data: any, body: any) => {
  return http.put('/portal/v1/sy/bltn/cmkn/' + data, body);
};

// 공지사항 등록
const postNotice = (data: any) => {
  return http.post('/portal/v1/sy/bltn/cmkn/', data);
};
// 공지사항 대상 목록
const selectNoticeTargetList = (data: any) => {
  return http.post('/portal/v1/sy/bltn/cmkn/targets', data);
};

// 팝업 공지사항 조회
const selectPopupNoticeList = () => {
  return http.get('/portal/v1/main/mngr/popup/cmknMtrs');
};

// faq 등록
const postFaq = (data: any) => {
  return http.post('/portal/v1/sy/bltn/faq', data);
};

//faq 상세조회
const detailFaq = (faqSeq: any) => {
  return http.get(`/portal/v1/sy/bltn/faq/${faqSeq}`);
};

//faq 수정
const putFaq = (faqSeq: any, data: any) => {
  return http.put(`/portal/v1/sy/bltn/faq/${faqSeq}`, data);
};

//메뉴얼 등록
const postMenual = (data: any) => {
  return http.post(`/portal/v1/sy/bltn/mnul`, data);
};

//메뉴얼 조회
const detailMenual = (mnulSeq: any) => {
  return http.get(`/portal/v1/sy/bltn/mnul/${mnulSeq}`);
};

//메뉴얼 수정
const putMenual = (mnulSeq: any, data: any) => {
  return http.put(`/portal/v1/sy/bltn/mnul/${mnulSeq}`, data);
};

const NoticeMng = {
  selectnotice,
  selectfaq,
  selectmenual,

  selectNoticeList,
  selectFaqList,
  selectMenualList,

  getNoticeDetail,
  putModifyNotice,
  postNotice,

  selectNoticeTargetList,
  selectPopupNoticeList,
  postFaq,
  detailFaq,
  putFaq,
  postMenual,
  detailMenual,
  putMenual,
};

export default NoticeMng;
