import { useEffect, useState } from 'react';
import NoticeMng from '../services/NoticeService';
import { ResData } from 'types/ResData';

// export async function getServerSideProps(context) {
//   const props = context.query;
//   return { props };
// }

// export async function getServerSideProps(context) {
//   const props = context.query;
//   return {
//     props: { props }, // will be passed to the page component as props
//   };
// }

const noticePopup = (props) => {
  const [closeEvent, setCloseEvent] = useState(false);
  const closeModal = () => {
    console.log('-----closeEvent-----');
    setCloseEvent(!closeEvent);
    console.log(closeEvent);
  };

  const [popupNoticeList, setPopupNoticeList] = useState([]);
  //공지사항 리스트 호출
  function getnotice() {
    NoticeMng.selectPopupNoticeList()
      .then((response: any) => {
        const notice = response.body;
        console.log(notice);
        setPopupNoticeList(notice);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  useEffect(() => {
    getnotice();
  }, []);

  console.log(props.id);
  console.log(popupNoticeList);
  console.log(popupNoticeList.length);
  popupNoticeList.sort();

  return (
    <>
      {popupNoticeList.map((p, index) => {
        // console.log(props.id);
        // console.log(p.cmknSeq);

        return (
          <div key={index}>
            {props.id ? (
              <>
                <section>
                  <article className="popuptitlewrapper">
                    <div>공지사항</div>
                  </article>
                  <article className="noticetitle">
                    <div>제목 : {p.cmknTitl}</div>
                    <div>등록일 : 2022-07-01</div>
                  </article>
                  <article className="popup_des">
                    <p></p>
                  </article>
                  <article className="button_wrapper">
                    <div>
                      <label className="check_box_label">
                        <input className="closecheck" type="checkbox" value=""></input>
                        <p>다시 열지 않기</p>
                      </label>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="canclebutton"
                        onClick={() => {
                          // window.close();
                          closeModal();
                        }}
                      >
                        닫기
                      </button>
                    </div>
                  </article>
                </section>
                <style jsx>{`
                  .popuptitlewrapper {
                    padding: 10px;
                    background: black;
                    color: white;
                    font-size: 14px;
                    position: fixed;
                    width: 100%;
                    height: 40px;
                  }
                  .noticetitle {
                    position: fixed;
                    top: 40px;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    font-size: 14px;
                    width: 100%;
                  }
                  .popup_des {
                    position: fixed;
                    top: 80px;
                    width: 600px;
                    height: 700px;
                    padding: 10px;
                    overflow: auto;
                    font-size: 16px;
                  }
                  .popup_des p {
                    word-break: break-word;
                  }
                  .button_wrapper {
                    position: fixed;
                    bottom: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 60px;
                    padding: 10px;
                  }
                  .check_box_label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  }
                  .button_wrapper button {
                    cursor: pointer;
                    width: 80px;
                    height: 35px;
                    border: none;
                  }
                  .closecheck {
                    width: 15px;
                    height: 15px;
                  }
                `}</style>
              </>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default noticePopup;
