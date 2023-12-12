import React from 'react';
import styles from './ToggleCheck.module.css';

export interface IToggleCheck {
  /**
   * Optional click handler
   */
  onClick?: () => void;
  register?: any;
  name: string;
  required?: boolean;
}

const ToggleCheck: React.FC<IToggleCheck> = ({
  register,
  name,
  required,
  ...props
}: IToggleCheck) => {
  return (
    <>
      <label className="switch el_toggleWrap">
        {register ? (
          <input
            type="checkbox"
            className="el_toggle_checkbox"
            id={name}
            {...register(name, { required })}
          />
        ) : (
          <input type="checkbox" className="el_toggle_checkbox" id={name} name={name} />
        )}
        <span className="slider round el_toggle_slider el_toggle_slider__round"></span>
      </label>

      <style jsx>
        {`
          /* ## el_toggle */
          .el_toggleWrap {
            position: relative;
            display: inline-block;
            width: 56px;
            height: 20px;
          }
          .el_toggleWrap .el_toggle_checkbox {
            display: none;
            width: 0;
            height: 0;
          }
          .el_toggle_slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: 0.15s;
            transition: 0.15s;
          }
          .el_toggle_slider:before {
            position: absolute;
            content: '';
            height: 26px;
            width: 26px;
            background-color: white;
            -webkit-transition: 0.15s;
            transition: 0.15s;
            top: -3px;
            background: #ffffff;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
          }
          .el_toggle_checkbox:checked + .el_toggle_slider {
            /** 토글 배경색 */
            background: rgba(38, 106, 232, 0.3);
            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.15);
            border-radius: 15px;
          }
          .bl_voucher__green .el_toggle_checkbox:checked + .el_toggle_slider {
            background: #d5e7de;
          }
          .el_toggle_checkbox:focus + .el_toggle_slider {
            box-shadow: 0 0 1px #2196f3;
          }
          .el_toggle_checkbox:checked + .el_toggle_slider:before {
            -webkit-transform: translateX(0);
            -ms-transform: translateX(0);
            transform: translateX(0);
            /* 토글 버튼색 */
            background: var(--blue-003);
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
          }
          .bl_voucher__green .el_toggle_checkbox:checked + .el_toggle_slider:before {
            background: #2e855b;
          }
          .el_toggle_checkbox + .el_toggle_slider:before {
            -webkit-transform: translateX(30px);
            -ms-transform: translateX(30px);
            transform: translateX(30px);
          }
          .el_toggle_slider.el_toggle_slider__round {
            background: #f3f4f5;
            box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.25);
            border-radius: 15px;
          }
          .el_toggle_slider.el_toggle_slider__round:before {
            border-radius: 50%;
          }
          .el_toggle_slider.el_toggle_slider__round::after {
            content: 'OFF';
            font-family: Roboto;
            font-size: 12px;
            font-weight: 700;
            line-height: 14px;
            letter-spacing: 0px;
            color: #c9d0d2;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 7px;
          }
          .el_toggle_checkbox:checked + .el_toggle_slider.el_toggle_slider__round::after {
            content: 'ON';
            color: var(--blue-003);
            position: absolute;
            top: 50%;
            transform: translate(25px, -50%);
          }
          .bl_voucher__green
            .el_toggle_checkbox:checked
            + .el_toggle_slider.el_toggle_slider__round::after {
            color: #2e855b;
          }
        `}
      </style>
    </>
  );
};

export default ToggleCheck;
