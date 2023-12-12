import * as React from 'react';

export interface IFormControl {
  size?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: true | false;
  isLabel?: true | false;
  label: string;
  placeholder?: string;
  onClick?: () => void;
}

const FormControl: React.FC<IFormControl> = ({
  size = 'sm',
  disabled = false,
  isLabel = false,
  label = '',
  placeholder = '값을 입력하세요.',
  ...props
}: IFormControl) => {
  return (
    <>
      <div className="el_input__wrap">
        {isLabel ? <span className="el_input__label">{label}</span> : ''}
        <input
          type="text"
          className={`el_input el_input__${size}`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>

      <style jsx>{`
        .el_input__wrap {
          width: fit-content;
          position: relative;
        }
        .el_input__won {
          padding-right: 30px;
        }
        .el_input__label {
          color: #474d52;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .el_input {
          width: 160px;
          height: 30px;
          border: 1px solid #f1f1f1;
          border-radius: 3px;
          padding: 0 13px;
          cursor: pointer;
          color: #474d52;
        }

        .el_input__label + .el_input {
          padding-right: 30px;
        }

        .el_input:disabled {
          background-color: #f3f4f5;
          cursor: no-drop;
        }
        .el_input::placeholder {
          color: #8d8d8d;
        }
        .el_input__sm {
          width: 148px;
        }
        .el_input__md {
          width: 220px;
        }
        .el_input__lg {
          width: 260px;
        }
        .el_input__full {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default FormControl;
