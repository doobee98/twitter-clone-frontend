import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetList from './TweetList';

const TweetProfileWrapper = styled.div`
    width: 70%; 
    
    padding: 10%;
    border: 1px solid;
    border-radius: 9999px;
    margin: 1px;

    align-itmes: center;
`;

const TweetProfile: React.FC = () => {
    return (
        <div>
            profile
        </div>
    );
}

const TweetSideContainer = styled.div`
    width: 15%;
    height: 100%;
    
    vertical-align: top;
    display: inline-block;

    margin-left: 2px;
`;

interface TweetSideProps {
    tweet: TweetModel;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
    const { children, tweet, } = props;

    return (
        <TweetSideContainer>
            <TweetProfileWrapper>
                <TweetProfile />
            </TweetProfileWrapper>
        </TweetSideContainer>
    );
};

export default TweetSide;

