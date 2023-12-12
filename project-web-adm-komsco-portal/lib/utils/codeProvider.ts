import Code from '../../services/CodeService';
import { ResData } from 'types/ResData';

export const resCodeData = (setGrpCode: any) => {
  const reqData = [];
  Code.selectcode({
    cdDvcd: '', //TODO: 이건 어디서 나온겨??
    dtlCd: '',
    dtlCdNm: null,
    uzYn: 'Y',
    pageNum: 1,
    pageSize: 9999,
  })
    .then((response: any) => {
      const code = response.body;
      console.log('resCodeData : ', code.cdList);
      setGrpCode(code.cdList);
    })
    .catch((e: ResData) => {
      console.log(e);
      console.log('resCodeData : ' + '터짐');
      setGrpCode(reqData);
    });
  return reqData;
};

const filterCodeList = (codeNumber: string, codeData: any) => {
  let tempData = [];
  tempData = codeData.filter((item: any) => item.cdDvcd === codeNumber);
  return tempData;
};

export const findCodeList = (codeNumber: string, codeData: any) => {
  return filterCodeList(codeNumber, codeData);
};

export const grpSelectFilter = (
  reqList: any,
  searchCode: string,
  labelName: string,
  valueName: string,
  allUse: boolean
) => {
  let resList = [];
  const tempList = findCodeList(searchCode, reqList);
  tempList.length > 0 &&
    tempList.map((c) => {
      return resList.push({ label: c[labelName], value: c[valueName] });
    });
  resList = StringSort(resList, 'value');
  allUse && resList.unshift({ label: '전체', value: '' });
  return resList;
};

export const numberSort = (reqList: any, name: string) => {
  const res = reqList.sort((a: number, b: number) => {
    return a[name] - b[name];
  });
  return res;
};

export const StringSort = (reqList: any, name: string) => {
  const res = reqList.sort((a: string, b: string) => {
    const x = a[name].toLocaleLowerCase();
    const y = b[name].toLocaleLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  return res;
};

export const StrArrayToInt = (reqList = []) => {
  if (reqList.length > 0) {
    let resList = [];
    resList = reqList.map((item) => parseInt(item));
    return resList;
  } else {
    return reqList;
  }
};
