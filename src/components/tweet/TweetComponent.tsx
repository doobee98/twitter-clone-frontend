import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetSide from './TweetSide';
import TweetMain from './TweetMain';

const TweetContainer = styled.div`
    padding: 2px 2px 4px;
    border: 2px solid;
    margin: 1px 10px 5px;


    &:hover {
        color: ${ColorPalette.SKYBLUE}
    };
`;

interface TweetComponentProps {
    tweet: TweetModel;
}

const TweetComponent: React.FC<TweetComponentProps> = (props) => {
    const { children, tweet, } = props;

    return (
        <TweetContainer>
            <TweetSide tweet={tweet} />
            <TweetMain tweet={tweet} />
        </TweetContainer>
    );
};

export default TweetComponent;