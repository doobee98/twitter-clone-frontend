import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetComponent from './TweetComponent';
import useInfScroll from '../../hooks/useInfScroll';

const defaultTweets: TweetModel[] = [
    {key: 0, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 1, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 2, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
    {key: 3, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 4, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 5, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
    {key: 6, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 7, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 8, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
    {key: 9, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 10, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 11, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
    {key: 12, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 13, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 14, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
    {key: 15, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 16, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 17, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
];

const TweetListContainer = styled.div`
    border: 2px solid ${ColorPalette.SKYBLUE};
    margin: 20px;
`;

const TweetList: React.FC = () => {
    const [tweets, setTweets] = useState<TweetModel[]>([defaultTweets[0], defaultTweets[1], defaultTweets[2], defaultTweets[3], ]);
    
    useInfScroll(defaultTweets, tweets, setTweets);

    return (
        <TweetListContainer>
            {tweets.map(tweet => 
                <TweetComponent key={tweet.key} tweet={tweet} />
            )}
        </TweetListContainer>
    );
};

export default TweetList;