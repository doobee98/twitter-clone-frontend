import React from 'react';
import styled, { css } from 'styled-components'
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainBottomItemWrapper = styled.div`
    padding: 2px;
    border: 1px solid;
    margin: 1px;
    margin-right: 3px;

    display: inline-block;
    flex: 1;
    align-content: center;
`;

const TweetMainBottomContainer = styled.div`

    border: 1px solid;
    margin: 1px;
`;

interface TweetMainBottomProps {
    tweet: TweetModel;
}

const TweetMainBottom: React.FC<TweetMainBottomProps> = (props) => {
    const { children, tweet } = props;

    return (
        <TweetMainBottomContainer>
            <div> Bottom </div>
            <TweetMainBottomItemWrapper>
                Reply: {tweet.comments}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Retweet: {tweet.retweets}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Like: {tweet.likes}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Share
            </TweetMainBottomItemWrapper>
        </TweetMainBottomContainer>
    );
};

export default TweetMainBottom;