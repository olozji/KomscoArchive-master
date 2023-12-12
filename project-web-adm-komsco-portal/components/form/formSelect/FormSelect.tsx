import * as React from 'react';

export interface IFormSelect {
  type: 'type1' | 'type2' | 'type3';
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'ms';
  items: Array<IItem>;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  isFstDisabled?: boolean;
  onChange?: (e: any) => void;
  defaultValue?: any;
}

export interface IItem {
  label: string;
  value: string;
}

const FormSelect: React.FC<IFormSelect> = ({
  type = 'type1',
  size = 'medium',
  items = [],
  className,
  isDisabled = false,
  isFstDisabled = false,
  ...props
}: IFormSelect) => {
  return (
    <>
      <select
        className={`select select--${size} select--${type} ${className}`}
        disabled={isDisabled}
        {...props}
      >
        {items.length > 0 &&
          items.map((item, idx) => {
            return idx === 0 && isFstDisabled ? (
              <option
                key={`form-select-${idx}`}
                className={`option`}
                value={item.value}
                disabled
                hidden
              >
                {item.label}
              </option>
            ) : (
              <option key={`form-select-${idx}`} className={`option`} value={item.value}>
                {item.label}
              </option>
            );
          })}
      </select>
      <style jsx>{`
        .select {
          border: 1px solid #f1f1f1;
          border-radius: 5px;
          padding: 0 13px;
          cursor: pointer;
          color: #474d52;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          background-repeat: no-repeat;
          background-position-x: 93%;
          background-position-y: 50%;
          font-size: 15px;
          font-weight: 400;
          background-color: #ffffff;
          font-family: 'NanumSquare', sans-serif;
        }
        .option {
        }
        .select--type1 {
          background-image: url(/img/icon-downArrow-gray-outlined.png);
        }
        .select--type1:disabled {
          background-color: #fbfafa;
        }
        .select--type2 {
          background-image: url(/img/icon-downArrow-blue.png);
        }
        .select--type2:disabled {
          background-color: #fbfafa;
        }
        .select--type3 {
          //background-image: url(/img/icon-downArrow-gray.svg);
          background-position-x: 100%;
          border: none;
          padding: 0;
        }
        .select--small {
          width: 92px;
          height: 16px;
        }
        .select--medium {
          width: 160px;
          height: 30px;
        }
        .select--ms {
          width: 110px;
          height: 30px;
        }
        .select--large {
          width: 136px;
          height: 40px;
        }
        .select--xlarge {
          width: 253px;
          height: 40px;
        }
        .el-width-400 {
          height: 30px;
          width: 400px;
        }
      `}</style>
    </>
  );
};

export default FormSelect;
