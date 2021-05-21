import React from 'react';
import styled, { css } from 'styled-components';
import Tweet from '../../models/tweet';
import TweetProps from '../../models/tweetProps';

const TweetFooterWrapper = styled.footer`
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

export const TweetFooter: React.FC<TweetProps> = (props) => {
    const { children, tweet } = props;
    
    return ( 
        <TweetFooterWrapper>
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
        </TweetFooterWrapper>
    );
};

export default TweetFooter;