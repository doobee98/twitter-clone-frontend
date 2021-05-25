import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import { BasicType } from '../../utils/iconUtils';
import Button from '../base/Button';
import NavItem from '../base/NavItem';

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
  width: 48px;
  height: 48px;
  display: flex;
  align-items: flex-end;
  shape-outside: inset(calc(100% - 100px) 0 0);

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
          <ToolIcon iconType={BasicType.MEDIA} />
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
      </ToolListContainer>
      <ButtonWrapper>
        <TweetButton> Tweet </TweetButton>
      </ButtonWrapper>
    </>
  );
};

export default ToolList;
