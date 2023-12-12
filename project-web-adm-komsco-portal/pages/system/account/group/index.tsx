import PrimaryLayout from '@/components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from './../style/account.module.css';
import styled from 'styled-components';
import Pagination from '@/components/pagination/Pagination';
import Account from '../../../../services/AccountService';
import { ResData } from 'types/ResData';
import { resCodeData, findCodeList, grpSelectFilter } from '@/lib/utils/codeProvider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import { codeState } from 'lib/store/fetures/codeSlice';
import FormSelect from '@/components/form/formSelect/FormSelect';
import FormControl from '@/components/form/formControl/FormControl';
import Table from '@/components/table/Table';
import FormDate from '@/components/form/formDate/FormDate';

const GroupLayout = styled.div`
  .bl_content_filterWrap_top {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bl_content_filterWrap_middle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bl_content_filterWrap_bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .un_wave {
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }

  .bl_middleWrap {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 15px;
  }
  .bl_middleWrap_left {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }
  .bl_middleWrap_right {
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: #474d52;
    display: flex;
    flex-direction: column;
  }
  .bl_middleWrap_right__top {
    display: flex;
    gap: 10px;
  }
  .bl_middleWrap_right__bottom {
    display: flex;
    justify-content: flex-end;
  }
  .bl_middleWrap_right_result {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 1px solid #474d52;
    padding-right: 9.5px;
    margin-right: 9.5px;
  }
  .resent-item {
    font-size: 15px;
  }
  .un_pageItemSelect {
    color: #474d52;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url(../img/icon-downArrow-gray.png);
    background-repeat: no-repeat;
    background-position-x: 93%;
    background-position-y: 50%;
    background-color: #ffffff;
    padding-right: 20px;
  }
`;
const Btn = styled.button`
margin-right: 10px;
margin-bottom: 0px;
padding: 8px 28px 6px 28px;
background: #fbfafa;
border: 1px solid #a1a1a1;
border-radius: 3px;
font-family: 'NanumSquare';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 11px;
color: #282a2e;
}
`;

const User: NextPageWithLayout = () => {
  const [accountList, setAccountList] = useState([]);
  const [accountListCnt, setAccountListCnt] = useState(0);
  const [grpList, setGrpList] = useState([]);
  const [useList, setUseList] = useState([
    { label: '사용여부', value: '' },
    { label: '미사용', value: 'N' },
    { label: '사용', value: 'Y' },
  ]);

  const codeData = useSelector((state: RootState) => state.codeSlice);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState({
    mngrGroupNm: '',
    uzYn: '',
    acntTypCd: '',
    authTypCd: '00',
    pageNum: 1,
    pageSize: 10,
  });

  const columns = [
    {
      header: '번호',
      name: 'mngrGroupSeq',
    },
    {
      header: '계정유형',
      name: 'acntTypNm',
    },
    {
      header: '관리자그룹 명',
      name: 'mngrGroupNm',
      link: {
        idName: 'mngrGroupSeq',
        pathname: 'group',
        query: {},
      },
    },
    {
      header: '사용여부',
      name: 'uzYn',
    },
    {
      header: '등록자',
      name: 'frstRgsrNm',
    },
    {
      header: '등록일',
      name: 'frstRegDttm',
    },
  ];

  const handleSearchParams = (name: string, _value: any) => {
    setSearchParams({ ...searchParams, [name]: _value });
    (name === 'pageSize' || name === 'pageNum') && handleSearchApi(name, _value);
  };

  const handleSearchApi = (name: string, _value: any) => {
    getAccount({ ...searchParams, [name]: _value });
  };

  function getAccount(reqParams: any) {
    Account.selectAccountGroupList({
      ...reqParams,
    })
      .then((response: any) => {
        const accountList = response.body;
        console.log(accountList.authList);
        setAccountList(accountList.authList);
        setAccountListCnt(accountList.totCnt);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  }

  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      //최초실행시 아닐시
      const resList = findCodeList('1074', codeData.code); //공통코드 특정코드 필터링
      setGrpList(grpSelectFilter(resList, '1074', 'cdDtlDesc', 'dtlCd', true)); //특정코드 필터링 된 것 Select형식 등 편의 맞게 가공
    } else {
      //최초실행시
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };
  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setGrpList(grpSelectFilter(res, '1074', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
  };

  useEffect(() => {
    getGrpCode(); //공통코드 호출
    getAccount(searchParams);
  }, []);

  useEffect(() => {
    console.log(grpList);
  }, [grpList]);

  return (
    <>
      <section>
        {/* 검색wrapper */}
        <GroupLayout>
          <div className="bl_content_filterWrap">
            <div className="bl_content_filterWrap_top">
              <label htmlFor="" className="el_label el_label__first">
                등록일
              </label>
              <FormDate />
              <span className="hp_mr-10 un_wave">~</span>
              <FormDate className="hp_mr-30" />
              <label htmlFor="" className="el_label">
                사용여부
              </label>
              <FormSelect
                items={useList}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                isFstDisabled
                onChange={(e) => handleSearchParams('uzYn', e.target.value)}
              />
              <label htmlFor="" className="el_label">
                계정유형
              </label>
              <FormSelect
                items={grpList}
                type="type2"
                size="large"
                className="hp_mr-15"
                defaultValue=""
                onChange={(e) => handleSearchParams('acntTypCd', e.target.value)}
              />
              <label htmlFor="" className="el_label"></label>
            </div>
            <div className="bl_content_filterWrap_bottom">
              <label htmlFor="" className="el_label el_label__first">
                검색어
              </label>
              <FormControl
                placeholder="검색어를 입력하세요."
                size="lg"
                className=""
                onChange={(e) => handleSearchParams('mngrGroupNm', e.target.value)}
              />
              <button className="el_getBtn" onClick={() => getAccount(searchParams)}>
                조회
              </button>
            </div>
          </div>
        </GroupLayout>

        <div className={styles.tabmenuSearch}>
          <div className={`${styles.bl_middleWrap_left}`}>
            <div className="bl_middleWrap_right_result">
              <span className={styles.resultNum}>검색결과 :</span>
              <span className="hp_txt-red hp_txt-bold">{accountListCnt}</span>
              <span>개</span>
            </div>
          </div>
          <div className={`${styles.bl_middleWrap_right}`}>
            <a href="./groupapp">
              <div className="btnwarp">
                <Btn>관리자그룹등록</Btn>
              </div>
            </a>

            <select
              name=""
              id=""
              className="un_pageItemSelect"
              value={searchParams.pageSize}
              onChange={(e) => handleSearchParams('pageSize', e.target.value)}
            >
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
        <Table items={accountList} columns={columns}></Table>
        <Pagination
          total={accountListCnt ?? 0}
          limit={searchParams.pageSize ?? 10}
          page={searchParams.pageNum ?? 1}
          pageClick={(value: number) => handleSearchParams('pageNum', value)}
        />
      </section>
      <style jsx>{``}</style>
    </>
  );
};

export default User;

User.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'관리자그룹관리'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
