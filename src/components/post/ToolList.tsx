import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import { BasicType } from '../../utils/iconUtils';
import Button from '../base/Button';
import Icon from '../base/Icon';

const ToolListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  shape-outside: inset(calc(100% - 100px) 0 0);
`;

const ToolWrapper = styled.div`
  float: left;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 19px;
`;

const ToolIcon = styled(Icon)`
  width: 60%;
  height: 60%;
  align-items: center;
  justify-content: center;
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

const TweetButton = styled(Button)`
  float: right;
  width: 100%;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

const ToolList = () => {
  return (
    <>
      <ToolListContainer>
        <ToolWrapper>
          <ToolIcon
            iconType={BasicType.MEDIA}
            size={36}
            color={ColorPalette.SKYBLUE}
            hasCircleWrapper
          />
        </ToolWrapper>
        <ToolWrapper>
          <Icon
            iconType={BasicType.GIF}
            size={36}
            color={ColorPalette.SKYBLUE}
            hasCircleWrapper
          />
        </ToolWrapper>
        <ToolWrapper>
          <Icon
            iconType={BasicType.POLL}
            size={36}
            color={ColorPalette.SKYBLUE}
            hasCircleWrapper
          />
        </ToolWrapper>
        <ToolWrapper>
          <Icon
            iconType={BasicType.EMOJI}
            size={36}
            color={ColorPalette.SKYBLUE}
            hasCircleWrapper
          />
        </ToolWrapper>
        <ToolWrapper>
          <Icon
            iconType={BasicType.SCHEDULE}
            size={36}
            color={ColorPalette.SKYBLUE}
            hasCircleWrapper
          />
        </ToolWrapper>
      </ToolListContainer>
      <ButtonWrapper>
        <TweetButton> Tweet </TweetButton>
      </ButtonWrapper>
    </>
  );
};

export default ToolList;
