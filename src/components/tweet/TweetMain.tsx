import Tweet from 'models/tweet';
import styled, { css } from 'styled-components';
import React from 'react';
import TweetProps from '../../models/tweetProps';

const TweetMainContainer = styled.main`
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    border: 2px solid;
    margin: 1.5px;
    margin-top : 10px;
    margin-bottom : 10px;
    
    display: flex;
`;

const TweetSideWrapper = styled.div`
    position: relative;
    flex: 1;

    border : 1px solid;
    margin : 1px;
`;

const TweetCenterWrapper = styled.div`
    position: relative;
    flex: 10;

    border : 1px solid;
    margin : 1px;
`;

export const TweetMain: React.FC<TweetProps> = (props) => {
    const { children, tweet, } = props;

    return (
        <TweetMainContainer>
            <TweetSideWrapper>
                <TweetSide />
            </TweetSideWrapper>
            <TweetCenterWrapper>
                <TweetText tweet={tweet}/>
                <TweetContent />
            </TweetCenterWrapper>
        </TweetMainContainer>
    );
};

const TweetSide: React.FC = () => {

    return (
        <div>
            side
        </div>
    );
}

const TweetText: React.FC<TweetProps> = (props) => {
    const { children, tweet, } = props

    return (
        <div style={{height: '3vh', border: '1px solid'}}>
            {tweet.text}
        </div>
    );
}

const TweetContent: React.FC = () => {

    return (
        <div style={{height: '7vh', border: '1px solid'}}>
            content
        </div>
    );
}



export default TweetMain;