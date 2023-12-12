import * as React from 'react';

export interface IFormSelect {
  type: 'type1' | 'type2';
  size?: 'medium' | 'large';
  items: Array<IItem>;
  onClick?: () => void;
}

export interface IItem {
  label: string;
  value: string;
}

const FormSelect: React.FC<IFormSelect> = ({
  type = 'type1',
  size = 'medium',
  items = [],
  ...props
}: IFormSelect) => {
  return (
    <>
      <select className={`select select--${size} select--${type}`} {...props}>
        {items.map((item) => {
          return (
            <>
              <option className={`option`} value={item.value}>
                {item.label}
              </option>
            </>
          );
        })}
      </select>
      <style jsx>{`
        .select {
          border: 1px solid #f1f1f1;
          border-radius: 3px;
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
          transform: skew(-0.01deg);
        }
        .option {
        }
        .select--type1 {
          background-image: url(/img/icon-downArrow-gray-outlined.png);
        }
        .select--type1:disabled {
          background-color: #f3f4f5;
        }
        .select--type2 {
          background-image: url(/img/icon-downArrow-blue.png);
        }
        .select--type2:disabled {
          background-color: #fbfafa;
        }
        .select--small {
        }
        .select--medium {
          width: 160px;
          height: 30px;
        }
        .select--large {
          width: 136px;
          height: 40px;
        }
      `}</style>
    </>
  );
};

export default FormSelect;
