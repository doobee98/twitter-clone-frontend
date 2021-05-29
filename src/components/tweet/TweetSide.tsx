import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetList from './TweetList';

const TweetProfileWrapper = styled.div`
    
    border: 1px solid;
    margin: 1px;
`;

const TweetProfile: React.FC = () => {
    return (
        <div>
            sidebar
        </div>
    );
}

const TweetSideContainer = styled.div`
    
    height: 100%;
    width: 10%;
    left: 0px;

    border: 1px solid;
    margin-left: 2px;

    display: inline-block;
    vertical-align: top;
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

