import { fetchFeed } from 'modules/home';
import React, { useEffect } from 'react';
import Tweet from '../models/tweet';
import { useAppDispatch } from './redux';

const useInfinityScroll = (feed: Tweet[], scrollFunction: () => any) => {
  const infScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // need debouncing
    if (scrollTop + clientHeight === scrollHeight) {
      scrollFunction();
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
