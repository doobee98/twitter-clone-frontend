import React from 'react';
import styled, { css } from 'styled-components';
import { FiShare } from 'react-icons/fi';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainTopItem = styled.div`
    width: auto;

    border: 1px solid;
    margin: 1px;

    display: inline-block;
`;

const TweetMainTopLeftContainer = styled.div`
    postition: absolute;
    left: 1px;

    float: left;
    display: inline-block;
`;

const TweetMainTopRightContainer = styled.div`
    postition: absolute;
    right: 0;
    
    float: right;
    display: inline-block;
`;

const TweetMainTopContainer = styled.div`
    width: auto;
    display: flex;
    flext-direction: row;
    justify-content: space-betweetn;
    
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
            <TweetMainTopLeftContainer>
                <TweetMainTopItem>
                    { tweet.user }
                </TweetMainTopItem>
                <TweetMainTopItem>
                    isOffical
                </TweetMainTopItem>
                <TweetMainTopItem>
                    @{tweet.key} - tweetedAt
                </TweetMainTopItem>
            </TweetMainTopLeftContainer>
            <TweetMainTopRightContainer>
                <TweetMainTopItem>
                    more
                </TweetMainTopItem>
            </TweetMainTopRightContainer>
        </TweetMainTopContainer>
    );
};

export default TweetMainTop;