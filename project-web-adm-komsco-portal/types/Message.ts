export interface AppPushTemplateList {
  searchType: string;
  searchValue: string;
  uzYn: string;
  mgmtSysCd: string;
  appDivCd: string;
  pageNum: number;
  pageSize: number;
}

export interface AppPushTemplatePDetail {
  tmpltId: string;
  tmpltNm: string;
  appPushLinkDivCd: string;
  linkUrl: string;
  mgmtSysCd: string;
  appDivCd: string;
  msgSndTitl: string;
  msgSndCtnt: string;
  uzYn: string;
  frstRgsrId: string;
  frstRgsrNm: string;
  frstRegDttm: string;
  lastEdtrId: string;
  lastEdtrNm: string;
  lastChngDttm: string;
}

export interface AppPushTemplatePost {
  tmpltNm: string;
  appPushLinkDivCd: string;
  linkUrl: string;
  mgmtSysCd: string;
  appDivCd: string;
  msgSndTitl: string;
  msgSndCtnt: string;
  uzYn: string;
}

export interface AppPushTemplatePDetail {
  tmpltId: string;
  tmpltNm: string;
  appPushLinkDivCd: string;
  linkUrl: string;
  mgmtSysCd: string;
  appDivCd: string;
  msgSndTitl: string;
  msgSndCtnt: string;
  uzYn: string;
  frstRgsrId: string;
  frstRgsrNm: string;
  frstRegDttm: string;
  lastEdtrId: string;
  lastEdtrNm: string;
  lastChngDttm: string;
}

export interface AppPushTemplatePost {
  tmpltNm: string;
  appPushLinkDivCd: string;
  linkUrl: string;
  mgmtSysCd: string;
  appDivCd: string;
  msgSndTitl: string;
  msgSndCtnt: string;
  uzYn: string;
}

export interface AppPushSendHistoryList {
  searchType: string;
  searchValue: string;
  msgSndStaCd: string;
  searchStartDt: string;
  searchEndDt: string;
  pageNum: number;
  pageSize: number;
}
