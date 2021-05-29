import React from 'react';
import styled, { css } from 'styled-components'
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainTopItemWrapper = styled.div`
    border: 1px solid;
    margin: 1px;

    display: inline-block;
`;

const TweetMainTopContainer = styled.div`
    border: 1px solid;
    margin: 1px;
`;

interface TweetMainTopProps {
    tweet: TweetModel;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
    const { children, tweet } = props;

    return (
        <TweetMainTopContainer>
            top
            <TweetMainTopItemWrapper>
                <h3>{ tweet.user }</h3>
            </TweetMainTopItemWrapper>
            <TweetMainTopItemWrapper>
                isOffical
            </TweetMainTopItemWrapper>
            <TweetMainTopItemWrapper>
                id, tweetedAt
            </TweetMainTopItemWrapper>
            <TweetMainTopItemWrapper >
                more
            </TweetMainTopItemWrapper>
        </TweetMainTopContainer>
    );
};

export default TweetMainTop;