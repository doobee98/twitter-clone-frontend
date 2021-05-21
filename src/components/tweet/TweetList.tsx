import React from 'react';
import styled, { css } from 'styled-components';
import TweetComponent from './TweetComponent';
import Tweet from '../../models/tweet';

const tweets: Tweet[] = [
    {key: 0, user: 'marong142', text: 'hello-world', comments: 5, retweets: 5, likes: 5, },
    {key: 1, user: 'nare142', text: 'na-re', comments: 6, retweets: 2, likes: 10, },
    {key: 2, user: 'kwon-namu', text: 'pot', comments: 3, retweets: 3, likes: 7, },
];

const TweetList: React.FC = () => {
    const TweetListStyle = {
        height: '200vh',
        border: `2px solid #1da0f2`,
        margin: '20px',
      };

    return(
        <div style={TweetListStyle}>
            {tweets.map(tweet => 
                <TweetComponent key={tweet.key} tweet={tweet} />
            )}
        </div>
    );
};

export default TweetList;