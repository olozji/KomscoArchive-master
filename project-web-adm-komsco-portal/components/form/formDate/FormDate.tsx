import * as React from 'react';
import styled from 'styled-components';

export interface IFormDate {
  className?: string;
  name?: string;
  id?: string;
}

const FormDateLayout = styled.div`
  .input_date {
    background-image: url(/img/icon-calendar.png);
    background-size: 20px;
    font-family: NanumSquare;
    font-size: 15px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const FormDate: React.FC<IFormDate> = ({ className, name, id }: IFormDate) => {
  return (
    <FormDateLayout>
      <input
        type="date"
        name={name}
        id={id}
        className={`input_date el_input_date hp_mr-10 ${className}`}
      />
    </FormDateLayout>
  );
};

export default FormDate;
