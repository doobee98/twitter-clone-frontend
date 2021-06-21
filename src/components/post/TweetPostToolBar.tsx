import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from 'components/base/Icon';
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
            <Icon iconType={BasicType.MEDIA} iconSize={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.GIF} iconSize={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.POLL} iconSize={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.EMOJI} iconSize={20} />
          </ToolIconButton>
          <ToolIconButton>
            <Icon iconType={BasicType.SCHEDULE} iconSize={20} />
          </ToolIconButton>
        </ToolIconList>
      </ToolBarContainer>
      {/* <HiddenInput
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        ref={hiddenFileInputRef}
        onChange={handleImgInput}
      /> */}
    </>
  );
};

export default TweetPostToolBar;
