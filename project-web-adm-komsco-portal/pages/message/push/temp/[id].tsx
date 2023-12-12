import PrimaryLayout from '../../../../components/layout/primaryLayout/PrimaryLayout';
import { NextPageWithLayout } from '../../../page';
import styles from '../../style/style.module.css';
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
import { FormControlLabel, RadioGroup, TextField } from '@mui/material';
import Mesage from '../../../../services/MesageService';
import CodeService from '../../../../services/CodeService';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCodeList, grpSelectFilter, resCodeData } from '@/lib/utils/codeProvider';
import { codeState } from '@/lib/store/fetures/codeSlice';
import { RootState } from '@/lib/store';
import FormControl from '@/components/form/formControl/FormControl';
import { AppPushTemplatePDetail, AppPushTemplatePost } from '@/types/Message';
import styledC from 'styled-components';

import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faSquare,
  faPlusSquare,
  faMinusSquare,
  faArrowAltCircleRight,
  faArrowAltCircleDown,
  faCaretSquareRight,
  faCaretSquareDown,
} from '@fortawesome/free-regular-svg-icons';
import BodyBox from '@/components/bodybox/bodybox';
import FormSelect from '@/components/form/formSelect/FormSelect';
import * as React from 'react';

const TextBox = styledC.div`
display: flex;
flex-direction: column;
gap: 3px;
color: #555;
:first-child {
  margin-top: 10px;
}
:last-child {
  margin-bottom: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.el_input_radio {
  margin-right: 5px;
}

.content_text {
  font-size: 13.5px;
  line-height: 18px;
}
.content_dsc {
  line-height: 14px;
}
`;

const CheckBoxWrap = styledC(TextBox)`
flex-direction: row;
margin-bottom: 5px;
.checkbox {
  display: flex;
  align-items: center;
  margin-right: 20px;

  .el_input_radio {
    margin-right: 3px;
  }
}
`;

const RadioSpan = styledC.span`
font-family: 'NanumSquare';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 17px;
color: #474d52;
`;

const RadioWrap = styledC.div`
margin-right: 37px;
`;

const Radio = styledC.input`
  margin-right: 12px;
  appearance: none;
  border: 1px solid #474d52;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  :checked {
    background-color: #474d52;
    /* background-image: */
  }
`;

