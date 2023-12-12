import styled from 'styled-components';

export interface IDownloadButton {
  inputWidth?: number;
  placeholder?: string;
  inputText?: string;
}

const DownloadButton: React.FC<IDownloadButton> = ({
  inputWidth = 200,
  inputText = '다운로드',
  placeholder = '첨부파일 선택',
}) => {
  return (
    <Wrap>
      <InputStyle width={inputWidth} placeholder={placeholder} />
      <LabelStyle htmlFor="file">{inputText}</LabelStyle>
      <Disappear type="file" id="file" />
    </Wrap>
  );
};

export default DownloadButton;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputStyle = styled.input`
  width: ${(props) => props.width && props.width}px;
  padding: 6px 14px;
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #8d8d8d;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  ::placeholder {
    font-family: 'NanumSquare';
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    color: #8d8d8d;
  }
`;

const LabelStyle = styled.label`
  padding: 6px 17px;
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #ffffff;
  background: #282a2e;
  border-radius: 3px;
`;

const Disappear = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
