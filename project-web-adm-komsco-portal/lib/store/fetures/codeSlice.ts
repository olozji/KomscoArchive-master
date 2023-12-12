import { createSlice } from '@reduxjs/toolkit';
import { Code } from '../../../types/Code';

const initialState: Code = {
  first: true,
  code: [
    {
      check: false,
      cdDtlDesc: '',
      cdDvcd: '',
      cdDvcdDtlDesc: '',
      cdDvcdNm: '',
      dtlCd: '',
      dtlCdNm: '',
      frstRegDttm: '',
      frstRgsrId: '',
      frstRgsrNm: '',
      hisList: '',
      lastChngDttm: '',
      lastEdtrId: '',
      lastEdtrNm: '',
      lnupSer: '',
      uzYn: '',
    },
  ],
};

export const codeState = createSlice({
  name: 'codeState',
  initialState: initialState,
  reducers: {
    setCodeState(state, action) {
      console.log('payload', action.payload);
      state.first = false;
      state.code = action.payload;
    },
    removeCodeState(state, action) {
      state.first = true;
      state.code = [
        {
          check: false,
          cdDtlDesc: '',
          cdDvcd: '',
          cdDvcdDtlDesc: '',
          cdDvcdNm: '',
          dtlCd: '',
          dtlCdNm: '',
          frstRegDttm: '',
          frstRgsrId: '',
          frstRgsrNm: '',
          hisList: '',
          lastChngDttm: '',
          lastEdtrId: '',
          lastEdtrNm: '',
          lnupSer: '',
          uzYn: '',
        },
      ];
    },
  },
});

export const { setCodeState, removeCodeState } = codeState.actions;
export default codeState.reducer;
