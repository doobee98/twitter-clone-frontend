import React, { Children } from 'react';
import styled, { css } from 'styled-components';
import TweetModel from '../../models/tweet';

const TweetHeaderWrapper = styled.header`
    padding: 5px;
    border: 2px solid;
    margin: 1.5px;
`;

interface TweetHeaderProps {
    tweet: TweetModel;
}

const TweetHeader: React.FC<TweetHeaderProps> = (props) => {
    const { children ,tweet } = props;

    return (
        <TweetHeaderWrapper>
            username: {tweet.user}
        </TweetHeaderWrapper>
    );
};

export default TweetHeader;