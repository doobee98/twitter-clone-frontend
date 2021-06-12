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
    width: 30px;
    height: 30px;
  }

  color: ${ColorPalette.SKYBLUE};
`;

const HiddenInput = styled.input`
  display: none;
`;

interface TweetPostToolBarProps {
  handleImgInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TweetPostToolBar = (props: TweetPostToolBarProps) => {
  const { handleImgInput } = props;

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <ToolBarContainer>
        <ToolWrapper
          onClick={() => {
            if (hiddenFileInput.current) {
              hiddenFileInput.current.click();
            }
          }}
        >
          <ToolIcon iconType={BasicType.MEDIA} />
          <HiddenInput
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={hiddenFileInput}
            onChange={handleImgInput}
          />
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
    </>
  );
};

export default TweetPostToolBar;
