import TweetModel from 'models/tweet';
import styled, { css } from 'styled-components';
import React from 'react';

const TweetMainContainer = styled.main`
    padding: 10px;
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

const TweetSide: React.FC = () => {

    return (
        <div>
            side
        </div>
    );
}

interface TweetTextProps {
    tweet: TweetModel;
}

const TweetText: React.FC<TweetTextProps> = (props) => {
    const { children, tweet, } = props

    return (
        <div style={{height: '3vh', border: '1px solid'}}>
            {tweet.text}
        </div>
    );
}

const TweetContent: React.FC = () => {

    return (
        <div style={{
            // TO BE REMOVED
            height: '7vh', border: '1px solid'
            }}>
            content
        </div>
    );
}

interface TweetMainProps {
    tweet: TweetModel;
}

const TweetMain: React.FC<TweetMainProps> = (props) => {
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

export default TweetMain;