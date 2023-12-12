import http from '../lib/http/httpCommon';
import { ISelectCddvcd } from '../types/Cddv';

// 공통코드 조회
const selectcode = (data: {
  cdDvcd: string;
  pageSize: number;
  dtlCd: string;
  uzYn: string;
  pageNum: number;
  dtlCdNm: string;
}) => {
  return http.post<ISelectCddvcd>('/portal/v1/sy/cd/cds', data);
};
const MenuService = {
  selectcode,
};

export default MenuService;
