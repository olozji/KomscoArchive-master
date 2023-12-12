export interface ISelectAccountGroupMng {
  mngrGroupNm: string;
  uzYn: string;
  acntTypCd: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectAccountApp {
  mngrAppcStaCd?: string;
  acntTypCd?: string;
  frstRegDttm?: string;
  frstRegDttmTo?: string;
  membNm?: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectAdminAccount {
  acntTypCd?: string;
  mngrGroupSeq?: number;
  mngrGroupNm?: number;
  lsgbId?: string;
  mngrNm?: string;
  uzYn?: string;
  frstRegDttm?: string;
  frstRegDttmTo?: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectDormancy {
  acntTypCd?: string;
  mngrGroupSeq?: number;
  lsgbId?: string;
  mngrNm?: string;
  mngrStaCd?: string;
  unuseProcsDttm?: string;
  unuseProcsDttmTo?: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectConnectHitory {
  acntTypCd?: string;
  mngrGroupSeq?: number;
  mngrNm?: string;
  lastLoginDttm?: string;
  lastLoginDttmTo?: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectChangeHitory {
  acntTypCd: string;
  mngrGroupSeq: number;
  lsgbId: string;
  mngrNm: string;
  lastChngDttm: string;
  lastChngDttmTo: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectAccountGroupDetail {
  mngrGroupSeq: number;
  mngrGroupNm: string;
  uzYn: string;
  acntTypCd: string;
  authTypCd: string;
  frstRgsrId: string;
  frstRegDttm: string;
  lastEdtrId: string;
  lastChngDttm: string;
  acntTypNm: string;
  authTypNm: string;
  frstRgsrNm: string;
  lastEdtrNm: string;
  mngrGroupSiteList: [
    {
      lnknSiteCd: string;
      menus?: [];
    }
  ];
}

export interface ISelectMngrGroupSite {
  mngrGroupSeq?: number;
  lnknSiteCd: string;
  mngrGroupMenuList: [
    {
      lnknSiteCd?: string;
      menus?: [];
    }
  ];
}

export interface ISelectPrivacyHistory {
  searchStartDt: string;
  searchStartTm: string;
  searchEndDt: string;
  searchEndTm: string;
  searchType: string;
  searchValue: string;
  lnknSiteCd: string;
  outsideWorkTimeYn: string;
  pageNum: number;
  pageSize: number;
}

export interface ISelectExcessHistory {
  searchStartDt: string;
  searchEndDt: string;
  searchType: string;
  searchValue: string;
  downLoadCount: string;
  lnknSiteCd: string;
  pageNum: number;
  pageSize: number;
}
