import http from '../lib/http/httpCommon';
import { AppPushTemplateList, AppPushTemplatePost, AppPushSendHistoryList } from '../types/Message';

//메세지관리 템플릿 목록 조회
const selectTempList = (data: any) => {
  return http.post<any>('/portal/v1/sy/msg/snds', data);
};

//메세지관리 템플릿 상세조회
const selectTempDetail = (data: any) => {
  return http.get('/portal/v1/sy/msg/tmplt/' + data);
};

//앱메세지 템플릿 목록 조회
const selectAppTempList = (data: AppPushTemplateList) => {
  return http.post<AppPushTemplateList>('/portal/v1/sy/app/msg/temps', data);
};

//앱메세지관리 템플릿 등록
const postAppTemp = (data: AppPushTemplatePost) => {
  return http.post<AppPushTemplatePost>('/portal/v1/sy/app/msg/temp', data);
};

//앱메세지관리 템플릿 상세조회
const selectAppTempDetail = (connSeq: string | string[]) => {
  return http.get(`/portal/v1/sy/app/msg/temp/${connSeq}`);
};

//앱메세지관리 템플릿 수정
const putAppTemp = (connSeq: string | string[], data: AppPushTemplatePost) => {
  return http.put<AppPushTemplatePost>(`/portal/v1/sy/app/msg/temp/${connSeq}`, data);
};

//앱메세지 발송내역 목록 조회
const selectSendHistory = (data: AppPushSendHistoryList) => {
  return http.post<AppPushSendHistoryList>('/portal/v1/sy/app/msg/send/historys', data);
};

//앱메세지 발송내역 상세조회
const selectSendHistoryDetail = (data: any) => {
  return http.get('/portal/v1/sy/app/msg/send/history/' + data);
};

//앱메세지 발송내역-회원목록 조회
const selectSendMemberHistorys = (data: any, body: any) => {
  return http.post('/portal/v1/sy/app/msg/send/' + data + '/member/history', body);
};

const MesageService = {
  selectTempList,
  selectTempDetail,
  selectAppTempList,
  postAppTemp,
  selectAppTempDetail,
  selectSendHistory,
  selectSendHistoryDetail,
  selectSendMemberHistorys,
  putAppTemp,
};

export default MesageService;
