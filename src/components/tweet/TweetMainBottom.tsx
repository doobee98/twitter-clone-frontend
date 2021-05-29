import React from 'react';
import styled, { css } from 'styled-components'
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainBottomItemWrapper = styled.div`
    border: 1px solid;
    margin: 1px;

    display: inline-block;
    flex: 1;
    align-content: center;
`;

const TweetMainBottomContainer = styled.div`
    vertical-align: bottom;    

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
                Reply: 
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Retweet: 
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Like: 
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                Share 
            </TweetMainBottomItemWrapper>
        </TweetMainBottomContainer>
    );
};

export default TweetMainBottom;