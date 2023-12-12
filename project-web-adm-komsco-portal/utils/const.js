export function getMenuList(cd) {
  const list = [
    {
      systemCd: '00',
      systemNm: '어드민포탈',
    },
    {
      systemCd: '01',
      systemNm: '모바일관리시스템',
    },
    {
      systemCd: '02',
      systemNm: '상품권통합관리시스템',
    },
    {
      systemCd: '03',
      systemNm: '정산관리시스템',
    },
    {
      systemCd: '04',
      systemNm: '통계관리시스템',
    },
    {
      systemCd: '05',
      systemNm: '이상거래감지시스템',
    },
  ];

  let equalList = {};
  list.forEach((l) => {
    if (cd == l.systemCd) {
      equalList = l;
    }
  });

  return equalList;
}
