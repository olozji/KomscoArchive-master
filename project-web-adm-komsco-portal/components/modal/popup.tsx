import { useEffect, useState } from 'react';

/** url: 말그대로 url, name: 버튼 이름, title: target, 창 옵션(새 창, 기존 창 등)*/
export default function PopupComponent({
  type,
  url,
  name,
  title = '_blank',
  width = 800,
  height = 600,
  top = 100,
  left = 200,
  closebutton,
  closeState,
  closeFunction = null,
}) {
  useEffect(() => {
    if (type === 'auto') {
      renderPopup();
    }
  }, []);

  // 모달 닫기 버튼
  //   useEffect(() => {
  //     setOpen(false);
  //   }, [closeEvent]);

  const handleClick = () => {
    if (typeof window.open === 'function') {
      const option = `width=${width},height=${height},top=${top},left=${left}`;
      console.log('window.open');
      const win = window.open(url, title, option);
      const timer = setInterval(function () {
        if (win?.closed) {
          clearInterval(timer);
          console.log('in');
          if (closeFunction != null) {
            closeFunction();
          }
        }
      }, 1000);
    } else {
      console.log('window.href');
      window.location.href = url;
    }
  };
  console.log(type);
  const renderPopup = () => {
    const option = `width=${width},height=${height},top=${top},left=${left}`;
    console.log('window.open');
    window.open(url, title, option);
  };
  return (
    <>
      {type === 'button' ? (
        <>
          <button className="popup_button" type="button" onClick={handleClick}>
            {name}
          </button>
        </>
      ) : type === 'span' ? (
        <span onClick={handleClick}>{name}</span>
      ) : null}
      <style jsx>{`
        .popup_button {
          cursor: pointer;
        }
        span {
          color: #0070c0;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
