import React from 'react';
import MainButton from '../button/Button';
export interface IData {
  label: string;
  node: string | React.ReactElement;
  isRequired?: boolean;
  isFluid?: boolean;
  onClickEdit?: () => any;
}
interface IProps {
  data: IData[];
  labelTxtAlign?: 'center' | 'left' | 'right';
}
const mockupData: IData[] = [
  {
    label: '라벨1',
    node: '노드1',
    isRequired: true,
  },
  {
    label: '라벨2',
    node: '노드2',
    isRequired: true,
  },
];

const InfoForm: React.FC<IProps> = ({ data = mockupData, labelTxtAlign = 'center', ...props }) => {
  return (
    <>
      <div className="bl_form">
        {data.map((item) => (
          <div className="bl_form_row">
            <div className={`bl_form_col el_label2 hp_j-${labelTxtAlign} hp_plr-20`}>
              <span>
                {item.isRequired && <span className="hp_txt-red">*</span>}
                {item.label}
              </span>
              {item.onClickEdit && (
                <MainButton
                  label="설정"
                  size="extraSmall"
                  variant="black"
                  onClick={item.onClickEdit}
                  className="hp_ml-auto"
                />
              )}
            </div>
            <div className={`bl_form_col ${item.isFluid ? 'bl_form_col--fluid' : ''}`}>
              {item.node}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoForm;
