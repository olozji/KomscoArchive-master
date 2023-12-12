import * as React from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';

const FormRadioLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .el_input_radio {
    accent-color: #474d52;
    width: 15px;
    height: 15px;
  }
  .el_label3 {
    font-size: 15px;
    line-height: 17px;
    font-weight: 400;
    color: #474d52;
  }
`;
export interface IFormRadio {
  id: string;
  label: string | ReactElement;
  name: string;
  disabled?: true | false;
}

const FormRadio: React.FC<IFormRadio> = ({
  label = 'text',
  id = 'id',
  name = 'name',
  disabled = false,
  ...props
}: IFormRadio) => {
  return (
    <FormRadioLayout>
      <div className="el_input_radioInnerWrap">
        <input type="radio" name={name} id={id} className="el_input_radio" />
        <label htmlFor={id} className="el_label3">
          {label}
        </label>
      </div>
    </FormRadioLayout>
  );
};

export default FormRadio;
