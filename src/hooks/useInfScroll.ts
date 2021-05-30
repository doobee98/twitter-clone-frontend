import React, { useEffect } from 'react';
import TweetModel from '../models/tweet';

const useInfScroll = (defaultTweets: TweetModel[], tweets: TweetModel[], setTweets: React.Dispatch<React.SetStateAction<TweetModel[]>>) => {
    const infScroll = () => {
        const { 
            scrollTop,
            scrollHeight,
            clientHeight,
        } = document.documentElement;

        if (tweets.length >= defaultTweets.length) {
            return;
        }

        if (scrollTop + clientHeight === scrollHeight) {
            const newTweets: TweetModel[] = [
                ...tweets,
                defaultTweets[tweets.length],
            ];

            setTweets(newTweets);
        }
    };

    useEffect(
        () => {
            // when mount
            window.addEventListener('scroll', infScroll);

            return () => {
                // when unmount
                window.removeEventListener('scroll', infScroll);
            };
        }
    );
};

export default useInfScroll;