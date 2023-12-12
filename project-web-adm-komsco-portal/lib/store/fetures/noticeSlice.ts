import { createSlice } from '@reduxjs/toolkit';
import { NPopup } from '../../../types/NoticePopup';

const initialState: NPopup = {
  noticePopup: [
    {
      // 공지순번
      cmknSeq: null,
      // 연결사이트 코드
      mgmtSysCds: [''],
      //공지제목
      cmknTitl: '',
      // 공지 내용
      cmknCtnt: '',
      // 최초등록일시
      frstRegDttm: '',
      // 최종 변경 일시
      lastChngDttm: '',
    },
  ],
};

export const mainNoticeState = createSlice({
  name: 'mainNoticeState',
  initialState: initialState,
  reducers: {
    setMainNoticeState(state, action) {
      console.log('payload', action.payload);
      state.noticePopup = action.payload;
      console.log('payload');
    },
    removeMainNoticeState(state, action) {
      state.noticePopup = [
        {
          // 공지순번
          cmknSeq: null,
          // 연결사이트 코드
          mgmtSysCds: [''],
          //공지제목
          cmknTitl: '',
          // 공지 내용
          cmknCtnt: '',
          // 최초등록일시
          frstRegDttm: '',
          // 최종 변경 일시
          lastChngDttm: '',
        },
      ];
    },
  },
});

export const { setMainNoticeState, removeMainNoticeState } = mainNoticeState.actions;
export default mainNoticeState.reducer;
