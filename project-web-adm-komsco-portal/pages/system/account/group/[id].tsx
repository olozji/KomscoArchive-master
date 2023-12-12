import PrimaryLayout from '@/components/layout/primaryLayout/PrimaryLayout';
import BodyBox from '@/components/bodybox/bodybox';
import MainButton from '@/components/button/Button';
import FormControl from '@/components/form/formControl/FormControl';
import { NextPageWithLayout } from '../../../page';
import styles from './../style/account.module.css';
import styledC from 'styled-components';
import Account from '@/services/AccountService';
import MenuService from '@/services/MenuService';
import { ResData } from 'types/ResData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import { codeState } from 'lib/store/fetures/codeSlice';
import {
  resCodeData,
  findCodeList,
  StringSort,
  grpSelectFilter,
  StrArrayToInt,
} from '@/lib/utils/codeProvider';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ISelectAccountGroupDetail } from '@/types/Account';
import FormSelect from '@/components/form/formSelect/FormSelect';
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
  '.rct-title': {
    borderLeft: '1px solid !important',
    fontSize: 20,
    lineHeight: '27px !important',
  },
  '.rct-text': {
    border: '1px solid !important',
  },
  '.react-checkbox-tree ol ol': {
    borderLeft: '1px solid !important',
  },
}));

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

