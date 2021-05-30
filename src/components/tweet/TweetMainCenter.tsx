import React from 'react';
import styled, { css } from 'styled-components'
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainCenterWrapper = styled.div`
    border: 1px solid;
    margin: 1px;
`;


interface TweetMainCenterProps {
    tweet: TweetModel;
}

const TweetText: React.FC<TweetMainCenterProps> = (props) => {
    const { children, tweet } = props;

    return(
        <div>
            text : {tweet.text}
        </div>
    );
};

const TweetContent: React.FC<TweetMainCenterProps> = (props) => {
    const { children, tweet } = props;

    return(
        <div>
            content : 
        </div>
    );
};

const TweetMainCenterContainer = styled.div`
    position: relative;
    height: auto;

    border: 1px solid;
    margin: 1px;
`;

const TweetMainCenter: React.FC<TweetMainCenterProps> = (props) => {
    const { children, tweet } = props;

    return (
        <TweetMainCenterContainer>
            <div> Center </div>
            <TweetMainCenterWrapper>
                <TweetText tweet={tweet}/>
            </TweetMainCenterWrapper>
            <TweetMainCenterWrapper>
                <TweetContent tweet={tweet}/>
            </TweetMainCenterWrapper>
        </TweetMainCenterContainer>
    );
};

export default TweetMainCenter;