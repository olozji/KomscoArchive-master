import * as React from 'react';

export interface IButton {
  variant?: 'lightGray' | 'gray' | 'black' | 'primary';
  size?: 'w-extraSmall' | 'extraSmall' | 'small' | 'medium' | 'large' | 'fit';
  label: string;
  onClick?: () => void;
  className?: string;
}

const MainButton: React.FC<IButton> = ({
  size = 'medium',
  variant = 'gray',
  label,
  className,
  ...props
}: IButton) => {
  return (
    <>
      <button
        type="button"
        className={`btn btn--${size} btn--${variant} ${className}`}
        onClick={props.onClick}
      >
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
        .btn--lightGray {
          background-color: #fbfafa;
          border: 1px solid #a1a1a1;
        }
        .btn--gray {
          color: #222222;
          background-color: #eaeaea;
        }
        .btn--black {
          color: #ffffff;
          background-color: #282a2e;
        }
        .btn--primary {
          color: #ffffff;
          background-color: #0040b5;
        }

        .btn--w-extraSmall {
          width: 55px;
          height: 30px;
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
        .btn--fit {
          width: fit-content;
          height: fit-content;
          padding: 5px 10px;
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
        .el_btn__md-h40 {
          height: 40px;
        }
        .el_btn__lg {
        }
        .el_btn__black {
        }
        .el_btn__widthfull {
          width: 300px;
        }
        .el_btn__margin-top {
          margin-top: 15px;
        }
        .el_btn__with-border-color {
          border: 1px solid #a1a1a1;
          background-color: #fbfafa;
        }
      `}</style>
    </>
  );
};

export default MainButton;
