import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function createPageList(maxPage: number, remainder: number) {
  const pageList = [];
  for (let i = 0; i < maxPage; i++) {
    if (i + 1 === maxPage && remainder !== 0) {
      const tempList = new Array(remainder);
      for (let j = 1; j <= remainder; j++) {
        tempList[j - 1] = i * 10 + j;
      }
      pageList.push(tempList);
    } else {
      const tempList = new Array(9);
      for (let j = 1; j <= 10; j++) {
        tempList[j - 1] = i * 10 + j;
      }
      pageList.push(tempList);
    }
  }
  // console.log(pageList);
  return pageList;
}

const NewPagination: React.FC<any> = ({ totCnt = 20, pageSize, changePage }) => {
  const [page, setPage] = useState(1);
  const [tenPage, setTenPage] = useState(0);

  useEffect(() => {
    console.log(page);
    const active = document.getElementsByClassName('active');
    // active된 모든 element 찾아서 pagination에 해당하는 element만 active class 삭제하는 코드
    // pagination에 해당하는 element만 선별하는 방식 tagName==='LI'로 충분할지 모르겠음
    for (let i = 0; i < active.length; i++) {
      active[i].tagName === 'LI' && active[i].classList.remove('active');
    }
    document.getElementById(page.toString()).classList.add('active');
  }, [page]);
  useEffect(() => {
    maxPage = Math.ceil(totCnt / Number(pageSize));
    remainder = totCnt % Number(pageSize);
    pageList = createPageList(maxPage, remainder);
    setPage(1);
    setTenPage(0);
    document.getElementById(page.toString()) &&
      document.getElementById(page.toString()).classList.add('active');
    // console.log(totCnt);
  }, [totCnt]);
  useEffect(() => {
    setPage(1);
    setTenPage(0);
  }, [pageSize]);

  let maxPage = Math.ceil(totCnt / Number(pageSize));
  let remainder = totCnt % Number(pageSize);
  let pageList = createPageList(maxPage, remainder);

  const handlePage = (e) => {
    switch (e.target.id) {
      case 'firstBtn':
        if (tenPage !== 0) {
          setTenPage(0);
        }
        setPage(1), changePage(1);
        break;
      case 'prevBtn':
        if (tenPage !== 0) {
          setTenPage(tenPage - 1);

          setPage(pageList[tenPage - 1][0]), changePage(pageList[tenPage - 1][0]);
        }
        break;
      case 'nextBtn':
        if (tenPage !== maxPage - 1) {
          setTenPage(tenPage + 1);

          setPage(pageList[tenPage + 1][0]), changePage(pageList[tenPage + 1][0]);
        }
        break;
      case 'lastBtn':
        setTenPage(maxPage - 1), changePage(maxPage - 1);
        setPage(totCnt), changePage(totCnt);
        break;
      default:
        if (Number(e.target.innerText) !== page) {
          setPage(Number(e.target.innerText)), changePage(Number(e.target.innerText));
        }
    }
  };
  return (
    <>
      <ul className="pagination">
        {page !== 1 && (
          <li id="firstBtn" className="item prevBtn first pageBtn" onClick={handlePage}>
            {'<<'}
          </li>
        )}
        {tenPage !== 0 && (
          <li id="prevBtn" className="item pageBtn" onClick={handlePage}>
            {'<'}
          </li>
        )}
        {totCnt === 0 ? (
          <li className="item" id={'1'} key={1} onClick={handlePage}>
            1
          </li>
        ) : pageList[tenPage] ? (
          pageList[tenPage].map((e, idx) => {
            return (
              <li
                className="item"
                id={tenPage * 10 + idx + 1}
                key={tenPage * 10 + idx + 1}
                onClick={handlePage}
              >
                {e}
              </li>
            );
          })
        ) : (
          <></>
        )}
        {tenPage !== pageList.length - 1 && totCnt !== 0 ? (
          <li id="nextBtn" className="item nextBtn pageBtn" onClick={handlePage}>
            {'>'}
          </li>
        ) : (
          <></>
        )}
        {page !== totCnt && totCnt !== 0 ? (
          <li id="lastBtn" className="item nextBtn last pageBtn" onClick={handlePage}>
            {'>>'}
          </li>
        ) : (
          <></>
        )}
      </ul>
      <style jsx>{`
        /* @@pagination */
        .pagination {
          gap: 5px;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          margin: 4rem 0 2rem;
        }
        .pagination > .item {
          border-radius: 5px;
          background-color: #fff;
          border: 1px solid #dbdfe0;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
          cursor: pointer;
        }
        .pagination > .item.active {
          background-color: #282a2e;
          border-color: #282a2e;
          color: #fff;
        }
        .pagination > .item.pageBtn {
          color: #fff;
          background-color: #559ad5;
          cursor: cursor;
        }
      `}</style>
    </>
  );
};

export default NewPagination;
