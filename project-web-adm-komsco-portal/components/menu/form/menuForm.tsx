/* eslint-disable indent */
import { useAppDispatch } from '@/lib/store';
import {
  menus,
  isUpdating,
  menuSelected,
  menuFormValues,
  setIsUpdating,
  setMenusState,
  isTabChanged,
  setIsTabChanged,
} from '@/lib/store/fetures/menuSlice';
import MenuService from '@/services/MenuService';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../pages/system/menu/style/menu.module.css';
import Router from 'next/router';

const MenuForm = ({ lnknSiteCd, oneDepthsMenuList, twoDepthsMenuList, threeDepthsMenuList }) => {
  //local state:
  const [formValues, setFormValues] = useState({
    menuSeq: 0,
    menuNm: '',
    lnknSiteCd: '',
    menuLevelCd: '',
    uprnMenuSeq: 0,
    menuDesc: '',
    menuConnUrl: '',
    menuSerNo: 0,
    uzYn: 'Y',
    frstRgsrId: '',
    frstRegDttm: '',
    lastEdtrId: '',
    lastChngDttm: '',
    menuXprYn: '',
    childs: [],
  });
  const [oneDepsOptionList, setOneDepsOptionList] = useState([]);
  const [twoDepsOptionList, setTwoDepsOptionList] = useState([]);
  const [_uprnMenuSeq, setUprnMenuSeq] = useState({ key: null, value: null });

  //global state:
  const dispatch = useAppDispatch();
  const _menus = useSelector(menus);
  const _isUpdating = useSelector(isUpdating);
  const _menuSelected = useSelector(menuSelected);
  const _menuFormValues = useSelector(menuFormValues);
  const _isTabChanged = useSelector(isTabChanged);

  useEffect(() => {
    _isTabChanged || (!_isTabChanged && !_isUpdating)
      ? setFormValues({
          menuSeq: 0,
          menuNm: '',
          lnknSiteCd: '',
          menuLevelCd: '',
          uprnMenuSeq: 0,
          menuDesc: '',
          menuConnUrl: '',
          menuSerNo: 0,
          uzYn: 'Y',
          frstRgsrId: '',
          frstRegDttm: '',
          lastEdtrId: '',
          lastChngDttm: '',
          menuXprYn: '',
          childs: [],
        })
      : setFormValues(_menuSelected);
    setOneDepsOptionList(setOptionDatas(oneDepthsMenuList));
    setTwoDepsOptionList(setOptionDatas(twoDepthsMenuList));
  }, [
    _isUpdating,
    _menuFormValues,
    _menuSelected,
    oneDepthsMenuList,
    twoDepthsMenuList,
    threeDepthsMenuList,
    _isTabChanged,
  ]);

  //functions:
  const setOptionDatas = (datas) => {
    const result = datas?.map((v, i) => {
      return {
        key: v.menuSeq,
        value: v.menuNm,
      };
    });
    return result;
  };
  const UprnMenuOptions = ({ _menuLevelCd }) => {
    return (
      <>
        {_menuLevelCd === '2'
          ? oneDepsOptionList.map((v) => {
              return (
                <option data-key={v.key} key={v.key} value={v.value} className="uprnMenuSeqItem">
                  {v.value}
                </option>
              );
            })
          : null}
        {_menuLevelCd === '3'
          ? twoDepsOptionList.map((v) => {
              return (
                <option data-key={v.key} key={v.key} value={v.value} className="uprnMenuSeqItem">
                  {v.value}
                </option>
              );
            })
          : null}
      </>
    );
  };
  const handleOnMenuPropertyChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let result;
      if (name === 'uprnMenuSeq') {
        if (formValues.menuLevelCd === '3') {
          result = twoDepsOptionList.find((v) => {
            return v.key === Number(e.target.options[e.target.selectedIndex].dataset.key);
          });
        } else if (formValues.menuLevelCd === '2') {
          result = oneDepsOptionList.find((v) => {
            return v.key === Number(e.target.options[e.target.selectedIndex].dataset.key);
          });
        }
        setUprnMenuSeq(result);
        setFormValues({
          ...formValues,
          [name]: value,
        });
      }
      if (name === 'menuLevelCd') {
        setFormValues({
          ...formValues,
          [name]: value,
          ['uprnMenuSeq']: 0,
        });
      } else {
        setFormValues({
          ...formValues,
          [name]: value,
        });
      }
    },
    [{ ...formValues }]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (_isUpdating) {
      data = {
        menuNm: formValues.menuNm,
        menuDesc: formValues.menuDesc,
        menuConnUrl: formValues.menuConnUrl,
        uzYn: formValues.uzYn,
        menuXprYn: formValues.menuXprYn,
      };
      MenuService.updateMenu(data, formValues.menuSeq)
        .then((response: any) => {
          response?.head?.resultCode === '0000'
            ? MenuService.selectmenu({
                lnknSiteCd: lnknSiteCd,
              }).then((response: any) => {
                dispatch(setMenusState(response?.body));
                dispatch(setIsUpdating(false));
                setFormValues({
                  menuSeq: 0,
                  menuNm: '',
                  lnknSiteCd: '',
                  menuLevelCd: '',
                  uprnMenuSeq: 0,
                  menuDesc: '',
                  menuConnUrl: '',
                  menuSerNo: 0,
                  uzYn: 'Y',
                  frstRgsrId: '',
                  frstRegDttm: '',
                  lastEdtrId: '',
                  lastChngDttm: '',
                  menuXprYn: '',
                  childs: [],
                });
              })
            : null;
        })
        .catch((e: ResData) => {
          console.log(e);
        });
    } else if (!_isUpdating) {
      data = {
        menuNm: formValues.menuNm,
        lnknSiteCd: lnknSiteCd,
        menuLevelCd: formValues.menuLevelCd,
        uprnMenuSeq: formValues.uprnMenuSeq === 0 ? null : _uprnMenuSeq?.key,
        menuDesc: formValues.menuDesc,
        menuConnUrl: formValues.menuConnUrl,
        uzYn: formValues.uzYn,
        menuXprYn: formValues.uzYn,
      };
      MenuService.registerMenu(data)
        .then((response: any) => {
          response?.head?.resultCode === '0000'
            ? MenuService.selectmenu({
                lnknSiteCd: lnknSiteCd,
              }).then((response: any) => {
                dispatch(setMenusState(response?.body));
                setFormValues({
                  menuSeq: 0,
                  menuNm: '',
                  lnknSiteCd: '',
                  menuLevelCd: '',
                  uprnMenuSeq: 0,
                  menuDesc: '',
                  menuConnUrl: '',
                  menuSerNo: 0,
                  uzYn: 'Y',
                  frstRgsrId: '',
                  frstRegDttm: '',
                  lastEdtrId: '',
                  lastChngDttm: '',
                  menuXprYn: '',
                  childs: [],
                });
              })
            : null;
        })
        .catch((e: ResData) => {
          console.log(e);
        });
    }
  };

  const handleOnCancelClick = (e) => {
    e.preventDefault();
    if (_isTabChanged && !_isUpdating) {
      setFormValues({
        menuSeq: 0,
        menuNm: '',
        lnknSiteCd: '',
        menuLevelCd: '',
        uprnMenuSeq: 0,
        menuDesc: '',
        menuConnUrl: '',
        menuSerNo: 0,
        uzYn: 'Y',
        frstRgsrId: '',
        frstRegDttm: '',
        lastEdtrId: '',
        lastChngDttm: '',
        menuXprYn: '',
        childs: [],
      });
    } else {
      dispatch(setIsUpdating(false));
      dispatch(setIsTabChanged(true));
    }
  };

  const setUprnMenuNmWhenUpdating = (uprnMenuSeq, currentLevelCd) => {
    const uprnLevelCd = currentLevelCd - 1;
    let result;
    if (uprnLevelCd === 1) {
      result = oneDepsOptionList.find((v) => {
        return Number(v.key) === uprnMenuSeq;
      });
    } else if (uprnLevelCd === 2) {
      result = twoDepsOptionList.find((v) => {
        return Number(v.key) === uprnMenuSeq;
      });
    }
    return result?.value;
  };

  return (
    <>
      <div className={styles.commonMag}>
        <div className={styles.addMenu}>
          <form>
            <div className={styles.addMenuTitleWrapper}>
              <div className={styles.addMenuTitle}>{_isUpdating ? '메뉴 수정' : '메뉴 등록'}</div>
              <div className={styles.addMenuButton}>
                <button onClick={handleOnCancelClick}>취소</button>
                <button type="submit" onClick={handleSubmit}>
                  {_isUpdating ? '수정' : '등록'}
                </button>
              </div>
            </div>
            <div className={styles.addMenuTableWrapper}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {/* 메뉴명 */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{
                          bgcolor: '#eee',
                          gridRow: '1',
                          gridColumn: 'span 2',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        메뉴명
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#fff',
                          gridRow: '1',
                          gridColumn: 'span 4',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="left"
                      >
                        <input
                          id={'menuNm'}
                          name={'menuNm'}
                          type="text"
                          style={{ height: '3rem', width: '22vw', padding: '11px' }}
                          value={formValues.menuNm}
                          onChange={handleOnMenuPropertyChange}
                        />
                      </TableCell>
                    </TableRow>
                    {/* 메뉴레벨 */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{
                          bgcolor: '#eee',
                          gridRow: '1',
                          gridColumn: 'span 2',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        메뉴레벨
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 15, bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="left"
                      >
                        <select
                          disabled={_isUpdating}
                          value={formValues.menuLevelCd}
                          required
                          name="menuLevelCd"
                          id="menuLevelCd"
                          style={{ border: '1px solid grey' }}
                          className="el_input_select2 hp_mr-15 intgr_select"
                          onChange={handleOnMenuPropertyChange}
                        >
                          <option key="0" value="default" className="menuLevelCdItem" hidden>
                            선택
                          </option>
                          <option key="1" value="1" className="menuLevelCdItem">
                            1depth
                          </option>
                          <option key="2" value="2" className="menuLevelCdItem">
                            2depth
                          </option>
                          <option key="3" value="3" className="menuLevelCdItem">
                            3depth
                          </option>
                        </select>
                      </TableCell>
                    </TableRow>
                    {/* 상위메뉴 */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{
                          bgcolor: '#eee',
                          gridRow: '1',
                          gridColumn: 'span 2',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        상위메뉴
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 15, bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="left"
                      >
                        <select
                          disabled={
                            _isUpdating || formValues.menuLevelCd === '1' || !formValues.menuLevelCd
                          }
                          required
                          name="uprnMenuSeq"
                          id="uprnMenuSeq"
                          className="el_input_select2 hp_mr-15 intgr_select"
                          style={{ border: '1px solid grey' }}
                          onChange={handleOnMenuPropertyChange}
                          value={
                            _isUpdating && !(formValues.uprnMenuSeq === null)
                              ? formValues.uprnMenuSeq
                              : '선택'
                          }
                        >
                          {_isUpdating ? (
                            <option value="0" className="uprnMenuSeqItem" hidden>
                              {formValues.uprnMenuSeq
                                ? setUprnMenuNmWhenUpdating(
                                    formValues.uprnMenuSeq,
                                    formValues.menuLevelCd
                                  )
                                : '선택'}
                            </option>
                          ) : (
                            <>
                              <option value="0" className="uprnMenuSeqItem" hidden>
                                {formValues.uprnMenuSeq ? formValues.uprnMenuSeq : '선택'}
                              </option>
                              <UprnMenuOptions _menuLevelCd={formValues.menuLevelCd} />
                            </>
                          )}
                        </select>
                      </TableCell>
                    </TableRow>
                    {/* 메뉴설명 */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{
                          bgcolor: '#eee',
                          gridRow: '1',
                          gridColumn: 'span 2',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        메뉴설명
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 15, bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="left"
                      >
                        <textarea
                          onChange={handleOnMenuPropertyChange}
                          value={formValues.menuDesc}
                          id="menuDesc"
                          name="menuDesc"
                          rows={5}
                          cols={43}
                          style={{ padding: '11px' }}
                        ></textarea>
                      </TableCell>
                    </TableRow>
                    {/* 메뉴접속URL */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{
                          bgcolor: '#eee',
                          gridRow: '1',
                          gridColumn: 'span 2',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        메뉴접속URL
                      </TableCell>
                      <TableCell
                        sx={{ bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="left"
                      >
                        <input
                          id={'menuConnUrl'}
                          name={'menuConnUrl'}
                          value={!(formValues.menuConnUrl === null) ? formValues.menuConnUrl : ''}
                          style={{ fontSize: 15, height: '3rem', width: '22vw', padding: '11px' }}
                          onChange={handleOnMenuPropertyChange}
                        />
                      </TableCell>
                    </TableRow>
                    {/* 사용여부 */}
                    <TableRow
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'auto',
                      }}
                    >
                      <TableCell
                        sx={{ fontSize: 15, bgcolor: '#eee', gridRow: '1', gridColumn: 'span 2' }}
                        align="right"
                      >
                        사용여부
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 15, bgcolor: '#fff', gridRow: '1', gridColumn: 'span 4' }}
                        align="left"
                      >
                        <RadioGroup
                          sx={{ flexDirection: 'row' }}
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          id={'uzYn'}
                          name="uzYn"
                          value={formValues.uzYn}
                          onChange={handleOnMenuPropertyChange}
                        >
                          <FormControlLabel key="Y" value="Y" control={<Radio />} label="사용" />
                          <FormControlLabel key="N" value="N" control={<Radio />} label="미사용" />
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default MenuForm;