const GroupDetail: NextPageWithLayout = () => {
  const [groupDetailList, setGroupDetailList] = useState<ISelectAccountGroupDetail>();
  const [lnknSiteList, setLnknSiteList] = useState([]);
  const [bottomMenuList, setBottomMenuList] = useState<
    [
      {
        lnknSiteCd: string;
        menus?: [];
      }
    ]
  >();
  const [menuList, setMenuList] = useState([]);
  const [menuCheckList, setMenuCheckList] = useState([]);
  const [treeNodeList, setTreeNodeList] = useState([]);
  const [bottomMenuActive, setBottomMenuActive] = useState('00');
  const [AB, setAB] = useState([]);
  const [accessList, setAccessList] = useState([
    { label: '전체', value: '00' },
    { label: '조회', value: '01' },
    { label: '조회+다운로드', value: '02' },
  ]);
  const router = useRouter();
  const routerQueryId = router.query.id ?? null;
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const dispatch = useDispatch();

  const handleParams = (name: string, _value: any) => {
    setGroupDetailList({ ...groupDetailList, [name]: _value });
  };

  const handleUpdate = () => {
    if (!validationCheck()) {
      console.log('문제없음');
      updateGroupDetail();
    } else {
      console.log('문제있음');
    }
  };

  const handleLnknSiteList = (useCheck: boolean, _value: string) => {
    let _mngrGroupSiteList = groupDetailList.mngrGroupSiteList;
    let returnUse = false;
    if (!useCheck) {
      if (_mngrGroupSiteList?.length === 0) {
        returnUse = true;
      }
      if (_mngrGroupSiteList.length === 1) {
        returnUse = _value === _mngrGroupSiteList[0].lnknSiteCd;
      }
      if (returnUse) {
        alert('연결관리 시스템이 없습니다.');
        return;
      }
    }
    if (_mngrGroupSiteList.length > 0) {
      _mngrGroupSiteList = _mngrGroupSiteList.filter((tempItem) => tempItem.lnknSiteCd !== _value);
    }
    useCheck &&
      _mngrGroupSiteList.push({
        lnknSiteCd: _value,
      });

    setGroupDetailList({ ...groupDetailList, mngrGroupSiteList: _mngrGroupSiteList });
    const sortList = StringSort(_mngrGroupSiteList, 'lnknSiteCd');
    setBottomMenuActive('00');
    searchTreeNodeList(sortList[0]?.lnknSiteCd);
    setBottomMenuList(sortList);
  };

  const handleMenuActive = (value: string) => {
    setBottomMenuActive(value);
    searchTreeNodeList(value);
  };
  const handleMenuCheckList = (checkedList: string[]) => {
    console.log(checkedList);
    setMenuCheckList(checkedList);
  };

  const fstMenuCheckList = (mngrGroupSiteList: any, lnknSiteCd = '00') => {
    let tempCheckList = [];
    if (mngrGroupSiteList?.length > 0) {
      const tSiteList = mngrGroupSiteList.find((item) => item.lnknSiteCd === lnknSiteCd);
      if (tSiteList?.menus?.length > 0) {
        tempCheckList = tSiteList.menus;
      }
    }
    return tempCheckList;
  };

  const adminPortalCheck = () => {
    let useCheck = true;

    if (bottomMenuList?.length > 0 && bottomMenuList?.find((item) => item.lnknSiteCd === '00')) {
      useCheck = false;
    }
    if (useCheck) {
      setBottomMenuList([{ lnknSiteCd: '00', menus: [] }]);
      return (
        <>
          <li onClick={() => handleMenuActive('00')}>
            <div className={bottomMenuActive === '00' && styles.tabActive}>
              {lnknSiteList[0] ? lnknSiteList[0].label : '어드민포탈'}
            </div>
          </li>
        </>
      );
    }
  };

  const getGrpCode = () => {
    if (codeData !== null && !codeData?.first) {
      //최초실행시 아닐시
      const resList = findCodeList('3010', codeData.code); //공통코드 특정코드 필터링
      setLnknSiteList(grpSelectFilter(resList, '3010', 'cdDtlDesc', 'dtlCd', false)); //특정코드 필터링 된 것 Select형식 등 편의 맞게 가공
    } else {
      //최초실행시
      resCodeData(setGrpCode); // codeProvider 함수호출
    }
  };
  const setGrpCode = (res: any) => {
    dispatch(codeState.actions.setCodeState(res)); // 공통코드 store 입력
    setLnknSiteList(grpSelectFilter(res, '3010', 'cdDtlDesc', 'dtlCd', false)); // 커스텀 실행
  };

  const treeNodeFilter = (nodeData: any) => {
    if (nodeData.length > 0) {
      const depth1List = [];
      nodeData.map((itemDepth1) => {
        let depth2List = [];
        let depth3List = [];
        let depth4List = [];
        if (itemDepth1.childs.length > 0) {
          // 1 자식 있을경우 ########################################
          depth2List = [];
          itemDepth1.childs.map((itemDepth2) => {
            if (itemDepth2.childs.length > 0) {
              // 2 자식 있을경우 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
              depth3List = [];
              itemDepth2.childs.map((itemDepth3) => {
                depth4List = [];
                if (itemDepth3.childs.length > 0) {
                  itemDepth3.childs.map((itemDepth4) => {
                    depth4List.push({
                      value: itemDepth4.menuSeq,
                      label: itemDepth4.menuNm,
                    });
                  });
                  depth3List.push({
                    value: itemDepth3.menuSeq,
                    label: itemDepth3.menuNm,
                    children: depth4List,
                  });
                } else {
                  // 3 자식 없을경우 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                  depth3List.push({
                    value: itemDepth3.menuSeq,
                    label: itemDepth3.menuNm,
                  });
                }
              });
              //2 자식넣기
              depth2List.push({
                value: itemDepth2.menuSeq,
                label: itemDepth2.menuNm,
                children: depth3List,
              });
            } else {
              //2 자식 없을경우 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
              depth2List.push({ value: itemDepth2.menuSeq, label: itemDepth2.menuNm });
            }
          });
          //1 자식 넣기
          depth1List.push({
            value: itemDepth1.menuSeq,
            label: itemDepth1.menuNm,
            children: depth2List,
          });
        } else {
          // 1 자식 없을경우 ########################################
          depth1List.push({ value: itemDepth1.menuSeq, label: itemDepth1.menuNm });
        }
      });
      return depth1List;
    } else {
      return [];
    }
  };

  const validationCheck = () => {
    const checkList = [];
    let menuMsg = false;
    if (bottomMenuList?.length === 0) {
      checkList.push('menuList 0');
    } else {
      bottomMenuList.map((item) => {
        if (item.menus?.length === 0) {
          checkList.push(item);
          menuMsg = true;
        }
      });
    }
    menuMsg && alert('선택된 메뉴가 없습니다. 저장버튼을 눌러주세요.');
    return checkList.length > 0;
  };

  //API 시작 -------------
  const getGroupDetail = (fstUse: boolean) => {
    if (!routerQueryId) {
      router.push('/system/account/group');
      return;
    }
    Account.selectAccountGroupDetail(routerQueryId)
      .then((response: any) => {
        const detailList = response.body;
        const _mngrGroupSiteList = detailList?.mngrGroupSiteList ?? [];
        if (fstUse) {
          setBottomMenuList(_mngrGroupSiteList);
          setMenuCheckList([...fstMenuCheckList(_mngrGroupSiteList, '00')]);
          setGroupDetailList(detailList);
          searchTreeNodeList('00', _mngrGroupSiteList); // 어드빈은 항시추가 0번인덱스
        } else {
          setBottomMenuList(_mngrGroupSiteList);
          // setMenuCheckList([...fstMenuCheckList(_mngrGroupSiteList, bottomMenuActive)]);
        }
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  };
  const searchGroupMenu = () => {
    getGroupDetail(false);
  };
  const searchTreeNodeList = (lnknSiteCd: string, bMenuList = []) => {
    MenuService.selectmenu({
      lnknSiteCd: lnknSiteCd,
    })
      .then((response: any) => {
        const res = response.body;
        setBottomMenuActive(lnknSiteCd);
        setMenuCheckList([
          ...fstMenuCheckList(
            bottomMenuList?.length === 0 ? bMenuList : bottomMenuList,
            lnknSiteCd
          ),
        ]);
        setTreeNodeList(treeNodeFilter(res));
        setMenuList(res);
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('searchTreeNodeList 터짐');
      });
  };

  const updateGroupMenuList = () => {
    const intArray = StrArrayToInt(menuCheckList);
    if (!intArray) {
      alert('선택된 메뉴가 없습니다.');
      return;
    }
    Account.updateAccountGroupMenu({ menus: intArray }, routerQueryId, bottomMenuActive)
      .then((response: any) => {
        const res = response.body;
        alert('성공');
        searchGroupMenu();
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('updateGroupMenuList 터짐');
      });
  };

  const updateGroupDetail = () => {
    const intArray = StrArrayToInt(menuCheckList);
    const { mngrGroupSeq, mngrGroupNm, uzYn, acntTypCd, authTypCd } = groupDetailList;
    const params = {};
    Account.updateAccountGroup({
      ...groupDetailList,
      mngrGroupSiteList: bottomMenuList,
    })
      .then((response: any) => {
        const res = response.body;
        alert('성공');
      })
      .catch((e: ResData) => {
        console.log(e);
        console.log('터짐');
      });
  };
  //API 끝 -------------

  //useEffect 시작 -----------
  useEffect(() => {
    getGrpCode(); //공통코드 호출
    getGroupDetail(true);
  }, []);
  //useEffect 끝 -----------
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
          <BodyBox title="관리자그룹 명">
            {groupDetailList && (
              <FormControl
                defaultValue={groupDetailList?.mngrGroupNm}
                changeableValue={groupDetailList?.mngrGroupNm}
                onChange={(e) => handleParams('mngrGroupNm', e.target.value)}
                placeholder="검색어를 입력하세요."
                size="lg"
                className=""
              />
            )}
          </BodyBox>
          <BodyBox title="계정유형">{groupDetailList?.acntTypNm}</BodyBox>
          <BodyBox title="연결 관리시스템">
            <CheckBoxWrap>
              {lnknSiteList.length > 0 &&
                lnknSiteList.map((item, index) => {
                  let useValue = false;
                  if (bottomMenuList && bottomMenuList?.length > 0) {
                    const tempData = bottomMenuList.find((elet) => elet.lnknSiteCd === item.value);
                    if (tempData) useValue = true;
                  }

                  return (
                    item.value !== '00' && (
                      <>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name={'group' + index}
                            id=""
                            className="el_input_radio"
                            value={item.value}
                            checked={useValue}
                            onChange={(e) => handleLnknSiteList(e.target.checked, item.value)}
                          />
                          <label htmlFor="group1" className="el_label3">
                            {item.label}
                          </label>
                        </div>
                      </>
                    )
                  );
                })}
            </CheckBoxWrap>
          </BodyBox>
          <BodyBox title="권한">
            <FormSelect
              items={accessList}
              type="type2"
              size="medium"
              className="hp_mr-15"
              value={groupDetailList?.authTypCd}
              onChange={(e) => handleParams('authTypCd', e.target.value)}
            />
          </BodyBox>
          <BodyBox title="사용여부">
            <div style={{ display: 'flex' }}>
              <RadioWrap>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Radio
                      type="radio"
                      name="selectAccess"
                      checked={groupDetailList?.uzYn === 'Y'}
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
                      checked={groupDetailList?.uzYn === 'N'}
                      value="N"
                      onChange={(e) => handleParams('uzYn', e.target.value)}
                    />
                  </div>
                  <RadioSpan>N</RadioSpan>
                </label>
              </RadioWrap>
            </div>
          </BodyBox>
          <BodyBox title={['등록일자', '등록자']} isTwoRows={true}>
            {[
              <DefaultText key={`BodyBox-DefaultText-1`}>
                {groupDetailList?.frstRegDttm ?? ''}
              </DefaultText>,
              <DefaultText key={`BodyBox-DefaultText-2`}>
                {groupDetailList?.frstRgsrNm ?? ''}
              </DefaultText>,
            ]}
          </BodyBox>
        </Wrap>
        <article>
          {/* 하단메뉴리스트 */}
          <div className={styles.tableTab}>
            <ul>
              {adminPortalCheck()}
              {bottomMenuList?.length > 0 &&
                lnknSiteList.length > 0 &&
                bottomMenuList.map((item, index) => {
                  const tempData = lnknSiteList.find((elet) => elet.value === item.lnknSiteCd);
                  return (
                    <li onClick={() => handleMenuActive(tempData.value)} key={`form-li-${index}`}>
                      <div className={bottomMenuActive === tempData.value && styles.tabActive}>
                        {tempData?.label}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <Wrap>
            <div className="wrapTitle" style={{ justifyContent: 'space-between' }}>
              메뉴
              <MainButton
                label="저장"
                size="fit"
                variant="black"
                className="bl_middleWrap_right"
                onClick={() => updateGroupMenuList()}
              />
            </div>
          </Wrap>
          <Table>
            <TableBody>
              <StyledTableRow>
                <CheckboxTree
                  nodes={treeNodeList}
                  checked={treeNodeList ? menuCheckList : []}
                  expanded={AB}
                  onCheck={(checked) => handleMenuCheckList(checked)}
                  onExpand={(expanded) => setAB(expanded)}
                  iconsClass="fa5"
                  icons={{
                    check: (
                      <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare} />
                    ),
                    uncheck: (
                      <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare} />
                    ),
                    halfCheck: (
                      <FontAwesomeIcon
                        className="rct-icon rct-icon-half-check"
                        icon={faCheckSquare}
                      />
                    ),
                    expandClose: (
                      <FontAwesomeIcon
                        className="rct-icon rct-icon-expand-close"
                        icon={faCaretSquareRight}
                      />
                    ),
                    expandOpen: (
                      <FontAwesomeIcon
                        className="rct-icon rct-icon-expand-open"
                        icon={faCaretSquareDown}
                      />
                    ),
                    expandAll: (
                      <FontAwesomeIcon
                        className="rct-icon rct-icon-expand-all"
                        icon={faPlusSquare}
                      />
                    ),
                    collapseAll: (
                      <FontAwesomeIcon
                        className="rct-icon rct-icon-collapse-all"
                        icon={faMinusSquare}
                      />
                    ),
                    parentClose: (
                      <FontAwesomeIcon
                        style={{ display: 'none' }}
                        className="rct-icon rct-icon-parent-close"
                        icon={faArrowAltCircleRight}
                        // icon={faListAlt}
                      />
                    ),
                    parentOpen: (
                      <FontAwesomeIcon
                        style={{ display: 'none' }}
                        className="rct-icon rct-icon-parent-open"
                        icon={faArrowAltCircleDown}
                      />
                    ),
                    leaf: (
                      <FontAwesomeIcon
                        style={{ display: 'none' }}
                        className="rct-icon rct-icon-leaf-close"
                        size="2x"
                        icon={faArrowAltCircleRight}
                      />
                    ),
                  }}
                />
              </StyledTableRow>
            </TableBody>
          </Table>
        </article>
      </section>
      <style jsx>{`
        .bl_middleWrap_right {
          font-size: 1.4rem;
          line-height: 1.6rem;
          color: #474d52;
          display: flex;
          align-items: center;
        }
        .rct-title {
          padding: 0 5px;
          border-left: 1px solid !important;
          font-size: 20px !important;
          line-height: 27px !important;
        }
        .rct-text {
          display: flex;
          align-items: center;
          border: 1px solid !important;
        }
        .react-checkbox-tree ol ol {
          padding-left: 24px;
          border-left: 1px solid !important;
        }
        .tablewrapper {
          margin-bottom: 50px;
        }
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
        .savebutton {
          border: none;
          width: 80px;
          height: 100%;
          background: #ddd;
        }
        .rct-title {
          padding: 0 5px;
          font-size: 28px !important;
        }
      `}</style>
    </>
  );
};

export default GroupDetail;

GroupDetail.getLayout = (page, navItems) => {
  return (
    <PrimaryLayout title={'관리자그룹 상세'} navItems={navItems}>
      {page}
    </PrimaryLayout>
  );
};
