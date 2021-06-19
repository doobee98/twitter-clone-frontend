import React, { useEffect, useRef } from 'react';
import Tweet from '../models/tweet';

const useInfinityScroll = (
  scrollFunction: () => Promise<any>,
  timer: React.MutableRefObject<boolean>,
  setTimer: (inputBoolean: boolean) => void,
) => {
  const infScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // THROTTLING
    // it there is timer, do not execute.:
    if (timer.current) {
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setTimer(true);

      await scrollFunction();

      setTimeout(() => setTimer(false), 2000);
    }
  };

  useEffect(() => {
    // when mount
    window.addEventListener('scroll', infScroll);

    return () => {
      // when unmount
      window.removeEventListener('scroll', infScroll);
    };
  });
};

export default useInfinityScroll;
