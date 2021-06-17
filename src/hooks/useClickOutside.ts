import React, { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: (e: React.MouseEvent<HTMLElement>) => void,
  exceptRef?: React.RefObject<HTMLElement>,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !exceptRef?.current?.contains(event.target as Node)
      ) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
