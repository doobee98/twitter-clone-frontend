import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import ExploreSideBar from 'components/explore/ExploreSideBar';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import { ColorPalette } from 'utils/colorUtils';
import { useAppDispatch, useAuthSelector, useHomeSelector } from 'hooks/redux';
import { fetchFeed } from 'modules/home';
import { getUser } from 'modules/userRecord';
import Tweet from 'models/tweet';

const SpaceSection = styled(ContentSection)`
  background-color: ${ColorPalette.GRAY_F9};
  height: 12px;
`;

const HomePage: React.FC = () => {
  const authStore = useAuthSelector();
  const { currentUser } = authStore;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const homeStore = useHomeSelector();
  const dispatch = useAppDispatch();
  const { feed } = homeStore;

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const handleFetchFeed = async () => {
    const res = await dispatch(fetchFeed());

    if (res.type.toString() === 'home/fetchFeed/rejected') {
      setIsError(true);
      return;
    }

    await setIsLoading(false);

    const newFeed = (await res.payload) as Tweet[];

    Promise.all(newFeed.map((tweet) => dispatch(getUser(tweet.writer_id))));
  };

  // INIT FETCH
  useEffect(() => {
    handleFetchFeed();
  }, []);

  return (
    <>
      <PageTemplate title="Home">
        <ContentTemplate>
          <ContentHeader>
            <strong>Home</strong>
          </ContentHeader>
          <ContentSection>
            <TweetPost />
          </ContentSection>
          <SpaceSection />
          <TweetList
            feed={feed}
            handleFetchFeed={handleFetchFeed}
            isLoading={isLoading}
            isError={isError}
          />
        </ContentTemplate>
        <ContentTemplate width="300px" hideBorder>
          <ExploreSideBar />
        </ContentTemplate>
      </PageTemplate>
    </>
  );
};

export default HomePage;
