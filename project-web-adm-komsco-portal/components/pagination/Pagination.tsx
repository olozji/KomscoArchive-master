import Link from 'next/link';

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  pageClick: any;
  className?: string;
}

const Pagination: React.FC<IPagination> = ({ total = 10, limit = 1, page, pageClick, ...props }) => {
  const numPages = Math.ceil(total / limit);
  console.log(numPages);

  return (
    <>
      <ul className={`pagination ${props.className}`}>
        <li className="item prevBtn first deactive" onClick={() => pageClick(1)}>
          {'<<'}
        </li>
        <li className="item deactive" onClick={() => pageClick(page - 1)}>
          {'<'}
        </li>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <li
              className={`item ${page === i + 1 ? 'active' : null}`}
              key={i + 1}
              onClick={() => pageClick(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        <li className="item nextBtn deactive" onClick={() => pageClick(page + 1)}>
          {'>'}
        </li>
        <li className="item nextBtn last deactive" onClick={() => pageClick(numPages)}>
          {'>>'}
        </li>
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

        .pagination > .item.&[aria-current] {
          background: deeppink;
          font-weight: bold;
          cursor: revert;
          transform: revert;
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
