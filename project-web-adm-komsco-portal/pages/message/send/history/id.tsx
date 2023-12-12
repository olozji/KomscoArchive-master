import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/message.module.css';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { flexbox } from '@mui/system';
import { Radio } from '@mui/material';

const User: NextPageWithLayout = () => {
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
      backgroundColor: '#eee',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
  }));

  const TopStyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
      fontSize: 15,
      color: 'black',
    },
  }));

  const InsideTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: 15,
      whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      whiteSpace: 'nowrap',
      border: 0,
    },
  }));

  return (
    <>
      <section>
        <article>
          <div className="backbutton">
            <button>목록</button>
          </div>
        </article>
        <section>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* 발송내역 ID / 발송구분 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>발송내역 ID</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>발송구분</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 템플릿 ID / 템플릿명 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>템플릿 ID</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>템플릿명</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 요청일시 / 요청시스템/요청자 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>요청일시</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                    align="left"
                  >
                    <div>요청시스템/요청자</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 4' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 발송유형 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>발송유형</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ gridRow: '1', gridColumn: 'span 5' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
                {/* 발송메세지 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    className="multirow"
                    sx={{ bgcolor: '#eee', gridRow: '3', gridColumn: 'span 1' }}
                    align="left"
                  >
                    <div>발송메세지</div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    style={{ padding: 0 }}
                    sx={{ gridRow: '3', gridColumn: 'span 5' }}
                    align="left"
                  ></TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <section>
          {/* 검색wrapper */}
          <div className={styles.searchInput}>
            <div className={styles.serchInputRowWrapper}>
              <div className="detailsubtitle">지역서비스 검색</div>
              <div className={styles.serchInputRow}>
                <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item" disabled selected hidden>
                    지역서비스명
                  </option>
                  <option value="" className="item">
                    지류_통합1 사랑상품권
                  </option>
                  <option value="" className="item">
                    휴효기간 0923
                  </option>
                  <option value="" className="item">
                    종로FP테스트 상품권ddddddddd
                  </option>
                  <option value="" className="item">
                    서울 지역상품권
                  </option>
                </select>
                <input placeholder="검색어를 입력해주세요."></input>
                <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item" disabled selected hidden>
                    지역서비스명
                  </option>
                  <option value="" className="item">
                    지류_통합1 사랑상품권
                  </option>
                  <option value="" className="item">
                    휴효기간 0923
                  </option>
                  <option value="" className="item">
                    종로FP테스트 상품권ddddddddd
                  </option>
                  <option value="" className="item">
                    서울 지역상품권
                  </option>
                </select>
              </div>
              <div className={styles.serchInputRow}>
                <select required name="" id="" className="el_input_select2 hp_mr-15 intgr_select">
                  <option value="" className="item" disabled selected hidden>
                    회원명
                  </option>
                  <option value="" className="item">
                    지류_통합1 사랑상품권
                  </option>
                  <option value="" className="item">
                    휴효기간 0923
                  </option>
                  <option value="" className="item">
                    종로FP테스트 상품권ddddddddd
                  </option>
                  <option value="" className="item">
                    서울 지역상품권
                  </option>
                </select>
                <input placeholder="검색어를 입력해주세요."></input>
                <div className={styles.submitButton}>
                  <button className="el_getBtn">검색</button>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </section>
        <section>
          <div className={styles.tabmenuSearch}>
            <div className={`${styles.bl_middleWrap_left}`}>
              <button>엑셀다운로드</button>
            </div>
            <div className={`${styles.bl_middleWrap_right}${styles.tabmenuSearchResult}`}>
              <div className="bl_middleWrap_right_result">
                <span className={styles.resultNum}>총</span>
                <span className="hp_txt-red hp_txt-bold">333</span>
                <span>건</span>
                <span>&nbsp;성공 : 100건, 대기 : 20건, 실패 : 2건</span>
              </div>

              <select name="" id="" className="un_pageItemSelect">
                <option value="10" className="item">
                  10개씩 보기
                </option>
                <option value="20" className="item">
                  20개씩 보기
                </option>
                <option value="30" className="item">
                  30개씩 보기
                </option>
                <option value="30" className="item">
                  50개씩 보기
                </option>
                <option value="30" className="item">
                  100개씩 보기
                </option>
              </select>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    번호
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    발신정보
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    회원명
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    회원ID
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    지역서비스
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    발송일시
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    알림톡 우회발송여부
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    발송상태
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    실패사유
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableHead>
              <TableBody>
                {/* 등록일자 / 등록자 */}
                <TopStyledTableRow
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gridTemplateRows: 'auto',
                  }}
                >
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                  <TopStyledTableCell
                    sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                    align="center"
                  >
                    <div></div>
                  </TopStyledTableCell>
                </TopStyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
      <style jsx>{`
        section {
          margin-bottom: 50px;
        }
        .multirow {
          display: flex;
          align-items: center;
        }
        .backbutton {
          width: 100%;
          text-align: right;
          margin-bottom: 30px;
        }
        .backbutton button {
          border: none;
          background: blue;
          color: white;
          width: 120px;
          height: 35px;
          margin-right: 10px;
        }
        .detailsubtitle {
          font-size: 14px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'발송내역 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
