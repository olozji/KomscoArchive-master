import { IPopup } from './Popup';

const base: IPopup = {
  title: '팝업 제목',
  onClickClose: () => {
    return;
  },
};

export const mockProps = {
  base,
};
