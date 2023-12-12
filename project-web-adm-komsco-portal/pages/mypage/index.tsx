import { useEffect, useState } from 'react';
import tabstyles from './style/tab.module.css';
import styles from './style/style.module.css';
import PrimaryLayout from '../../components/layout/primaryLayout/PrimaryLayout';
import Pagination from '../../components/pagination/Pagination';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NextPageWithLayout } from '../page';
import Account from '../../services/AccountService';
import { ResData } from 'types/ResData';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import PopupComponent from 'components/modal/popup';

const Local: NextPageWithLayout = () => {
  const [myinfo, setMyInfo] = useState({
    mngrId: '', // 아이디
    mngrNm: '', // 이름
    mngrTlno: '', // 전화번호
    chgrEmail: '', // 이메일
    wrstTlno: '', // 직장 전화번호
    acntTypCd: '', // 계정유형 (코드)
    acntTypNm: '', // 계정유형 (명)
    mngrDprmNm: '', // 부서 명
    mngrTeamNm: '', // 팀 명
    mngrRsofNm: '', // 직책 명
    mngrGroupNm: '', // 관리자그룹 명
  });

  useEffect(() => {
    getMyInfoList();
  }, []);

  //공지사항 리스트 호출

  function getMyInfoList() {
    Account.getMyInfo()
      .then((response: any) => {
        const myinfo = response.body;
        console.log(myinfo);
        setMyInfo(myinfo);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

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

  // 토글버튼
  const appPush = { inputProps: { 'aria-label': 'Switch demo' } };
  const emailAlert = { inputProps: { 'aria-label': 'Switch demo' } };
  const talk = { inputProps: { 'aria-label': 'Switch demo' } };

  // 이메일 앞뒤자르기
  // email[0] = 이메일 앞자리
  // email[1] = 이메일 뒷자리
  const email = myinfo.chgrEmail.split('@');

  // 계정유형 조건에 따른 테이블 가져오기
  const accountTableCell = () => {
    return (
      <>
        {myinfo.acntTypCd === '00' ? (
          // 조폐공사관리자
          ''
        ) : myinfo.acntTypCd === '01' ? (
          // 지역서비스관리자
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
              <div>지역서비스</div>
            </TopStyledTableCell>
            <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
              <input value={'성남지역서비스1'} disabled />
            </TopStyledTableCell>
            <TopStyledTableCell
              sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
              align="left"
            >
              <div>지역</div>
            </TopStyledTableCell>
            <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
              <input value={'경기도 성남시'} disabled />
            </TopStyledTableCell>
          </TopStyledTableRow>
        ) : myinfo.acntTypCd === '02' ? (
          // 정책수당관리자
          // 지역서비스 선택후 정책수당 항목 다수 선택 가능
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
              <div>지역서비스</div>
            </TopStyledTableCell>
            <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
              <input value={'성남지역서비스1'} disabled />
            </TopStyledTableCell>
            <TopStyledTableCell
              sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
              align="left"
            >
              <div>지역</div>
            </TopStyledTableCell>
            <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
              <input value={'경기도 성남시'} disabled />
            </TopStyledTableCell>
          </TopStyledTableRow>
        ) : myinfo.acntTypCd === '03' ? (
          // 지역서비스 선택후 법인수당 항목 다수 선택 가능
          console.log('법인수당관리자')
        ) : myinfo.acntTypCd === '04' ? (
          // 전체지역서비스관리(선택없음)
          console.log('콜센터관리자')
        ) : myinfo.acntTypCd === '05' ? (
          // 전체지역서비스관리 (선택없음)
          console.log('보안관리자')
        ) : myinfo.acntTypCd === '06' ? (
          // 3선택 카드사 온라인결제처 cpm
          console.log('제휴사관리자')
        ) : myinfo.acntTypCd === '07' ? (
          console.log('총괄관리자')
        ) : myinfo.acntTypCd === '08' ? (
          console.log('지점관리자')
        ) : myinfo.acntTypCd === '09' ? (
          console.log('디자인관리자')
        ) : myinfo.acntTypCd === '10' ? (
          console.log('상품권발주제조관리자')
        ) : null}
      </>
    );
  };

  return (
    <>
      <section>
        <article className="description">
          <div className="destext">
            <div>관리대상 변경 및 추가는 상위관리자에게 문의해 주세요.</div>
          </div>
          <div className="backbutton">
            <button>메인</button>
            <button>수정</button>
          </div>
        </article>
        <div className="root">
          <section>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {/* 계정 ID */}
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
                      <div>
                        <b>*</b>계정 ID
                      </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      {/* {`${myinfo.mngrId}`} */}
                      {myinfo.mngrId}
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 관리자명 */}
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
                      <div>
                        <b>*</b>관리자명
                      </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      {myinfo.mngrNm}
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 휴대폰번호 */}
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
                      <div>
                        <b>*</b>휴대폰번호
                      </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      {myinfo.mngrTlno}
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 이메일 / 직장전화번호 */}
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
                      <div>이메일</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                      <input defaultValue={email[0]} /> @ <input defaultValue={email[1]} />
                      {/* 아직 이메일 뒷자리 select 하는 api없음 */}
                    </TopStyledTableCell>
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                      align="left"
                    >
                      <div>직장전화번호</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                      <input type="text" defaultValue={myinfo.wrstTlno} />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 부서/팀 / 직책 */}
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
                      <div> 부서/팀 </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                      <div className="inputwrapper">
                        <input defaultValue={myinfo.mngrDprmNm} />
                        <input defaultValue={myinfo.mngrTeamNm} />
                      </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                      align="left"
                    >
                      <div> 직책 </div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                      <input defaultValue={myinfo.mngrRsofNm} />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 계정유형 */}
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
                      <div>계정유형</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      <input defaultValue={myinfo.acntTypNm} disabled />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 관리자그룹 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TopStyledTableCell
                      className="multirow"
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 1' }}
                      align="left"
                    >
                      <div>관리자그룹</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      <input defaultValue={myinfo.mngrGroupNm} disabled />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 계정유형에 따라 그려지는 테이블 셀 */}
                  {accountTableCell()}
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
                      <div>지역서비스</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      <input value={'성남지역서비스1'} disabled />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <section>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {/* 메시지알림설정 */}
                  <TopStyledTableRow
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    {/* 메시지 알림설정 */}
                    <TopStyledTableCell
                      sx={{ bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                      align="left"
                      style={{ display: 'grid', alignItems: 'center' }}
                    >
                      <div> 메시지 알림설정 </div>
                    </TopStyledTableCell>
                    {/* 스위치 */}
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 4' }} align="left">
                      <Table>
                        <TableBody>
                          <TopStyledTableRow sx={{}}>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 1' }}
                              align="center"
                            >
                              <div>앱푸시알림</div>
                            </TopStyledTableCell>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 3' }}
                              align="center"
                            >
                              <div>
                                <Switch {...appPush} />
                              </div>
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                          <TopStyledTableRow sx={{}}>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 2' }}
                              align="center"
                            >
                              <div>이메일 알림</div>
                            </TopStyledTableCell>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                              align="center"
                            >
                              <div>
                                <Switch {...emailAlert} />
                              </div>
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                          <TopStyledTableRow sx={{}}>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 2' }}
                              align="center"
                            >
                              <div>알림톡 알림</div>
                            </TopStyledTableCell>
                            <TopStyledTableCell
                              // sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                              align="center"
                            >
                              <div>
                                <Switch {...talk} />
                              </div>
                            </TopStyledTableCell>
                          </TopStyledTableRow>
                        </TableBody>
                      </Table>
                    </TopStyledTableCell>
                    {/* 안내문 */}
                    <TopStyledTableCell
                      sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 6' }}
                      align="center"
                      style={{
                        display: 'grid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        whiteSpace: 'normal',
                      }}
                    >
                      <div>
                        관리자그룹에 연결된 업무에 따라 자동으로 메시지 알림을 받을 수 있습니다.
                        <br />
                        알림 수신을 원치 않음 경우, OFF로 변경하시면 됩니다.
                      </div>
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          {/* 비밀번호 변경 */}
          <section>
            <TableContainer>
              <Table>
                <TableBody>
                  {/* 신규 비밀번호 */}
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
                      <div>신규 비밀번호</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      <input />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                  {/* 신규 비밀번호 확인 */}
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
                      <div>신규 비밀번호 확인</div>
                    </TopStyledTableCell>
                    <TopStyledTableCell sx={{ gridRow: '1', gridColumn: 'span 5' }} align="left">
                      <input />
                    </TopStyledTableCell>
                  </TopStyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <article style={{ marginTop: '15px' }}>
              <div>영대문자, 숫자, 특수문자 포함 9자 이상으로 설정해주세요.</div>
            </article>
          </section>
        </div>
      </section>

      <style jsx>{`
        section {
          margin-top: 30px;
          margin-bottom: 50px;
        }
        .description {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
        .destext {
          font-size: 14px;
        }
        .multirow {
          display: flex;
          align-items: center;
        }
        .backbutton {
        }
        .inputwrapper {
          display: flex;
        }
        .backbutton button {
          border: none;
          background: blue;
          color: white;
          width: 120px;
          height: 35px;
        }
        .backbutton button:nth-child(1) {
          background: #ccc;
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

export default Local;

Local.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'마이페이지'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
