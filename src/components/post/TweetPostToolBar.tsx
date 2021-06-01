import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import { BasicType } from '../../utils/iconUtils';
import Button from '../base/Button';
import NavItem from '../base/NavItem';

const ToolBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const ToolWrapper = styled.div`
  float: left;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: flex-end;

  cursor: pointer;
`;

const ToolIcon = styled(NavItem)`
  align-items: center;
  justify-content: center;

  & button {
    width: 40px;
    height: 40px;
    padding: 0px;
    margin: 0px;
  }

  & svg {
    width: 30x;
    height: 30px;
  }

  color: ${ColorPalette.SKYBLUE};
`;

const ButtonWrapper = styled.div`
  float: left;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  shape-outside: inset(calc(100% - 100px) 0 0);
`;

const HiddenInput = styled.input`
  display: none;
`;

const TweetButton = styled(Button)`
  float: right;
  width: 70px;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

const TweetPostToolBar = () => {
  const [file, setFile] = useState('');

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const test = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]) || '');
      console.log(file);
    }
  };

  return (
    <>
      {file && <img src={file} alt="input_img" />}
      <ToolBarContainer>
        <ToolWrapper
          onClick={() => {
            if (hiddenFileInput.current) {
              hiddenFileInput.current.click();
            }
          }}
        >
          <ToolIcon iconType={BasicType.MEDIA} />
          <HiddenInput type="file" ref={hiddenFileInput} onChange={test} />
        </ToolWrapper>
        <ToolWrapper>
          <ToolIcon iconType={BasicType.GIF} />
        </ToolWrapper>
        <ToolWrapper>
          <ToolIcon iconType={BasicType.POLL} />
        </ToolWrapper>
        <ToolWrapper>
          <ToolIcon iconType={BasicType.EMOJI} />
        </ToolWrapper>
        <ToolWrapper>
          <ToolIcon iconType={BasicType.SCHEDULE} />
        </ToolWrapper>
      </ToolBarContainer>
      <ButtonWrapper>
        <TweetButton> Tweet </TweetButton>
      </ButtonWrapper>
    </>
  );
};

export default TweetPostToolBar;
