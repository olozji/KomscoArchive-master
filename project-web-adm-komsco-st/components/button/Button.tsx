import * as React from 'react';

export interface IButton {
  variant: 'gray' | 'black';
  size: 'extraSmall' | 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const MainButton: React.FC<IButton> = ({
  size = 'medium',
  variant = 'gray',
  label,
  ...props
}: IButton) => {
  return (
    <>
      <button type="button" className={`btn btn--${size} btn--${variant}`}>
        {label}
      </button>
      <style jsx>{`
        .btn {
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.7rem;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #efefef;
          border-radius: 3px;
          outline: none;
          border: none;
          cursor: pointer;
        }
        .btn--gray {
          color: #222222;
          background-color: #eaeaea;
        }
        .btn--black {
          color: #ffffff;
          background-color: #282a2e;
        }
        .btn--extraSmall {
          width: 78px;
          height: 30px;
        }
        .btn--small {
          width: 120px;
          height: 30px;
        }
        .btn--medium {
          width: 150px;
          height: 40px;
        }
        .btn--large {
          width: 200px;
          height: 50px;
        }
        .el_btn {
        }
        .el_btn__xs {
        }
        .el_btn__sm {
        }
        .el_btn__md {
        }
        .el_btn__md.h30 {
          height: 30px;
        }
        .el_btn__lg {
        }
        .el_btn__black {
        }
      `}</style>
    </>
  );
};

export default MainButton;
