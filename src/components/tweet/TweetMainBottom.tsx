import React from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare } from 'react-icons/fi';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';
import Button from '../base/Button';
import NavItem from '../base/NavItem';

const TweetMainBottomItemWrapper = styled.div`
    padding: 2px;
    border: 1px solid;
    margin: 1px;
    margin-right: 3px;

    display: inline-block;
    flex-grow: 1;
`;

const TweetMainBottomIcon = styled(NavItem)`
    align-items: center;
    justify-content: center;

    & button {
        width: 40px;
        height: 40px;
        padding: 0px;
        margin: 0px;
    }

    & svg {
        width: 30px;
        height: 30px;
    }

    color: ${ColorPalette.SKYBLUE};
`;

const TweetMainBottomContainer = styled.div`
    width: auto;

    border: 1px solid;
    margin: 1px;

    display: flex;
    justify-content: space-between;
`;

interface TweetMainBottomProps {
    tweet: TweetModel;
}

const TweetMainBottom: React.FC<TweetMainBottomProps> = (props) => {
    const { children, tweet } = props;

    return (
        <TweetMainBottomContainer>
            <TweetMainBottomItemWrapper>
                <TweetMainBottomIcon iconType={BasicType.REPLY} /> {tweet.comments}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                <TweetMainBottomIcon iconType={BasicType.RETWEET} /> {tweet.retweets}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                <TweetMainBottomIcon iconType={BasicType.LIKE} /> {tweet.likes}
            </TweetMainBottomItemWrapper>
            <TweetMainBottomItemWrapper>
                <TweetMainBottomIcon iconType={BasicType.SHARE} />
            </TweetMainBottomItemWrapper>
        </TweetMainBottomContainer>
    );
};

export default TweetMainBottom;