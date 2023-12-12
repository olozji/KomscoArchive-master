import { ReactElement } from 'react';
import styled from 'styled-components';

const PopupLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .inner-wrap {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 5px;
    min-width: 850px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    padding-left: 30px;

    background: #f3f4f5;
    border-radius: 5px 5px 0px 0px;

    font-family: NanumSquare;
    font-size: 30px;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    position: relative;
    &:after {
      content: '';
      background-color: #266ae8;
      width: 280px;
      height: 6px;
      position: absolute;
      bottom: -3px;
      left: 0;
    }
  }
  .content {
    padding: 30px 17px;
    padding-bottom: 40px;
    max-height: 80vh;
    overflow-y: scroll;
  }
  .close {
    cursor: pointer;
  }
`;
export interface IPopup {
  title: string | React.ReactElement;
  onClickClose: () => void;
  children?: ReactElement | string;
}
const Popup = ({
  title,
  onClickClose = () => {
    return;
  },
  children,
}: IPopup) => {
  return (
    <PopupLayout>
      <div className="inner-wrap">
        <div className="top">
          <span>{title}</span>
          <img
            src="/img/icon_close-gray.svg"
            alt="close btn"
            onClick={onClickClose}
            className="close"
          />
        </div>
        <div className="content">{children}</div>
      </div>
    </PopupLayout>
  );
};

export default Popup;
