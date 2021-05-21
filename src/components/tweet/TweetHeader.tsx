import React, { Children } from 'react';
import styled, { css } from 'styled-components';
import Tweet from '../../models/tweet';
import TweetProps from '../../models/tweetProps';

const TweetHeaderWrapper = styled.header`
    padding: 5px;
    border: 2px solid;
    margin: 1.5px;
`;

export const TweetHeader: React.FC<TweetProps> = (props) => {
    // const { children, key, user, text, } = props;
    const { children ,tweet } = props;

    return (
        <TweetHeaderWrapper>
            username: {tweet.user}
        </TweetHeaderWrapper>
    );
};

export default TweetHeader;