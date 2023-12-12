import * as React from 'react';

export interface IFormCheck {
  id: string;
  label: string;
  name: string;
  disabled?: true | false;
}

const FormCheck: React.FC<IFormCheck> = ({
  label = 'text',
  id = 'id',
  name = 'name',
  disabled = false,
  ...props
}: IFormCheck) => {
  return (
    <>
      <div className="el_input_checkWrap">
        <input type="checkbox" name={name} id={id} className="el_input_check" disabled={disabled} />
        <label htmlFor={id} className="el_input_checkLabel"></label>
        <label htmlFor={id} className="el_label3">
          {label}
        </label>
      </div>
      <style jsx>{`
        .el_input_checkWrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .el_input_check {
          display: none;
        }
        .el_input_checkLabel {
          width: 15px;
          height: 15px;
          border: 1px solid #474d52;
          position: relative;
        }
        .el_input_check:disabled + .el_input_checkLabel {
          background-color: #f3f4f5;
          cursor: no-drop;
        }
        .el_input_check:checked + .el_input_checkLabel::after {
          content: url(/img/icon-checked.png);
          position: absolute;
          bottom: -3px;
          left: 1px;
        }
      `}</style>
    </>
  );
};

export default FormCheck;
