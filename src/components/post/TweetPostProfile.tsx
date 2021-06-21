import ProfileImage from 'components/base/ProfileImage';
import User from 'models/user';
import React from 'react';
import styled from 'styled-components';

const TweetProfileWrapper = styled.div`
  width: 10%;
  min-width: 60px;
  height: 100px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 12px;
  padding-top: 4px;
`;

interface TweetPostProfileProps {
  currentUser: User;
}

const TweetPostProfile: React.FC<TweetPostProfileProps> = (props) => {
  const { currentUser } = props;
  return (
    <TweetProfileWrapper>
      <ImageWrapper>
        <ProfileImage
          userid={currentUser.user_id}
          username={currentUser.username}
        />
      </ImageWrapper>
    </TweetProfileWrapper>
  );
};

export default TweetPostProfile;