const Wrap = styledC.div`
  border-right: 0.5px solid #9b9b9b;
  border-top: 0.5px solid #9b9b9b;
  .wrapTitle {
    border-left: 0.5px solid #9b9b9b;
    border-bottom: 0.5px solid #9b9b9b;
    color: #282a2e;
    font-weight: 800;
    font-size: 20px;
    background-color: #dfe0e2;
    padding: 15px 30px;
    display: flex;
    align-items: center;
  }

  .wrapTitle--center {
    border-left: 0.5px solid #9b9b9b;
    border-bottom: 0.5px solid #9b9b9b;
    color: #282a2e;
    font-weight: 800;
    font-size: 20px;
    background-color: #dfe0e2;
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrap2 = styledC.div`
margin-top: 50px;
  border-right: 0.5px solid #9b9b9b;
  border-top: 0.5px solid #9b9b9b;
  .wrapTitle {
    border-left: 0.5px solid #9b9b9b;
    border-bottom: 0.5px solid #9b9b9b;
    color: #282a2e;
    font-weight: 800;
    font-size: 20px;
    background-color: #dfe0e2;
    padding: 15px 30px;
    display: flex;
    align-items: center;
  }

  .wrapTitle--center {
    border-left: 0.5px solid #9b9b9b;
    border-bottom: 0.5px solid #9b9b9b;
    color: #282a2e;
    font-weight: 800;
    font-size: 20px;
    background-color: #dfe0e2;
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BtnWarp = styledC.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Btn = styledC.button`
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 8px 28px 6px 28px;
  background: #fbfafa;
  border: 1px solid #a1a1a1;
  border-radius: 3px;
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #282a2e;
`;

const BlackBtn = styledC(Btn)`
  color: #fbfafa;
  background-color: #282a2e;
`;

const DefaultText = styledC.div`
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #474d52;
`;

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

  const [detail, setDetail] = useState<any>({});

  const getData = () => {
    const idData = String(window.location.href).split('/');
    console.log(idData[6]);
    const idData2 = idData[6];
    if (idData2 != null) {
      Mesage.selectAppTempDetail(idData2).then((response: any) => {
        if (response != null) {
          setDetail(response.body);
          setPutParams(response.body);
        }
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [appLinkDivCd, setAppLinkDivCd] = useState([
    { label: '미사용', value: '00' },
    { label: '내부', value: '01' },
    { label: '외부', value: '02' },
  ]);

  const [putParams, setPutParams] = useState({
    tmpltNm: '',
    appPushLinkDivCd: '',
    linkUrl: '',
    mgmtSysCd: '',
    appDivCd: '',
    msgSndTitl: '',
    msgSndCtnt: '',
  });
  const [appList, setAppList] = useState([
    { label: '전체', value: '' },
    { label: '통합', value: '00' },
    { label: '광역', value: '01' },
  ]);
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [linknSiteCode, setLinknSiteCode] = useState([]);
  const dispatch = useDispatch();

  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      const resList2 = findCodeList('3010', codeData.code); //공통코드 특정코드 필터링
      setLinknSiteCode(grpSelectFilter(resList2, '3010', 'cdDtlDesc', 'dtlCd', true));
    } else {
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };

  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setLinknSiteCode(grpSelectFilter(res, '3010', 'cdDtlDesc', 'dtlCd', true)); // 커스텀 실행
  };

  const handleParams = (name: string, _value: any) => {
    setPutParams({ ...putParams, [name]: _value });
  };

  function putData(reqParams: any) {
    Mesage.putAppTemp(detail.tmpltId, {
      ...reqParams,
    })
      .then((response: any) => {
        window.history.back();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleUpdate = () => {
    putData(putParams);
  };

  useEffect(() => {
    getGrpCode();
  }, []);

  console.log(detail);

  return (
    <>
      <section>
        <BtnWarp>
          <Btn onClick={() => window.history.back()}>목록</Btn>
          <div>
            <BlackBtn onClick={() => handleUpdate()}>수정</BlackBtn>
          </div>
        </BtnWarp>
        <Wrap>
          <BodyBox title="템플릿ID">
            <div className="el_label">{detail.tmpltId}</div>
          </BodyBox>
          <BodyBox title="템플릿명">
            <div className="el_input__wrap">
              <input
                type="text"
                className="el_input el_input__lg"
                style={{ height: '40px' }}
                placeholder={detail.tmpltNm}
                onChange={(e) => handleParams('tmpltNm', e.target.value)}
              />
            </div>
          </BodyBox>
          <BodyBox title="링크">
            <div className="el_input__wrap">
              <FormSelect
                items={appLinkDivCd}
                type="type2"
                size="large"
                className="hp_mr-15"
                onChange={(e) => handleParams('appPushLinkDivCd', e.target.value)}
              />
              <input
                type="text"
                className="el_input el_input__lg"
                style={{ height: '40px' }}
                placeholder={detail.linkUrl == null ? '링크를 입력하세요' : detail.linkUrl}
                onChange={(e) => handleParams('linkUrl', e.target.value)}
              />
            </div>
          </BodyBox>
          <BodyBox title="관리시스템">
            <FormSelect
              items={linknSiteCode}
              type="type2"
              size="large"
              className="hp_mr-15"
              defaultValue=""
              onChange={(e) => handleParams('mgmtSysCd', e.target.value)}
            />
          </BodyBox>
          <BodyBox title="APP구분">
            <FormSelect
              items={appList}
              type="type2"
              size="large"
              className="hp_mr-15"
              defaultValue=""
              onChange={(e) => handleParams('appDivCd', e.target.value)}
            />
          </BodyBox>
          <BodyBox title="메시지제목">
            <div className="el_input__wrap">
              <input
                type="text"
                className="el_input el_input__lg"
                style={{ height: '40px' }}
                placeholder={detail.msgSndTitl}
                onChange={(e) => handleParams('msgSndTitl', e.target.value)}
              />
            </div>
          </BodyBox>
          <BodyBox title="메시지내용">
            <div className="el_input__wrap">
              <input
                type="text"
                className="el_input el_input__lg"
                style={{ height: '40px' }}
                placeholder={detail.msgSndCtnt}
                onChange={(e) => handleParams('msgSndCtnt', e.target.value)}
              />
            </div>
          </BodyBox>
          <BodyBox title="사용여부">
            <div style={{ display: 'flex' }}>
              <RadioWrap>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Radio
                      type="radio"
                      name="selectAccess"
                      checked={detail?.uzYn === 'Y'}
                      value="Y"
                      onChange={(e) => handleParams('uzYn', e.target.value)}
                    />
                  </div>
                  <RadioSpan>Y</RadioSpan>
                </label>
              </RadioWrap>
              <RadioWrap>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Radio
                      type="radio"
                      name="selectAccess"
                      checked={detail?.uzYn === 'N'}
                      value="N"
                      onChange={(e) => handleParams('uzYn', e.target.value)}
                    />
                  </div>
                  <RadioSpan>N</RadioSpan>
                </label>
              </RadioWrap>
            </div>
          </BodyBox>
        </Wrap>
        <Wrap2>
          <BodyBox title={['등록일자', '등록자']} isTwoRows={true}>
            {[
              <DefaultText key={`BodyBox-DefaultText-1`}>{detail?.frstRegDttm ?? ''}</DefaultText>,
              <DefaultText key={`BodyBox-DefaultText-2`}>{detail?.frstRgsrNm ?? ''}</DefaultText>,
            ]}
          </BodyBox>
        </Wrap2>
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
    <PrimaryLayout title={'템플릿 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
