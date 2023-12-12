export interface NPopup {
  noticePopup: [
    {
      // 공지순번
      cmknSeq: number;
      // 연결사이트 코드
      mgmtSysCds: [string];
      //공지제목
      cmknTitl: string;
      // 공지 내용
      cmknCtnt: string;
      // 최초등록일시
      frstRegDttm: string;
      // 최종 변경 일시
      lastChngDttm: string;
    }
  ];
}
