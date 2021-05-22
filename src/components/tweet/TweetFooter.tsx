import React from 'react';
import styled, { css } from 'styled-components';
import TweetModel from '../../models/tweet';
import TweetProps from '../../models/tweetProps';

const TweetFooterContainer = styled.footer`
    display: flex;
    padding: 5px;
    border: 2px solid;
    margin: 1.5px;

`;

const FooterDivWrapper = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    padding: 3px;
    border: 1.5px solid;
    margin: 1.5px;
`;

interface TweetFooterProps {
    tweet: TweetModel;
}

const TweetFooter: React.FC<TweetFooterProps> = (props) => {
    const { children, tweet } = props;
    
    return ( 
        <TweetFooterContainer>
            <FooterDivWrapper>
                <div>comments: {tweet.comments}</div>
            </FooterDivWrapper>
            <FooterDivWrapper>
                <div>retweets: {tweet.retweets}</div>
            </FooterDivWrapper>
            <FooterDivWrapper>
                <div>likes: {tweet.likes}</div>
            </FooterDivWrapper>
            <FooterDivWrapper>
                <div>share</div>
            </FooterDivWrapper>
        </TweetFooterContainer>
    );
};

export default TweetFooter;