import React, { useEffect, useRef } from 'react';
import Tweet from '../models/tweet';

const useInfinityScroll = (
  scrollFunction: () => Promise<any>,
  timer: React.MutableRefObject<boolean>,
  setTimer: (inputBoolean: boolean) => void,
) => {
  const infScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    console.log('inf');

    // THROTTLING
    // it there is timer, do not execute.:
    if (timer.current) {
      console.log('return');
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      console.log('------------new------------');
      setTimer(true);
      setTimeout(() => {
        scrollFunction();
        setTimer(false);
      }, 2000);
    }

    console.log('end');
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
