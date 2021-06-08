import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';
import NavItem from '../base/NavItem';

const TweetTopItem = styled.div`
  width: auto;

  margin: 1px;

  display: inline-block;
`;

// NEED TO BE RENAMED : awful long name
const TweetTopUsername = styled(TweetTopItem)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const TweetTopUseridTweetedAt = styled(TweetTopItem)`
  color: ${ColorPalette.GRAY_70};
`;

const TweetTopLeftContainer = styled.div`
  display: inline-block;
`;

const TweetTopRightContainer = styled.div`
  display: inline-block;
`;

const TweetMoreItem = styled(NavItem)`
  align-items: center;
  justify-content: center;

  & button {
    width: 25px;
    height: 25px;
    padding: 0px;
    margin: 0px;
  }

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const TweetTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 1px;
`;

interface TweetMainTopProps {
  tweet: TweetModel;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { children, tweet } = props;

  const history = useHistory();

  const goToUserProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    history.push(`/${tweet.user}`);
  };

  return (
    <TweetTopContainer>
      <TweetTopLeftContainer>
        <TweetTopUsername onClick={goToUserProfile}>
          {tweet.user}
        </TweetTopUsername>
        <TweetTopUseridTweetedAt>
          @{tweet.key} - tweetedAt
        </TweetTopUseridTweetedAt>
      </TweetTopLeftContainer>
      <TweetTopRightContainer>
        <TweetMoreItem iconType={BasicType.MORE} />
      </TweetTopRightContainer>
    </TweetTopContainer>
  );
};

export default TweetMainTop;
