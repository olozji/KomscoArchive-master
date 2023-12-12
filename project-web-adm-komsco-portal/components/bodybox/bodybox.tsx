import styled from 'styled-components';
import * as React from 'react';

export interface IBodyBox {
  title: string | string[];
  isTwoRows?: false | true;
  isRequired?: boolean;
  children?: any;
  isSmall?: boolean;
}

const BodyBox: React.FC<IBodyBox> = ({
  isRequired,
  title,
  isTwoRows = false,
  children,
  isSmall = false,
}) => {
  return (
    <>
      {isTwoRows ? (
        <Warp>
          <Title isSmall={isSmall}>
            {isRequired && <Etc>*</Etc>} <div>{title[0]}</div>
          </Title>
          <Inner>{children[0]}</Inner>
          <Title isSmall={isSmall}>
            {isRequired && <Etc>*</Etc>} <div>{title[1]}</div>
          </Title>
          <Inner>{children[1]}</Inner>
        </Warp>
      ) : (
        <Warp>
          <Title isSmall={isSmall}>
            {isRequired && <Etc>*</Etc>}
            <div>{title}</div>
          </Title>
          <Inner>{children}</Inner>
        </Warp>
      )}
    </>
  );
};
const Etc = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #e00000;
`;

const Warp = styled.div`
  display: flex;
  border-bottom: 0.5px solid #9b9b9b;
`;

const Title = styled.div<{ isSmall: boolean }>`
  min-width: ${(props) => (props.isSmall ? '155px' : '274px')};
  min-height: 40px;
  color: #282a2e;
  font-weight: 600;
  font-family: NanumSquare;
  font-size: 17px;
  background-color: #f3f4f5;
  text-align: center;
  border-right: 0.5px solid #9b9b9b;
  border-left: 0.5px solid #9b9b9b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  min-height: 40px;
  padding: 11px 23px;
  background-color: white;
`;

const InnerWithPadding = styled(Inner)`
  padding: 10px 23px;
  word-break: break-all;
  /* white-space: pre-line; */
`;

export default BodyBox;
