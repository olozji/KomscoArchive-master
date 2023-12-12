import { useState, useEffect } from 'react';

/** url: 말그대로 url, name: 버튼 이름, title: target, 창 옵션(새 창, 기존 창 등)*/
export default function PopupComponent({
  //   popupOpen,
  ispopup,
  popupList,
  type,
  url,
  title = '_blank',
  width = 800,
  height = 600,
  top = 100,
  left = 200,
  closeState,
}) {
  const [open, setOpen] = useState(false);
  const isModal = () => setOpen(true);

  const [openModal, setOpenModal] = useState(true);

  console.log('test');
  //   console.log(popupOpen);

  useEffect(() => {
    if (type === 'auto' && ispopup === true) {
      renderPopup(popupList);
      setOpenModal(false);
      console.log('받아온 팝업 오픈');
      console.log(ispopup);
    }
  }, []);
  //
  console.log('팝업리스트');
  console.log(popupList);

  //   모달 열렸는지 판단
  //   useEffect(() => {
  //     console.log('모달 열렸는지 판단');
  //     isModal();
  //     console.log(open);
  //     console.log(isModal());
  //   }, [popupOpen]);

  // 모달 닫기 버튼
  //   useEffect(() => {
  //     setOpen(false);
  //   }, [closeEvent]);

  console.log(type);
  const renderPopup = (popupList) => {
    console.log('팝업리스트2');
    console.log(popupList);
    const option = `width=${width},height=${height},top=${top},left=${left}`;
    const popurl = `/noticepopup?id=${url}`;
    const replace = true;

    console.log('window.open');
    window.open(popurl, title, option);
  };
  return <></>;
}
