import React from 'react';
import styled, { css } from 'styled-components'
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainCenterWrapper = styled.div`
    border: 1px solid;
    margin: 1px;
`;

const TweetText: React.FC = () => {
    return(
        <div>
            text
        </div>
    );
};

const TweetContent: React.FC = () => {
    return(
        <div>
            content
        </div>
    );
};

const TweetMainCenterContainer = styled.div`
    position: relative;
    height: auto;

    border: 1px solid;
    margin: 1px;
`;


interface TweetMainCenterProps {
    tweet: TweetModel;
}

const TweetMainCenter: React.FC<TweetMainCenterProps> = (props) => {
    const { children, tweet } = props;

    return (
        <TweetMainCenterContainer>
            <div> Center </div>
            <TweetMainCenterWrapper>
                <TweetText />
            </TweetMainCenterWrapper>
            <TweetMainCenterWrapper>
                <TweetContent />
            </TweetMainCenterWrapper>
        </TweetMainCenterContainer>
    );
};

export default TweetMainCenter;