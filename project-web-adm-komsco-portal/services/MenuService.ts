import http from '../lib/http/httpCommon';

import {
  ISelectCd,
  ISelectCdGroup,
  ISelectMenuData,
  ISelectApis,
  IAddMenuRequestData,
  IUpdateMenuRequestData,
  IUpdateMenuListRequestData,
  IRegisterMenuRequestData,
} from '../types/Menu';

/**
 * 메뉴목록조회
 * @param data
 * @returns
 */

const getMenuList = () => {
  return http.get('/portal/v1/main/apch/site');
};

const selectmenu = (data: ISelectMenuData) => {
  return http.post<ISelectMenuData>('/portal/v1/system/menus', data);
};

// 공통코드조회
const selectcd = (data: ISelectCd) => {
  return http.post<ISelectCd>('/portal/v1/sy/cd/cds', data);
};
// 공통코드그룹조회
const selectcdgroup = (data: ISelectCdGroup) => {
  return http.post<ISelectCdGroup>('/portal/v1/sy/cd/groups', data);
};
// Api 관리
const selectapi = (data: ISelectApis) => {
  return http.post<ISelectApis>('/portal/v1/misc/obapis/{apiType}', data);
};

// 메뉴추가
const addmenu = (data: IAddMenuRequestData) => {
  return http.post<IAddMenuRequestData>('/portal/v1/system/menu', data);
};

//메뉴리스트업데이트
const updateMenuList = (data: IUpdateMenuListRequestData) =>
  http.post('/portal/v1/system/menu/position', data);

//메뉴업데이트
const updateMenu = (data: IUpdateMenuRequestData, menuNo: number) => {
  return http.put(`/portal/v1/system/menu/${menuNo}`, data);
};

//레벨별 메뉴 목록 조회
const getMenuListByLevel = (lnknSiteCd: string, menuLevelCd: string) => {
  return http.get(`/portal/v1/system/menu/ls/${lnknSiteCd}/ml/${menuLevelCd}`);
};

//메뉴 등록
const registerMenu = (data: IRegisterMenuRequestData) => {
  return http.post(`/portal/v1/system/menu`, data);
};

const MenuService = {
  selectmenu,
  selectcd,
  selectcdgroup,
  selectapi,
  addmenu,
  getMenuList,
  updateMenuList,
  updateMenu,
  getMenuListByLevel,
  registerMenu,
};

export default MenuService;
