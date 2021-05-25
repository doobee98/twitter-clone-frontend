import React from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';

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

  background-color: ${ColorPalette.LIGHTDARK};
  border-radius: 19px;
`;

const ButtonWrapper = styled.div`
  float: left;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  background-color: ${ColorPalette.SKYBLUE_DARK};
`;

const ToolList = () => {
  return (
    <>
      <ToolListContainer>
        <ToolWrapper />
        <ToolWrapper />
        <ToolWrapper />
        <ToolWrapper />
        <ToolWrapper />
      </ToolListContainer>
      <ButtonWrapper />
    </>
  );
};

export default ToolList;
