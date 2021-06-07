import Icon from 'components/base/Icon';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import { BasicType } from '../../utils/iconUtils';
import Button from '../base/Button';

const ToolBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToolIconList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ToolIconButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin: 0px;
  padding: 0px;
  color: ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const TweetButton = styled(Button)`
  float: right;
  width: 70px;
  height: 40px;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-size: 16px;
  font-weight: bold;
  /* shape-outside: inset(calc(100% - 100px) 0 0); */

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

interface TweetPostToolBarProps {
  handleImgInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TweetPostToolBar = (props: TweetPostToolBarProps) => {
  const { handleImgInput } = props;

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const openMediaFileInput = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  };

  return (
    <>
      <ToolBarContainer>
        <ToolIconList>
          <ToolIconButton onClick={openMediaFileInput}>
            <Icon iconType={BasicType.MEDIA} size={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.GIF} size={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.POLL} size={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.EMOJI} size={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.SCHEDULE} size={20} />
          </ToolIconButton>
        </ToolIconList>
        <TweetButton> Tweet </TweetButton>
      </ToolBarContainer>
      <HiddenInput
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        ref={hiddenFileInputRef}
        onChange={handleImgInput}
      />
    </>
  );
};

export default TweetPostToolBar;
