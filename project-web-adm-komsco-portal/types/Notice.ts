export interface ISelectNotice {
  pageNum: number;
  pageSize: number;
  searchValue?: string;
}

export interface noticeDetail {
  [x: string]: any;
  cmknTitl: string;
  cmknStrtDt: any;
  cmknStrtTktm: any;
  cmknEndDt: any;
  cmknEndTktm: any;
  topFixedYn: string;
  popupNoticeYn: string;
  mgmtSysCds: any;
  bltnYn: string;
}

export interface ISelectFaq {
  pageNum: number;
  pageSize: number;
  searchValue?: string;
}

export interface ISelectMenual {
  pageNum: number;
  pageSize: number;
  searchValue?: string;
}
