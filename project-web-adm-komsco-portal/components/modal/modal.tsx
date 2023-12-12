import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { CardContent, Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

/** name: 버튼에 들어가는 텍스트, title: 모달 타이들, content: 모달 컨텐트*/
export default function ModalComponent({
  type,
  openModal = null,
  name,
  title,
  content,
  width = 800,
  height = 600,
  lbutton = '취소',
  rbutton = '등록',
  lButtonFunction,
  rButtonFunction,
  closeEvent,
  checkboxValue = null,
  checkboxEvent = null,
  checkboxRef = null,
  checkboxIndex = 0,
  checkboxChange = null,
  modalRef = null,
}) {
  const [open, setOpen] = useState(false);
  const [triggerOpen, setTriggerOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [autoOpen, setAutoOpen] = useState(false);
  const autoHandleClose = () => setAutoOpen(false);

  const style = {
    position: 'absolute',
    top: '400px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { width },
    height: { height },
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'auto',
  };

  // 로그인 페이지 모달 닫기 버튼
  // useEffect(() => {
  //   setTriggerOpen(false);
  // }, [closeEvent]);

  // 모달 열기
  useEffect(() => {
    if (openModal === false) {
      setTriggerOpen(false);
    } else {
      setTriggerOpen(true);
    }
    console.log('===modal , openModal===');
    console.log(openModal);
    console.log('===triggerOpen===');
    console.log(triggerOpen);
  }, [openModal]);

  // 모달 닫기 버튼
  useEffect(() => {
    setOpen(false);
  }, [closeEvent]);

  return (
    <>
      {type === 'auto' ? (
        <div>
          <Modal
            open={autoOpen}
            onClose={autoHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
              </div>
              <div className="content">
                {content}

                <div className="close_wrapper">
                  <div className="closes">
                    <div className="option">
                      <FormControlLabel
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        control={<Checkbox />}
                        label="다시 보지 않기"
                      />
                    </div>
                    <div className="close">
                      <button type="button" onClick={autoHandleClose}>
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : type === 'login' ? (
        <div>
          <Modal
            open={triggerOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
                <div className="turnOffModal" onClick={lButtonFunction}>
                  <span className="line1"></span>
                  <span className="line2"></span>
                </div>
              </div>
              <div className="content">
                {content}
                <div className="buttons">
                  <button type="button" onClick={lButtonFunction}>
                    <div>{lbutton}</div>
                  </button>
                  <button type="button" onClick={rButtonFunction}>
                    <div>{rbutton}</div>
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : type === 'button' ? (
        <div>
          <button type="button" className="buttonstyle" onClick={handleOpen}>
            {name}
          </button>
          <Modal
            ref={modalRef}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
              </div>
              <div className="content">
                {content}
                <div className="buttons">
                  <button type="button" onClick={lButtonFunction}>
                    <div>{lbutton}</div>
                  </button>
                  <button type="button" onClick={rButtonFunction}>
                    <div>{rbutton}</div>
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : type === 'click' ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
              </div>
              <div className="content">
                {content}
                <div className="buttons">
                  <button type="button" onClick={lButtonFunction}>
                    <div>{lbutton}</div>
                  </button>
                  <button type="button" onClick={rButtonFunction}>
                    <div>{rbutton}</div>
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : type === 'checkbox' ? (
        <div>
          <span className="openStyle" onClick={handleOpen}>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px' }}
            >
              <input
                type="checkbox"
                value={checkboxValue != null ? checkboxValue : null}
                ref={(el) =>
                  checkboxRef != null && checkboxRef.current != null
                    ? (checkboxRef.current[checkboxIndex] = el)
                    : null
                }
                onClick={function (e) {
                  e.preventDefault();
                  if (checkboxChange != null) {
                    checkboxChange(checkboxIndex, checkboxValue, name);
                  }
                }}
              />
              {name}
            </label>
          </span>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
              </div>
              <div className="content">
                {content}
                <div className="buttons">
                  <button type="button" onClick={lButtonFunction}>
                    <div>{lbutton}</div>
                  </button>
                  <button type="button" onClick={rButtonFunction}>
                    <div>{rbutton}</div>
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <span className="openStyle" onClick={handleOpen}>
            {name}
          </span>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <div className="header">
                <div className="title">{title}</div>
              </div>
              <div className="content">
                {content}
                <div className="buttons">
                  <button type="button" onClick={lButtonFunction}>
                    <div>{lbutton}</div>
                  </button>
                  <button type="button" onClick={rButtonFunction}>
                    <div>{rbutton}</div>
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}

      <style jsx>{`
        .openStyle {
          color: #0070c0;
          text-decoration: underline;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .header {
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
          background-color: black;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
        }
        .turnOffModal {
          position: relative;
          width: 2rem;
          height: 2rem;
          float: right;
        }
        .turnOffModal > span {
          position: absolute;
          top: 50%;
          width: 100%;
          height: 2px;
          background-color: white;
        }
        .turnOffModal .line1 {
          transform: rotate(135deg);
        }
        .turnOffModal .line2 {
          transform: rotate(45deg);
        }
        .content {
          padding: 2rem;
          font-size: 2rem;
          width: 100%;
          height: calc(100% - 50px);
        }
        .buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .buttons button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          width: 80px;
          height: 35px;
          gap: 15px;
        }
        .buttons button div {
        }
        .close_wrapper {
          width: 95%;
          position: fixed;
          bottom: 15px;
        }
        .closes {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .closes option {
        }
        .closes .close button {
          justify-content: center;
          align-items: center;
          border: none;
          width: 80px;
          height: 35px;
        }
        .buttonstyle {
          border: none;
          background: #0040b5;
          color: white;
          width: 120px;
          height: 35px;
        }
      `}</style>
    </>
  );
}

// export default function Modal({ modalBtn, modalHeader, modalContent }) {
//   const turnOnModal = () => {
//     const modal = document.querySelector('.modal');
//     const body = document.querySelector('body');
//     modal.classList.toggle('active');
//     body.style.overflow = 'hidden';
//   };
//   const turnOffModal = () => {
//     const modal = document.querySelector('.modal');
//     const body = document.querySelector('body');
//     modal.classList.remove('active');
//     body.style.overflow = 'auto';
//   };
//   return (
//     <>
//       <button onClick={turnOnModal}>{modalBtn}</button>
//       <div className="modal">
//         <div className="modalBody">
//           <div className="modalHeader">
//             {modalHeader}
//             <div className="turnOffModal" onClick={turnOffModal}>
//               <span className="line1"></span>
//               <span className="line2"></span>
//             </div>
//           </div>
//           <div className="modalContent">{modalContent}</div>
//         </div>
//       </div>
//       <style jsx>
//         {`
//           .modal {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100vw;
//             height: 100vh;

//             display: none;
//             z-index: 9998;
//             background-color: rgba(0, 0, 0, 0.2);
//           }
//           .modal.active {
//             display: block;
//           }
//           .modal .modalBody {
//             position: absolute;
//             top: 50vh;
//             left: 50vw;
//             width: 500px;
//             height: 500px;
//             transform: translateX(-50%) translateY(-50%);

//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;

//             color: black;
//             background-color: rgb(255, 255, 255);
//             border: 1px solid #d8d8d8;
//           }
//           .modal .modalBody .modalHeader {
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 2rem;
//             box-sizing: border-box;

//             display: flex;
//             justify-content: space-between;
//             align-items: center;

//             background-color: black;
//             padding: 0.5rem;
//             color: white;
//           }
//           .modal .modalBody .modalHeader .turnOffModal {
//             position: relative;
//             width: 2rem;
//             height: 2rem;
//           }
//           .modal .modalBody .modalHeader .turnOffModal > span {
//             position: absolute;
//             top: 50%;
//             width: 100%;
//             height: 2px;
//             background-color: white;
//           }
//           .modal .modalBody .modalHeader .turnOffModal .line1 {
//             transform: rotate(135deg);
//           }
//           .modal .modalBody .modalHeader .turnOffModal .line2 {
//             transform: rotate(45deg);
//           }
//           .modal .modalBody .modalContent {
//             width: 100%;
//             height: 100%;
//             box-sizing: border-box;
//             padding: 1rem;
//           }
//         `}
//       </style>
//     </>
//   );
// }
