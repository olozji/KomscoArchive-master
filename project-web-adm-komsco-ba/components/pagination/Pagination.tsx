import Link from 'next/link';

export interface IPagination {}

const Pagination: React.FC<IPagination> = () => {
  return (
    <>
      <ul className="pagination">
        <li className="item prevBtn first deactive">{'<<'}</li>
        <li className="item deactive">{'<'}</li>
        <li className="item active">1</li>
        <li className="item">2</li>
        <li className="item">3</li>
        <li className="item">4</li>
        <li className="item skip">...</li>
        <li className="item">7</li>
        <li className="item">8</li>
        <li className="item">9</li>
        <li className="item nextBtn deactive">{'>'}</li>
        <li className="item nextBtn last deactive">{'>>'}</li>
      </ul>
      <style jsx>{`
        /* @@pagination */
        .pagination {
          gap: 2px;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          margin-top: 41px;
        }
        .pagination > .item {
          border-radius: 3px;
          background-color: #fff;
          border: 1px solid #dbdfe0;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .pagination > .item.prevBtn,
        .pagination > .item.nextBtn {
          color: #dbdfe0;
        }
        .pagination > .item.active {
          background-color: #282a2e;
          border-color: #282a2e;
          color: #fff;
        }
        .pagination > .item.deactive {
          color: #fff;
          background-color: #dbdfe0;
          cursor: default;
        }
        .pagination > .item.first,
        .pagination > .item.last {
          letter-spacing: -0.3px;
          margin: 0 1px;
        }
        .pagination > .item.skip {
          cursor: default;
        }
      `}</style>
    </>
  );
};

export default Pagination;
