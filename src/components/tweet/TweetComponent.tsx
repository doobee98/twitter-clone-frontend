import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import TweetModel from '../../models/tweet';
import { TweetFooter } from './TweetFooter';
import { TweetHeader } from './TweetHeader';
import { TweetMain } from './TweetMain';

const TweetContainer = styled.div`
    padding: 10px;
    border: 2px solid;
    margin: 10px;
    margin-bottom: 15px;
    &:hover {
        color: ${ColorPalette.SKYBLUE}
    }
`;

interface TweetComponentProps {
    tweet: TweetModel;
}

const TweetComponent: React.FC<TweetComponentProps> = (props) => {
    const { children, tweet, } = props;

    const onClick = () => {
        // TO BE REMOVED
        console.log('hello');
    }

    return (
        <TweetContainer onClick={onClick}>
            <TweetHeader tweet={tweet} />
            <TweetMain tweet={tweet} />
            <TweetFooter tweet={tweet} />
        </TweetContainer>
    );
};

export default TweetComponent;