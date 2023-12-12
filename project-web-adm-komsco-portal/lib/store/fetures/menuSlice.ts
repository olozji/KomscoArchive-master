import { MenuState } from '@/types/Menu';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState: MenuState = {
  menus: [],
  menuUpdateList: [],
  menuSelected: {
    menuSeq: 0,
    menuNm: '',
    lnknSiteCd: '',
    menuLevelCd: '',
    uprnMenuSeq: 0,
    menuDesc: '',
    menuConnUrl: '',
    menuSerNo: 0,
    uzYn: 'Y',
    frstRgsrId: '',
    frstRegDttm: '',
    lastEdtrId: '',
    lastChngDttm: '',
    menuXprYn: '',
    childs: [],
  },
  isUpdating: false,
  menuFormValues: {
    menuSeq: 0,
    menuNm: '',
    lnknSiteCd: '',
    menuLevelCd: '',
    uprnMenuSeq: 0,
    menuDesc: '',
    menuConnUrl: '',
    menuSerNo: 0,
    uzYn: 'Y',
    frstRgsrId: '',
    frstRegDttm: '',
    lastEdtrId: '',
    lastChngDttm: '',
    menuXprYn: '',
    childs: [],
  },
  isTabChanged: false,
};

export const menuState = createSlice({
  name: 'menuState',
  initialState: initialState,
  reducers: {
    setMenusState(state, action) {
      state.menus = action.payload;
    },
    setMenuSelectedState(state, action) {
      state.menuSelected = action.payload;
    },
    setIsUpdating(state, action) {
      state.isUpdating = action.payload;
    },
    setMenuFormValues(state, action) {
      state.menuFormValues = action.payload;
    },
    setIsTabChanged(state, action) {
      state.isTabChanged = action.payload;
    },
    initializeFormValues(state) {
      state.menuFormValues = {
        menuSeq: 0,
        menuNm: '',
        lnknSiteCd: '',
        menuLevelCd: '',
        uprnMenuSeq: 0,
        menuDesc: '',
        menuConnUrl: '',
        menuSerNo: 0,
        uzYn: 'Y',
        frstRgsrId: '',
        frstRegDttm: '',
        lastEdtrId: '',
        lastChngDttm: '',
        menuXprYn: '',
        childs: [],
      };
    },
  },
});

export const menus = (state: RootState) => {
  return state.menuSlice.menus;
};

export const menuSelected = (state: RootState) => {
  return state.menuSlice.menuSelected;
};

export const menuUpdateList = (state: RootState) => {
  return state.menuSlice.menuUpdateList;
};

export const isUpdating = (state: RootState) => {
  return state.menuSlice.isUpdating;
};

export const menuFormValues = (state: RootState) => {
  return state.menuSlice.menuFormValues;
};

export const isTabChanged = (state: RootState) => {
  return state.menuSlice.isTabChanged;
};

export const {
  setMenusState,
  setIsUpdating,
  setMenuSelectedState,
  setMenuFormValues,
  initializeFormValues,
  setIsTabChanged,
} = menuState.actions;
export default menuState.reducer;
