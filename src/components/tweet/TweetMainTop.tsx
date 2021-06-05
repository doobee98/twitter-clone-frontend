import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';
import NavItem from '../base/NavItem';

const TweetMainTopItem = styled.div`
  width: auto;

  margin: 1px;

  display: inline-block;
`;

// NEED TO BE RENAMED : awful long name
const TweetMainTopUsername = styled(TweetMainTopItem)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const TweetMainTopUseridTweetedAt = styled(TweetMainTopItem)`
  color: ${ColorPalette.GRAY_70};
`;

// TO BE REFACTORED : awful naming, awful structure
const TweetMainTopLeftContainer = styled.div`
  display: inline-block;
`;

const TweetMainTopRightContainer = styled.div`
  display: inline-block;
`;

const TweetMainTopRightMoreItem = styled(NavItem)`
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

const TweetMainTopContainer = styled.div`
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

  // <TweetMainTopItem>isOffical</TweetMainTopItem>   ---> should we? after next meeting
  return (
    <TweetMainTopContainer>
      <TweetMainTopLeftContainer>
        <TweetMainTopUsername onClick={goToUserProfile}>
          {tweet.user}
        </TweetMainTopUsername>
        <TweetMainTopUseridTweetedAt>
          @{tweet.key} - tweetedAt
        </TweetMainTopUseridTweetedAt>
      </TweetMainTopLeftContainer>
      <TweetMainTopRightContainer>
        <TweetMainTopRightMoreItem iconType={BasicType.MORE} />
      </TweetMainTopRightContainer>
    </TweetMainTopContainer>
  );
};

export default TweetMainTop;
