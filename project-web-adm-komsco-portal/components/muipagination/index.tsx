import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from '@mui/material';

const MuiPagination = ({ callApi, page, pageChange, totalPage, pageSize }) => {
  const [lastPageNumber, setLastPageNumber] = useState(null);

  useEffect(() => {
    callApi(page);
  }, [page]);

  useEffect(() => {
    if (totalPage != null) {
      setLastPageNumber(Math.ceil(totalPage / pageSize));
    }
  }, [totalPage, pageSize]);

  const handleChage = (e, p) => {
    pageChange(p);
  };

  return (
    <Pagination
      count={lastPageNumber}
      size="large"
      color="primary"
      onChange={handleChage}
    ></Pagination>
  );
};

export default MuiPagination;
