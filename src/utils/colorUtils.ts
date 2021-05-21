export enum ColorPalette {
  BLACK = '#000000',
  LIGHTDARK = '#0f1419',
  WHITE = '#ffffff',

  SKYBLUE = '#1da0f2',
  GREEN = '#17bf63',

  GRAY_70 = '#707070',
  GRAY_76 = '#767676',
  GRAY_E6 = '#e6e6e6',
  GRAY_F9 = '#f9f9f9',
}

export const hexToRgbA = (hex: string, alpha = 1): string => {
  const isValidInput =
    /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) && alpha >= 0 && alpha <= 1;

  if (!isValidInput) {
    return `rgba(0,0,0,0)`;
  }

  let c = hex.substring(1).split('');

  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }

  const r = parseInt(`0x${c[0]}${c[1]}`, 16);
  const g = parseInt(`0x${c[2]}${c[3]}`, 16);
  const b = parseInt(`0x${c[4]}${c[5]}`, 16);

  return `rgba(${r},${g},${b},${alpha})`;
};
