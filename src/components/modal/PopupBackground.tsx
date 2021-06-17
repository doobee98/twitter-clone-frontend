import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';

const PopupBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  width: 105%;
  height: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-collapse: collapse;
  background-color: ${hexToRgbA(ColorPalette.BLACK, 0.4)};
`;

export default PopupBackground;
