export interface ISelectMenuData {
  lnknSiteCd: string;
}

// 공통코드목록
export interface ISelectCd {
  cdDvcd?: string;
  dtlCdNm?: string;
  uzYn?: string;
  pageNum: number;
  pageSize: number;
}

// 공통코드그룹관리목록
export interface ISelectCdGroup {
  cdDvcdNm?: string;
  uzYn?: string;
  pageNum: number;
  pageSize: number;
}

// api목록
export interface ISelectApis {
  apiType: string;
}

// 메뉴 등록
export interface IAddMenuRequestData {
  menuNm: string;
  lnknSiteCd: string;
  menuLevelCd: string | null;
  uprnMenuSeq?: number | null;
  menuDesc: string;
  menuConnUrl: string;
  uzYn: string;
  menuXprYn: string;
}

//메뉴리스트업데이트
export interface IUpdateMenuListRequestData {
  lnknSiteCd: string;
  list: Array<MenuUpdate>;
}

//메뉴업데이트
export interface IUpdateMenuRequestData {
  menuNm: string;
  menuDesc: string;
  menuConnUrl: string;
  uzYn: string;
  menuXprYn: string;
}

//메뉴 등록
export interface IRegisterMenuRequestData {
  menuNm: string;
  lnknSiteCd: string;
  menuLevelCd: string;
  uprnMenuSeq: number;
  menuDesc: string;
  menuConnUrl: string;
  uzYn: string;
  menuXprYn: string;
}

// 메뉴
export interface Menu {
  menuSeq: number;
  menuNm: string;
  lnknSiteCd: string;
  menuLevelCd: string;
  uprnMenuSeq: number;
  menuDesc: string;
  menuConnUrl: string;
  menuSerNo: number;
  uzYn: string;
  frstRgsrId: string;
  frstRegDttm: string;
  lastEdtrId: string;
  lastChngDttm: string;
  menuXprYn: string;
  childs: Array<Menu>;
}

//업데이트 메뉴
export interface MenuUpdate {
  menuSeq: number;
  menuSerNo: number;
}

//메뉴 스테이트
export interface MenuState {
  menus: Array<Menu>;
  menuUpdateList: Array<MenuUpdate>;
  menuSelected: Menu;
  isUpdating: boolean;
  menuFormValues: Menu;
  isTabChanged: boolean;
}
