import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import codeSlice from 'lib/store/fetures/codeSlice';
import Code from '../../services/CodeService';
import { codeState } from 'lib/store/fetures/codeSlice';
import styles from '../../pages/notice/style/notice.module.css';
import { ResData } from 'types/ResData';

const Select = ({ title, codeNumber, selectRef = null, titleShow = true }) => {
  const dispatch = useDispatch();
  const codeData = useSelector((state: RootState) => state.codeSlice);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (codeData != null) {
      if (!codeData?.first) {
        const tempData = [];
        for (let i = 0; i < codeData?.code.length; i++) {
          if (codeData?.code[i]?.cdDvcd === codeNumber) {
            tempData.push(codeData?.code[i]);
          }
        }

        setData(tempData);
      } else {
        Code.selectcode({
          cdDvcd: '', //TODO: 이건 어디서 나온겨??
          dtlCd: '',
          dtlCdNm: null,
          uzYn: 'Y',
          pageNum: 1,
          pageSize: 9999,
        })
          .then((response: any) => {
            const code = response.body;
            console.log(code.cdList);
            dispatch(codeState.actions.setCodeState(code.cdList));
          })
          .catch((e: ResData) => {
            console.log(e);

            console.log('터짐');
          });
      }
    }
  }, [codeData]);

  return (
    <>
      <select name="" id="" className="el_input_select2 hp_mr-15 un_pageItemSelect" ref={selectRef}>
        {titleShow ? (
          <option value="" className="item">
            {`${title}`}
          </option>
        ) : (
          ''
        )}
        {data.map((c, index) => {
          return (
            <option value={`${c.dtlCd}`} className="item" key={index}>
              {`${c.dtlCdNm}`}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
