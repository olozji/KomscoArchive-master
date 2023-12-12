import { useState } from 'react';
import FloatMenu from '../../components/app/floatMenu/FloatMenu';
import Header from '../../components/app/header/Header';
import BaseToggle from '../../components/app/inputs/toggle/base/BaseToggle';
import Voucher from '../../components/app/main/voucher/Voucher';

const Preview = () => {
  const [money, setMoney] = useState('1440000');
  return (
    <>
      <div className="bl_preview ly_preview">
        <div className="bl_preview_ttl">총 보유금액</div>
        <div className="bl_preview_moneyWrap">
          <span className="bl_preview_money hp_font-roboto">{money}</span>
          <span className="bl_preview_won">원</span>
        </div>
        <div className="bl_preview_moreWrap">
          <span className="bl_preview_more">내 지갑 전체보기</span>
          <img
            src="./assets/img/icon_right-arrow__gray.svg"
            alt="right arrow"
            className="bl_preview_arrow"
          />
        </div>
      </div>
      <style jsx>{`
        .bl_preview {
          color: #333;
        }
        .bl_preview_ttl {
          /* font-family: Inter; */
          font-size: 1.4rem;
          font-weight: 500;
          line-height: 1.7rem;
          letter-spacing: -0.06em;
        }
        .bl_preview_moneyWrap {
          display: flex;
          gap: 4px;
          margin-bottom: 5px;
          align-items: baseline;
        }
        .bl_preview_money {
          font-size: 3.2rem;
          font-weight: 500;
          line-height: 3.75rem;
        }
        .bl_preview_won {
          font-size: 1.6rem;
          font-weight: 500;
        }
        .bl_preview_moreWrap {
          position: relative;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.45rem;
          letter-spacing: 0.06em;
          border: 1px solid rgba(51, 51, 51, 0.3);
          border-radius: 28px;
          padding: 6px 26px 7px 16px;
          cursor: pointer;
        }
        .bl_preview_more {
        }
        .bl_preview_arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </>
  );
};
const UserApp = () => {
  return (
    <>
      <div className="ly_container">
        <Header />
        <Preview />
        <Voucher
          data={[
            {
              key: '상품권',
              value: 50000,
            },
            {
              key: '정책수당',
              value: 100000,
            },
            {
              key: '캐시asdsad백',
              value: 20000,
            },
            {
              key: '체크카드',
              value: 30000,
            },
          ]}
          title="상품권명"
        />
        <FloatMenu />
      </div>
      <style jsx>
        {`
          .ly_container {
            background-color: #f3f4f5;
            padding: 20px;
            max-width: 768px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
};

export default UserApp;
