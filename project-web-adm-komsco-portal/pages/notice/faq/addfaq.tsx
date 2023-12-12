import styles from './../style/notice.module.css';
import NoticeMng from '../../../services/NoticeService';
import { ResData } from '../../../types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const addFaq = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F3F4F5',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
      fontSize: 15,
      color: 'black',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const TopStyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
    },
  }));

  const TopStyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
      fontSize: 15,
      color: 'black',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <section>
        <article className="popuptitlewrapper">
          <div>메뉴얼 등록</div>
        </article>
        <article>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 230, maxWidth: 600 }} aria-label="customized table">
              <TableBody>
                {/* 관리시스템 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>관리시스템</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                    <div>
                      <select name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                        <option value="" className="item">
                          관리시스템 구분
                        </option>
                        <option value="" className="item">
                          지류_통합1 사랑상품권
                        </option>
                        <option value="" className="item">
                          휴효기간 0923
                        </option>
                        <option value="" className="item">
                          종로FP테스트 상품권
                        </option>
                        <option value="" className="item">
                          서울 지역상품권
                        </option>
                      </select>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 계정유형 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>계정유형</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 노출대상 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>노출대상</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                    <div>
                      <div></div>
                      <br />
                      <div></div>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 메뉴얼명 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>메뉴얼명</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 설명 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>설명</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 파일버전 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>파일버전</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 2' }} align="left">
                    <div></div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 첨부파일 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>첨부파일</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 2', padding: 'inherit' }}
                    align="left"
                  >
                    <div style={{ width: '100%' }}>
                      <Table sx={{}}>
                        <TableBody>
                          <TopStyledTableRow>
                            <TopStyledTableCell>
                              <div>
                                <button>파일찾기</button>
                              </div>
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                          <TopStyledTableRow>
                            <TopStyledTableCell>
                              <div className="fileupload_des">
                                선택한 파일명과 용량이 표시됩니다.(최대 5MB)
                              </div>
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
                {/* 게시여부 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>게시여부</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 1' }} align="left">
                    <div></div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="popup_des">
            <div>※ 매뉴얼명은 사용자+서비스구분+매뉴명+업로드 버전을 표기해주세요.</div>
            <div>(예 :지자체용_관리자웹_가맹점관리_매뉴얼_v1.0)</div>
          </div>
          <div className="button_wrapper">
            <button
              type="button"
              className="canclebutton"
              onClick={() => {
                window.close();
              }}
            >
              취소
            </button>
            <button type="button" className="submitbutton">
              저장
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
        }
        .popup_des {
          padding: 10px;
          font-size: 14px;
        }
        .fileupload_des {
          font-size: 12px;
          color: #ccc;
        }
        .button_wrapper {
          display: flex;
          margin-top: 10px;
          max-width: 600px;
          justify-content: center;
        }
        .button_wrapper button {
          cursor: pointer;
          width: 80px;
          height: 35px;
          margin-left: 10px;
          margin-right: 10px;
          border: none;
        }
        .submitbutton {
          background: #0040b5;
          color: white;
        }
      `}</style>
    </>
  );
};

export default addFaq;
