import http from '../lib/http/httpCommon';
import {
  ISelectAccountGroupMng,
  ISelectAccountApp,
  ISelectAdminAccount,
  ISelectDormancy,
  ISelectConnectHitory,
  ISelectChangeHitory,
  ISelectPrivacyHistory,
  ISelectExcessHistory,
  ISelectAccountGroupDetail,
  ISelectMngrGroupSite,
} from '../types/Account';

// 관리자 그룹 목록
const selectAccountGroupList = (data: ISelectAccountGroupMng) => {
  return http.post<ISelectAccountGroupMng>('/portal/v1/sy/mngr/auths', data);
};

// 관리자 그룹 상세
const selectAccountGroupDetail = (mngrGroupSeq: string | string[]) => {
  return http.get(`/portal/v1/sy/mngr/auth/${mngrGroupSeq}`);
};
// 관리자 그룹 상세
const selectAccountGroupMenu = (mngrGroupSeq: string | string[], lnknSiteCd: string) => {
  return http.put<ISelectAdminAccount>(
    `/portal/v1/sy/mngr/group/${mngrGroupSeq}/site/${lnknSiteCd}`
  );
};

// 관리자 그룹 사이트 메뉴 수정
const updateAccountGroupMenu = (data: any, mngrGroupSeq: string | string[], lnknSiteCd: string) => {
  return http.put<ISelectAdminAccount>(
    `/portal/v1/sy/mngr/group/${mngrGroupSeq}/site/${lnknSiteCd}`,
    data
  );
};
// 관리자 그룹 상세 수정
const updateAccountGroup = (data: ISelectMngrGroupSite) => {
  return http.put<ISelectMngrGroupSite>(`/portal/v1/sy/mngr/auth`, data);
};
// 관리자 계정 목록
const selectAccountApp = (data: ISelectAccountApp) => {
  return http.post<ISelectAccountApp>('/portal/v1/sy/mngr/appcs', data);
};

// 관리자 계정 목록
const selectAdminAccount = (data: ISelectAdminAccount) => {
  return http.post<ISelectAdminAccount>('/portal/v1/sy/mngr/mngrs', data);
};

// 장기미사용자 목록
const selectDormancy = (data: ISelectDormancy) => {
  return http.post<ISelectDormancy>('/portal/v1/sy/mngr/unuse', data);
};

// 접속이력 목록
const selectConnectHistory = (data: ISelectConnectHitory) => {
  return http.post<ISelectConnectHitory>('/portal/v1/sy/mngr/usedlogins', data);
};
// 변경이력 목록
const selectChangeHistory = (data: ISelectChangeHitory) => {
  return http.post<ISelectChangeHitory>('/portal/v1/sy/mngr/usedchngs', data);
};

// 마이페이지
const getMyInfo = () => {
  return http.get('/portal/v1/main/mngr/info');
};

//개인정보 접속이력 목록
const selectPrivacyHistory = (data: ISelectPrivacyHistory) => {
  return http.post<ISelectPrivacyHistory>('/portal/v1/sy/mngr/idvd/info/access/history', data);
};

//개인정보 정보보유주체 상세
const selectPrivacyDetail = (connSeq: string | string[]) => {
  return http.get(`/portal/v1/sy/mngr/idvd/info/access/history/${connSeq}`);
};

//개인정보 기준초과 이력 목록
const selectExcessHistory = (data: ISelectExcessHistory) => {
  return http.post<ISelectExcessHistory>('/portal/v1/sy/mngr/idvd/info/excess/history', data);
};

const AccountService = {
  selectAccountGroupList,
  selectAccountGroupDetail,
  selectAccountGroupMenu,
  updateAccountGroupMenu,
  updateAccountGroup,
  selectAccountApp,
  selectAdminAccount,
  selectDormancy,
  selectConnectHistory,
  selectChangeHistory,
  getMyInfo,
  selectPrivacyHistory,
  selectPrivacyDetail,
  selectExcessHistory,
};

export default AccountService;
